import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface UseFormAutosaveProps {
  form: UseFormReturn<any>;
  storageKey: string;
  enabled?: boolean;
}

export const useFormAutosave = ({ form, storageKey, enabled = true }: UseFormAutosaveProps) => {
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    if (!enabled) return;
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key] !== undefined && parsedData[key] !== null && parsedData[key] !== '') {
            form.setValue(key, parsedData[key]);
          }
        });
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }, [form, storageKey, enabled]);

  const saveDraft = () => {
    try {
      const value = form.getValues();
      // Filter out empty values to keep localStorage clean
      const filteredValue = Object.fromEntries(
        Object.entries(value).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      );
      
      localStorage.setItem(storageKey, JSON.stringify(filteredValue));
      
      toast({
        title: "Draft Saved",
        description: "Your progress has been saved.",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error saving form data:', error);
      toast({
        title: "Error",
        description: "Failed to save draft.",
        variant: "destructive"
      });
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error clearing saved form data:', error);
    }
  };

  return { saveDraft, clearSavedData };
};
