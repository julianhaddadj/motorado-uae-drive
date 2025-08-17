import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { FadeLoader } from "@/components/FadeLoader";
import { useFormAutosave } from "@/hooks/use-form-autosave";

import { StepIndicator } from "./StepIndicator";
import { UploadMediaStep } from "./UploadMediaStep";
import { VehicleInfoStep } from "./VehicleInfoStep";
import { PricingDescriptionStep } from "./PricingDescriptionStep";
import { ReviewSubmitStep } from "./ReviewSubmitStep";

const formSchema = z.object({
  make: z.string().min(1, "This field is required"),
  model: z.string().min(1, "This field is required"),
  trim: z.string().optional(),
  year: z.string().min(1, "This field is required"),
  mileage: z.string().min(1, "This field is required"),
  price: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  emirate: z.string().min(1, "This field is required"),
  regionalSpecs: z.string().min(1, "This field is required"),
  bodyType: z.string().min(1, "This field is required"),
  insuredInUAE: z.enum(["Yes", "No"], { required_error: "This field is required" }),
  fuelType: z.string().min(1, "This field is required"),
  exteriorColor: z.string().min(1, "This field is required"),
  interiorColor: z.string().min(1, "This field is required"),
  warranty: z.enum(["Yes", "No", "Does not apply"], { required_error: "This field is required" }),
  doors: z.enum(["2 door", "3 door", "4 door", "5+ doors"], { required_error: "This field is required" }),
  transmission: z.enum(["Automatic", "Manual"], { required_error: "This field is required" }),
  horsepower: z.string().min(1, "This field is required"),
  steeringSide: z.enum(["Left", "Right"], { required_error: "This field is required" }),
  contactPhoneCountryCode: z.string().min(1, "Country code is required"),
  contactPhoneNumber: z.string().min(1, "Phone number is required"),
  contactPhoneHasWhatsapp: z.boolean().default(false),
  sellerType: z.enum(["Owner", "Dealership"], { required_error: "Please select a seller type" }),
  dealershipName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.sellerType === "Dealership") {
    if (!data.dealershipName || data.dealershipName.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a dealership name",
        path: ["dealershipName"]
      });
    } else if (data.dealershipName.trim().length < 2 || data.dealershipName.trim().length > 80) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Dealership name must be between 2 and 80 characters",
        path: ["dealershipName"]
      });
    }
  }
});

const steps = [
  {
    id: 1,
    title: "Upload Media",
    description: "Add photos of your car"
  },
  {
    id: 2,
    title: "Vehicle Info",
    description: "Car details and specs"
  },
  {
    id: 3,
    title: "Pricing & Description",
    description: "Price and contact info"
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Final review"
  }
];

