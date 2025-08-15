import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useMakesAndModels } from "@/hooks/use-makes-models";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const countryCodes = [
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
];

const formSchema = z.object({
  make: z.string().min(1, "This field is required"),
  model: z.string().min(1, "This field is required"),
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
});

const CreateListing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { makes, loading: makesLoading, fetchModelsForMake, getModelsByMake, isLoadingModelsForMake } = useMakesAndModels();
  
  // Image state management
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
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
    },
  });

  const selectedMake = form.watch("make");
  const availableModels = selectedMake ? getModelsByMake(selectedMake) : [];

  const handleMakeChange = async (value: string) => {
    form.setValue("make", value);
    form.setValue("model", ""); // Reset model when make changes
    if (value) {
      await fetchModelsForMake(value);
    }
  };

  const handleModelChange = async (value: string) => {
    console.log('Model changed to:', value);
    form.setValue("model", value);
  };

  const formatNumberWithCommas = (value: string) => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '');
    // Add commas for thousands
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (fileArray.length > 10) {
        toast({
          variant: "destructive",
          title: "Too many images",
          description: "You can upload up to 10 images only."
        });
        return;
      }
      setSelectedImages(fileArray);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newImages = [...selectedImages];
    const draggedImage = newImages[draggedIndex];
    
    // Remove dragged item
    newImages.splice(draggedIndex, 1);
    
    // Insert at new position
    const adjustedDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newImages.splice(adjustedDropIndex, 0, draggedImage);
    
    setSelectedImages(newImages);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    
    try {
      // Create slug from make and model
      const slug = `${values.make}-${values.model}-${values.year}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          make: values.make,
          model: values.model,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreadcrumbNavigation />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <SEO
          title="Create Car Listing — Motorado"
          description="Create a detailed listing for your car with photos, specifications and pricing information."
          canonical="/create-listing"
        />
        
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Create Your Car Listing</h1>
          <p className="text-muted-foreground">Fill out the details below to create your car listing</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Car Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make *</FormLabel>
                        <Select onValueChange={handleMakeChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={makesLoading ? "Loading makes..." : "Select make"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom" className="bg-background border border-border shadow-lg z-50">
                            {makes.map((make) => (
                              <SelectItem key={make.id} value={make.id}>
                                {make.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model *</FormLabel>
                        <Select onValueChange={handleModelChange} value={field.value} disabled={!selectedMake}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                !selectedMake 
                                  ? "Select make first" 
                                  : isLoadingModelsForMake(selectedMake) 
                                    ? "Loading models..." 
                                    : "Select model"
                              } />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom" className="bg-background border border-border shadow-lg z-50">
                            {availableModels.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year *</FormLabel>
                        <FormControl>
                          <Input placeholder="2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mileage (km) *</FormLabel>
                        <FormControl>
                          <Input placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                   <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Price (AED) *</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="150,000" 
                             value={formatNumberWithCommas(field.value || '')}
                             onChange={(e) => {
                               const formattedValue = handlePriceChange(e.target.value);
                               e.target.value = formattedValue;
                             }}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                </div>

                {/* Location & Specs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="emirate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emirate *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select emirate" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Dubai">Dubai</SelectItem>
                            <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                            <SelectItem value="Sharjah">Sharjah</SelectItem>
                            <SelectItem value="Ajman">Ajman</SelectItem>
                            <SelectItem value="Umm al Quwain">Umm al Quwain</SelectItem>
                            <SelectItem value="Ras al Khaimah">Ras al Khaimah</SelectItem>
                            <SelectItem value="Fujairah">Fujairah</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="regionalSpecs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regional Specs *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select regional specs" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="GCC">GCC Specs</SelectItem>
                            <SelectItem value="American">American Specs</SelectItem>
                            <SelectItem value="Euro">European Specs</SelectItem>
                            <SelectItem value="Japanese">Japanese Specs</SelectItem>
                            <SelectItem value="Chinese">Chinese Specs</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Body Type & Insurance */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="bodyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select body type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="SUV">SUV</SelectItem>
                            <SelectItem value="Coupe">Coupe</SelectItem>
                            <SelectItem value="Sedan">Sedan</SelectItem>
                            <SelectItem value="Crossover">Crossover</SelectItem>
                            <SelectItem value="Hard Top Convertible">Hard Top Convertible</SelectItem>
                            <SelectItem value="Soft Top Convertible">Soft Top Convertible</SelectItem>
                            <SelectItem value="Pick Up Truck">Pick Up Truck</SelectItem>
                            <SelectItem value="Hatchback">Hatchback</SelectItem>
                            <SelectItem value="Sports Car">Sports Car</SelectItem>
                            <SelectItem value="Van">Van</SelectItem>
                            <SelectItem value="Wagon">Wagon</SelectItem>
                            <SelectItem value="Utility Truck">Utility Truck</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insuredInUAE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is your car insured in UAE? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insurance status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fuel Type & Colors */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Petrol">Petrol</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="exteriorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exterior Color *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exterior color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Beige">Beige</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="Blue">Blue</SelectItem>
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Burgundy">Burgundy</SelectItem>
                            <SelectItem value="Gold">Gold</SelectItem>
                            <SelectItem value="Green">Green</SelectItem>
                            <SelectItem value="Grey">Grey</SelectItem>
                            <SelectItem value="Orange">Orange</SelectItem>
                            <SelectItem value="Pink">Pink</SelectItem>
                            <SelectItem value="Purple">Purple</SelectItem>
                            <SelectItem value="Red">Red</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Tan">Tan</SelectItem>
                            <SelectItem value="Teal">Teal</SelectItem>
                            <SelectItem value="White">White</SelectItem>
                            <SelectItem value="Yellow">Yellow</SelectItem>
                            <SelectItem value="Other Color">Other Color</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interiorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interior Color *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select interior color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Beige">Beige</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="Blue">Blue</SelectItem>
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Burgundy">Burgundy</SelectItem>
                            <SelectItem value="Gold">Gold</SelectItem>
                            <SelectItem value="Green">Green</SelectItem>
                            <SelectItem value="Grey">Grey</SelectItem>
                            <SelectItem value="Orange">Orange</SelectItem>
                            <SelectItem value="Pink">Pink</SelectItem>
                            <SelectItem value="Purple">Purple</SelectItem>
                            <SelectItem value="Red">Red</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Tan">Tan</SelectItem>
                            <SelectItem value="Teal">Teal</SelectItem>
                            <SelectItem value="White">White</SelectItem>
                            <SelectItem value="Yellow">Yellow</SelectItem>
                            <SelectItem value="Other Color">Other Color</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Warranty & Doors */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="warranty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select warranty status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Does not apply">Does not apply</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doors *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of doors" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="2 door">2 door</SelectItem>
                            <SelectItem value="3 door">3 door</SelectItem>
                            <SelectItem value="4 door">4 door</SelectItem>
                            <SelectItem value="5+ doors">5+ doors</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Transmission & Performance */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="Manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="horsepower"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horsepower *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select horsepower range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="0 - 99 HP">0 - 99 HP</SelectItem>
                            <SelectItem value="100 - 199 HP">100 - 199 HP</SelectItem>
                            <SelectItem value="200 - 299 HP">200 - 299 HP</SelectItem>
                            <SelectItem value="300 - 399 HP">300 - 399 HP</SelectItem>
                            <SelectItem value="400 - 499 HP">400 - 499 HP</SelectItem>
                            <SelectItem value="500 - 599 HP">500 - 599 HP</SelectItem>
                            <SelectItem value="600 - 699 HP">600 - 699 HP</SelectItem>
                            <SelectItem value="700 - 799 HP">700 - 799 HP</SelectItem>
                            <SelectItem value="800 - 899 HP">800 - 899 HP</SelectItem>
                            <SelectItem value="900+ HP">900+ HP</SelectItem>
                            <SelectItem value="Unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="steeringSide"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Steering Side *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select steering side" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            <SelectItem value="Left">Left</SelectItem>
                            <SelectItem value="Right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your car's condition, features, and any additional information..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="images">Car Images</Label>
                  <Input 
                    id="images" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageChange}
                    disabled={uploadingImages}
                  />
                  <p className="text-sm text-muted-foreground">Upload up to 10 images of your car</p>
                  
                  {/* Image Previews with Drag & Drop */}
                  {selectedImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected</p>
                      <p className="text-xs text-muted-foreground">Drag images to reorder them. The first image will be the main photo.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {selectedImages.map((file, index) => (
                          <div 
                            key={index} 
                            className={`relative cursor-move group ${
                              draggedIndex === index ? 'opacity-50 scale-95' : ''
                            }`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                          >
                            {/* Order indicator */}
                            <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium z-10">
                              {index + 1}
                            </div>
                            
                            {/* Main image indicator */}
                            {index === 0 && (
                              <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                                Main
                              </div>
                            )}
                            
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md border transition-all duration-200 group-hover:border-primary"
                            />
                            
                            {/* Drag handle indicator */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                              <div className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                                Drag to reorder
                              </div>
                            </div>
                            
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                              className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-destructive/80 transition-colors z-10"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Phone Section */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">Provide a phone number for buyers to contact you</p>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="contactPhoneCountryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country Code *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent side="bottom" className="max-h-[200px] overflow-y-auto bg-background border border-border shadow-lg z-50">
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code + country.name} value={country.code}>
                                  <span className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.code}</span>
                                    <span className="text-muted-foreground">{country.name}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="contactPhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="50 123 4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="contactPhoneHasWhatsapp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            This number has WhatsApp
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Buyers will see a WhatsApp badge if enabled
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1" disabled={uploadingImages}>
                    {uploadingImages ? "Uploading Images..." : "Create Listing"}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate("/sell")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CreateListing;