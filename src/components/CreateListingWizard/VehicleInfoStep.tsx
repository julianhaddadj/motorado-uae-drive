import { Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BODY_TYPES } from '@/constants/bodyTypes';
import { useMakesAndModels } from '@/hooks/use-makes-models';

interface VehicleInfoStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  formatNumberWithCommas: (value: string) => string;
  handleMileageChange: (value: string) => string;
}

export const VehicleInfoStep = ({
  form,
  onNext,
  onBack,
  formatNumberWithCommas,
  handleMileageChange
}: VehicleInfoStepProps) => {
  const { makes, loading: makesLoading, fetchModelsForMake, getModelsByMake, isLoadingModelsForMake } = useMakesAndModels();
  
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
    form.setValue("model", value);
  };

  // Check if required fields are filled
  const requiredFields = ['make', 'model', 'year', 'mileage', 'emirate', 'regionalSpecs', 'bodyType', 'insuredInUAE', 'fuelType', 'exteriorColor', 'interiorColor', 'warranty', 'doors', 'transmission', 'horsepower', 'steeringSide'];
  const canProceed = requiredFields.every(field => {
    const value = form.getValues(field);
    return value && value.toString().trim() !== '';
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          Vehicle Information
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Provide detailed information about your vehicle's specifications and features.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
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
                        <SelectValue placeholder={makesLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                            <span>Loading makes...</span>
                          </div>
                        ) : "Select make"} />
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
                            : isLoadingModelsForMake(selectedMake) ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                                <span>Loading models...</span>
                              </div>
                            ) : "Select model"
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
            
            <FormField
              control={form.control}
              name="trim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trim (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sport, Limited, Base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input 
                      placeholder="50,000" 
                      value={formatNumberWithCommas(field.value || '')}
                      onChange={(e) => {
                        const formattedValue = handleMileageChange(e.target.value);
                        e.target.value = formattedValue;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Location & Specs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location & Specifications</h3>
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
                      {BODY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              name="insuredInUAE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insured in UAE? *</FormLabel>
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
        </div>

        {/* Engine & Performance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Engine & Performance</h3>
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
          </div>
        </div>

        {/* Exterior & Interior */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Exterior & Interior</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Grey">Grey</SelectItem>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Brown">Brown</SelectItem>
                      <SelectItem value="Beige">Beige</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Purple">Purple</SelectItem>
                      <SelectItem value="Pink">Pink</SelectItem>
                      <SelectItem value="Burgundy">Burgundy</SelectItem>
                      <SelectItem value="Tan">Tan</SelectItem>
                      <SelectItem value="Teal">Teal</SelectItem>
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
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Grey">Grey</SelectItem>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Brown">Brown</SelectItem>
                      <SelectItem value="Beige">Beige</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Purple">Purple</SelectItem>
                      <SelectItem value="Pink">Pink</SelectItem>
                      <SelectItem value="Burgundy">Burgundy</SelectItem>
                      <SelectItem value="Tan">Tan</SelectItem>
                      <SelectItem value="Teal">Teal</SelectItem>
                      <SelectItem value="Other Color">Other Color</SelectItem>
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
        </div>

        {/* Warranty */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Warranty</h3>
          <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warranty *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="max-w-xs">
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
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
          >
            Next: Pricing & Description
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};