import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AddVillaFormComponent({ onClose }) {

  // useSelector
  const amenities = useSelector((state: RootState) => state.amenities.listOfAmenities);

  // State Variables
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);


  // Handler Function to Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  // Handler Function to Handle Remove Image
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handler Function to Handle Toggle Category
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
    } 
    else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  // Handler Function to Handle Get Category Selected Count
  const getCategorySelectedCount = (categoryId: number) => {
    const category = amenities.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    return category.amenities.filter(amenity => 
      selectedAmenities.includes(amenity.id)
    ).length;
  };

  // Handler Function to Handle Category Partially Selected
  const isCategoryPartiallySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenities.find(cat => cat.id === categoryId);
    return selectedCount > 0 && selectedCount < (category?.amenities.length || 0);
  };

  // Handler Function to Handle Is Category Fully Selected
  const isCategoryFullySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenities.find(cat => cat.id === categoryId);
    return selectedCount === (category?.amenities.length || 0) && selectedCount > 0;
  };

  // Handler Function to Handle Category Select All
  const handleCategorySelectAll = (categoryId: number, checked: boolean) => {
    const category = amenities.find(cat => cat.id === categoryId);
    if (!category) return;

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
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Villa Name</Label>
            <Input id="name" placeholder="Enter villa name" />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" placeholder="3" min="1" />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" placeholder="2" min="1" />
          </div>
          <div>
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input id="maxGuests" type="number" placeholder="8" min="1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price per Night</Label>
            <Input id="price" type="number" placeholder="15000" min="0" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="OCCUPIED">Occupied</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Updated Amenities Section */}
        <div className="space-y-4">
          <Label htmlFor="amenities" className="text-base font-medium">Amenities</Label>
          
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
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the villa and its features..." 
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="images">Villa Images</Label>
          <div className="space-y-2">
            <Input 
              id="images" 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
            />
            {selectedImages.length > 0 && (
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
          Add Villa
        </Button>
      </div>
    </>
  );
}