export const CreateListingWizard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      trim: "",
      year: "",
      mileage: "",
      price: "",
      description: "",
      emirate: "",
      regionalSpecs: "",
      bodyType: "",
      insuredInUAE: undefined,
      fuelType: "",
      exteriorColor: "",
      interiorColor: "",
      warranty: undefined,
      doors: undefined,
      transmission: undefined,
      horsepower: "",
      steeringSide: undefined,
      contactPhoneCountryCode: "+971",
      contactPhoneNumber: "",
      contactPhoneHasWhatsapp: false,
      sellerType: undefined,
      dealershipName: "",
    },
  });

  // Manual save draft functionality
  const { saveDraft, clearSavedData } = useFormAutosave({
    form,
    storageKey: 'create-listing-draft',
    enabled: true
  });

  const formatNumberWithCommas = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const removeCommas = (value: string) => {
    return value.replace(/,/g, '');
  };

  const handlePriceChange = (value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    form.setValue("price", removeCommas(formattedValue));
    return formattedValue;
  };

  const handleMileageChange = (value: string) => {
    const formattedValue = formatNumberWithCommas(value);
    form.setValue("mileage", removeCommas(formattedValue));
    return formattedValue;
  };

  const uploadImages = async (listingId: string): Promise<string[]> => {
    if (selectedImages.length === 0) return [];
    
    setUploadingImages(true);
    const imageUrls: string[] = [];
    
    try {
      for (let i = 0; i < selectedImages.length; i++) {
        const file = selectedImages[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.id}/${listingId}/${Date.now()}-${i}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('car-images')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName);
          
        imageUrls.push(publicUrl);
      }
      
      return imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep || completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const onSubmit = async () => {
    if (!user) return;

    const values = form.getValues();
    
    try {
      // Create slug from make and model
      const slug = `${values.make}-${values.model}-${values.year}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          make: values.make,
          model: values.model,
          trim: values.trim || null,
          year: parseInt(values.year),
          price_aed: parseInt(values.price),
          mileage_km: parseInt(values.mileage),
          regional_spec: values.regionalSpecs,
          body_type: values.bodyType,
          emirate: values.emirate,
          description: values.description || null,
          contact_phone_country_code: values.contactPhoneCountryCode,
          contact_phone_number: values.contactPhoneNumber,
          contact_phone_has_whatsapp: values.contactPhoneHasWhatsapp,
          fuel_type: values.fuelType,
          exterior_color: values.exteriorColor,
          interior_color: values.interiorColor,
          transmission: values.transmission,
          horsepower: values.horsepower,
          doors: values.doors,
          warranty: values.warranty,
          steering_side: values.steeringSide,
          insured_in_uae: values.insuredInUAE,
          seller_type: values.sellerType,
          dealership_name: values.sellerType === "Dealership" ? values.dealershipName : null,
          slug: slug,
          is_published: false,
        } as any)
        .select();

      if (error) {
        console.error('Error creating listing:', error);
        toast({
          title: "Error",
          description: "Failed to create listing. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Upload images if any were selected
      let imageUrls: string[] = [];
      if (selectedImages.length > 0) {
        try {
          imageUrls = await uploadImages(data[0].id);
          
          // Update listing with image URLs
          const { error: updateError } = await supabase
            .from('listings')
            .update({ images: imageUrls })
            .eq('id', data[0].id);
            
          if (updateError) {
            console.error('Error updating listing with images:', updateError);
            // Still show success since listing was created
          }
        } catch (imageError) {
          console.error('Error uploading images:', imageError);
          toast({
            title: "Warning",
            description: "Listing created but some images failed to upload. You can edit the listing to add them later.",
            variant: "destructive"
          });
        }
      }

      // Send email notification
      try {
        await supabase.functions.invoke('listing-notifications', {
          body: {
            type: 'submitted',
            listingId: data[0].id,
            userEmail: user.email,
            userName: user.user_metadata?.display_name || user.email,
            carDetails: `${values.year} ${values.make} ${values.model}`
          }
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }

      // Clear saved draft
      clearSavedData();

      toast({
        title: "Success!",
        description: "Your listing has been submitted for review.",
      });
      
      // Redirect to thank you page
      navigate("/listing-submitted");
      
    } catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <FadeLoader size="lg" showText={false} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      {/* Form */}
      <Form {...form}>
        <form>
          {currentStep === 1 && (
            <UploadMediaStep
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              uploadingImages={uploadingImages}
              onNext={handleNext}
              onBack={handleBack}
              isFirstStep={true}
            />
          )}

          {currentStep === 2 && (
            <VehicleInfoStep
              form={form}
              onNext={handleNext}
              onBack={handleBack}
              formatNumberWithCommas={formatNumberWithCommas}
              handleMileageChange={handleMileageChange}
            />
          )}

          {currentStep === 3 && (
            <PricingDescriptionStep
              form={form}
              onNext={handleNext}
              onBack={handleBack}
              formatNumberWithCommas={formatNumberWithCommas}
              handlePriceChange={handlePriceChange}
            />
          )}

          {currentStep === 4 && (
            <ReviewSubmitStep
              form={form}
              selectedImages={selectedImages}
              uploadingImages={uploadingImages}
              onSubmit={onSubmit}
              onBack={handleBack}
              onEditStep={handleStepClick}
              formatNumberWithCommas={formatNumberWithCommas}
              onSaveDraft={saveDraft}
            />
          )}
        </form>
      </Form>
    </div>
  );
};