import { CheckCircle, Edit2, Car, MapPin, DollarSign, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UseFormReturn } from 'react-hook-form';
import { useMakesAndModels } from '@/hooks/use-makes-models';

interface ReviewSubmitStepProps {
  form: UseFormReturn<any>;
  selectedImages: File[];
  uploadingImages: boolean;
  onSubmit: () => void;
  onBack: () => void;
  onEditStep: (step: number) => void;
  formatNumberWithCommas: (value: string) => string;
}

export const ReviewSubmitStep = ({
  form,
  selectedImages,
  uploadingImages,
  onSubmit,
  onBack,
  onEditStep,
  formatNumberWithCommas
}: ReviewSubmitStepProps) => {
  const formData = form.getValues();
  const { makes, getModelsByMake } = useMakesAndModels();
  
  // Get actual make and model names from IDs
  const selectedMake = makes.find(make => make.id === formData.make);
  const selectedModel = formData.make ? getModelsByMake(formData.make).find(model => model.id === formData.model) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Review & Submit
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Please review all the information before submitting your listing.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Images Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Car Images</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(1)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          {selectedImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {selectedImages.slice(0, 4).map((file, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 z-10" variant="secondary">
                      Main
                    </Badge>
                  )}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {selectedImages.length > 4 && (
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  +{selectedImages.length - 4} more
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No images selected</p>
          )}
        </div>

        {/* Vehicle Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Information
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(2)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Make & Model</p>
              <p className="font-medium">{selectedMake?.name || formData.make} {selectedModel?.name || formData.model}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{formData.year}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mileage</p>
              <p className="font-medium">{formatNumberWithCommas(formData.mileage || '')} km</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Body Type</p>
              <p className="font-medium">{formData.bodyType}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">{formData.fuelType}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Transmission</p>
              <p className="font-medium">{formData.transmission}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Exterior Color</p>
              <p className="font-medium">{formData.exteriorColor}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Interior Color</p>
              <p className="font-medium">{formData.interiorColor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Location:</span>
            <span className="font-medium">{formData.emirate}</span>
          </div>
        </div>

        {/* Pricing & Description */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing & Description
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(3)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                AED {formatNumberWithCommas(formData.price || '')}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm bg-muted/50 p-3 rounded-md line-clamp-3">
                {formData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEditStep(3)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {formData.contactPhoneCountryCode} {formData.contactPhoneNumber}
              </span>
              {formData.contactPhoneHasWhatsapp && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  WhatsApp
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Seller Type:</span>
              <span className="font-medium">{formData.sellerType}</span>
              {formData.sellerType === 'Dealership' && formData.dealershipName && (
                <span className="text-muted-foreground">({formData.dealershipName})</span>
              )}
            </div>
          </div>
        </div>

        {/* Submission Note */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Ready to Submit
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Your listing will be reviewed by our team before being published. You'll receive a notification once it's approved.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={uploadingImages}
            size="lg"
            className="px-8"
          >
            {uploadingImages ? "Uploading Images..." : "Submit Listing"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};