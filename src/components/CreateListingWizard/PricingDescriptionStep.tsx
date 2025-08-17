import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';

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

interface PricingDescriptionStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  formatNumberWithCommas: (value: string) => string;
  handlePriceChange: (value: string) => string;
}

export const PricingDescriptionStep = ({
  form,
  onNext,
  onBack,
  formatNumberWithCommas,
  handlePriceChange
}: PricingDescriptionStepProps) => {
  
  // Check if required fields are filled
  const requiredFields = ['price', 'description', 'contactPhoneCountryCode', 'contactPhoneNumber', 'sellerType'];
  const sellerType = form.watch("sellerType");
  const dealershipRequired = sellerType === "Dealership" && !form.getValues("dealershipName");
  
  const canProceed = requiredFields.every(field => {
    const value = form.getValues(field);
    return value && value.toString().trim() !== '';
  }) && !dealershipRequired;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Pricing & Description
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your asking price, provide a detailed description, and add your contact information.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pricing</h3>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (AED) *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      AED
                    </span>
                    <Input 
                      placeholder="150,000" 
                      value={formatNumberWithCommas(field.value || '')}
                      onChange={(e) => {
                        const formattedValue = handlePriceChange(e.target.value);
                        e.target.value = formattedValue;
                      }}
                      className="pl-12"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your car's condition, features, service history, and any additional information that would interest potential buyers..."
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Provide details about the car's condition, features, service history, modifications, and any other relevant information.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p className="text-sm text-muted-foreground">
            Provide a phone number for buyers to contact you
          </p>
          
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

        {/* Seller Information */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">Seller Information</h3>
          <p className="text-sm text-muted-foreground">
            Are you the owner or a dealership?
          </p>
          
          <FormField
            control={form.control}
            name="sellerType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Seller Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Owner" id="owner" />
                      <Label htmlFor="owner">Owner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Dealership" id="dealership" />
                      <Label htmlFor="dealership">Dealership</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("sellerType") === "Dealership" && (
            <FormField
              control={form.control}
              name="dealershipName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dealership Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Falcon Motors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            Next: Review & Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};