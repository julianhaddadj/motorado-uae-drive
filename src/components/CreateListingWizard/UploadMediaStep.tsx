import { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface UploadMediaStepProps {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  uploadingImages: boolean;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export const UploadMediaStep = ({
  selectedImages,
  setSelectedImages,
  uploadingImages,
  onNext,
  onBack,
  isFirstStep
}: UploadMediaStepProps) => {
  const { toast } = useToast();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const canProceed = selectedImages.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Upload Car Images
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload high-quality photos of your car. The first image will be used as the main photo.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Input */}
        <div className="space-y-2">
          <Label htmlFor="images">Select Images</Label>
          <Input 
            id="images" 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange}
            disabled={uploadingImages}
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground">
            Upload up to 10 images (JPG, PNG, WebP). First image will be the main photo.
          </p>
        </div>

        {/* Drag Drop Zone */}
        {selectedImages.length === 0 && (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Click above to select images or drag and drop them here
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, WebP (Max 10 images)
            </p>
          </div>
        )}

        {/* Image Previews */}
        {selectedImages.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedImages([])}
              >
                Clear All
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Drag images to reorder them. The first image will be the main photo.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedImages.map((file, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-move group transition-all duration-200 ${
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
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                      Main
                    </div>
                  )}
                  
                  <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                        Drag to reorder
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
          >
            Next: Vehicle Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};