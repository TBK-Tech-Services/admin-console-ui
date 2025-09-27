import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export default function EditVillaModalComponent({ villa, isOpen, onClose }) {

  // useSelector
  const amenities = useSelector((state: RootState) => state.amenities.listOfAmenities);

  // State Variables
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // useEffect
  useEffect(() => {
    if (villa && villa.amenities) {
      const amenityIds = villa.amenities.map((amenity: any) => amenity.amenity?.id || amenity.id);
      setSelectedAmenities(amenityIds);
    }
  }, [villa]);

  // Handler Function to Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  // Handler Function to Remove Selected Image
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handler Function to Toggle Category Expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handler Function to Handle Amenity Change
  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  // Helper Functions for Category Selection States
  const getCategorySelectedCount = (categoryId: number) => {
    const category = amenities.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    return category.amenities.filter(amenity => 
      selectedAmenities.includes(amenity.id)
    ).length;
  };

  // Handler Functions to check if Category is Partially or Fully Selected
  const isCategoryPartiallySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenities.find(cat => cat.id === categoryId);
    return selectedCount > 0 && selectedCount < (category?.amenities.length || 0);
  };

  // Handler Functions to check if Category is Fully Selected
  const isCategoryFullySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenities.find(cat => cat.id === categoryId);
    return selectedCount === (category?.amenities.length || 0) && selectedCount > 0;
  };

  // Handler Function to Handle Select All in a Category
  const handleCategorySelectAll = (categoryId: number, checked: boolean) => {
    const category = amenities.find(cat => cat.id === categoryId);
    if (!category){
      return;
    };

    if (checked) {
      const newAmenities = category.amenities.map(amenity => amenity.id);
      setSelectedAmenities(prev => [...prev, ...newAmenities.filter(id => !prev.includes(id))]);
    } 
    else {
      const amenityIds = category.amenities.map(amenity => amenity.id);
      setSelectedAmenities(prev => prev.filter(id => !amenityIds.includes(id)));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Villa Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Villa Name</Label>
              <Input id="edit-name" defaultValue={villa?.name} />
            </div>
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" defaultValue={villa?.location} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="edit-bedrooms">Bedrooms</Label>
              <Input id="edit-bedrooms" type="number" defaultValue={villa?.bedrooms} min="1" />
            </div>
            <div>
              <Label htmlFor="edit-bathrooms">Bathrooms</Label>
              <Input id="edit-bathrooms" type="number" defaultValue={villa?.bathrooms} min="1" />
            </div>
            <div>
              <Label htmlFor="edit-maxGuests">Max Guests</Label>
              <Input id="edit-maxGuests" type="number" defaultValue={villa?.maxGuests} min="1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-price">Price per Night</Label>
              <Input 
                id="edit-price" 
                type="number"
                defaultValue={villa?.price || 15000}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select defaultValue={villa?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="OCCUPIED">Occupied</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Updated Amenities Section - Same as AddVilla */}
          <div className="space-y-4">
            <Label htmlFor="edit-amenities" className="text-base font-medium">Amenities</Label>
            
            <div className="border rounded-lg divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {amenities.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const selectedCount = getCategorySelectedCount(category.id);
                const isPartiallySelected = isCategoryPartiallySelected(category.id);
                const isFullySelected = isCategoryFullySelected(category.id);
                
                return (
                  <div key={category.id} className="bg-white">
                    {/* Category Header */}
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <Checkbox 
                          checked={isFullySelected}
                          ref={(el) => {
                            if (el) el.indeterminate = isPartiallySelected;
                          }}
                          onCheckedChange={(checked) => handleCategorySelectAll(category.id, checked as boolean)}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div className="text-gray-600">
                            {category.icon}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{category.name}</span>
                          {selectedCount > 0 && (
                            <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full">
                              {selectedCount}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Category Amenities */}
                    {isExpanded && (
                      <div className="px-3 pb-3 bg-gray-50">
                        <div className="grid grid-cols-1 gap-2 pt-2">
                          {category.amenities.map((amenity) => (
                            <div key={amenity.id} className="flex items-center space-x-3">
                              <Checkbox 
                                checked={selectedAmenities.includes(amenity.id)} 
                                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                              />
                              <Label className="text-sm text-gray-700 cursor-pointer flex-1">
                                {amenity.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Summary */}
            {selectedAmenities.length > 0 && (
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-800 mb-1">
                  Selected Amenities ({selectedAmenities.length})
                </div>
                <div className="text-xs text-blue-600">
                  {amenities.map(category => {
                    const count = getCategorySelectedCount(category.id);
                    return count > 0 ? `${category.name}: ${count}` : null;
                  }).filter(Boolean).join(' • ')}
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea 
              id="edit-description" 
              defaultValue={villa?.description}
              placeholder="Describe the villa and its features..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="edit-images">Villa Images</Label>
            <div className="space-y-2">
              {/* Current Images Display */}
              {villa?.images && villa.images.length > 0 && (
                <div className="mb-3">
                  <Label className="text-sm font-medium text-muted-foreground">Current Images:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {villa.images.map((image: any, index: number) => (
                      <div key={index} className="relative bg-slate-50 rounded-md p-2 text-sm">
                        <img 
                          src={image.link} 
                          alt="Villa" 
                          className="w-full h-20 object-cover rounded mb-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            // Handle current image removal
                            console.log('Remove current image:', image.id);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ✕
                        </button>
                        <div className="text-xs text-slate-500">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Upload */}
              <Input 
                id="edit-images" 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
              />
              
              {selectedImages.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">New Images:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative bg-slate-50 rounded-md p-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="truncate flex-1 mr-2">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={onClose}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}