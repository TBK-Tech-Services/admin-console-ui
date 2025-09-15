import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Wifi, Car, Utensils, Fan, Shield, Home, Users, Headphones, Trees, MapPin, Wrench } from "lucide-react";

interface EditVillaModalComponentProps {
  villa: any;
  isOpen: boolean;
  onClose: () => void;
}

// Same categorized amenities data as AddVilla form
const amenityCategories = [
  {
    id: 1,
    name: "Bathroom",
    icon: <Home className="h-4 w-4" />,
    amenities: [
      { id: 1, name: "Bath" },
      { id: 2, name: "Hair dryer" },
      { id: 3, name: "Cleaning products" },
      { id: 4, name: "Shampoo" },
      { id: 5, name: "Conditioner" },
      { id: 6, name: "Own body soap" },
      { id: 7, name: "Hot water" },
      { id: 8, name: "Shower gel" }
    ]
  },
  {
    id: 2,
    name: "Bedroom and laundry",
    icon: <Home className="h-4 w-4" />,
    amenities: [
      { id: 9, name: "Free washer - In unit" },
      { id: 10, name: "Essentials" },
      { id: 11, name: "Towels, bed sheets, soap and toilet paper" },
      { id: 12, name: "Hangers" },
      { id: 13, name: "Bed linen" },
      { id: 14, name: "Cotton linen" },
      { id: 15, name: "Extra pillows and blankets" },
      { id: 16, name: "Room-darkening blinds" },
      { id: 17, name: "Iron" },
      { id: 18, name: "Clothes drying rack" },
      { id: 19, name: "Safe" },
      { id: 20, name: "Clothes storage: wardrobe" }
    ]
  },
  {
    id: 3,
    name: "Internet and office",
    icon: <Wifi className="h-4 w-4" />,
    amenities: [
      { id: 21, name: "Wi-Fi" },
      { id: 22, name: "Dedicated workspace" }
    ]
  },
  {
    id: 4,
    name: "Family",
    icon: <Users className="h-4 w-4" />,
    amenities: [
      { id: 23, name: "Cot" },
      { id: 24, name: "Board games" },
      { id: 25, name: "Babysitter recommendations" }
    ]
  },
  {
    id: 5,
    name: "Home safety",
    icon: <Shield className="h-4 w-4" />,
    amenities: [
      { id: 26, name: "Fire extinguisher" }
    ]
  },
  {
    id: 6,
    name: "Heating and cooling",
    icon: <Fan className="h-4 w-4" />,
    amenities: [
      { id: 27, name: "AC - split-type ductless system" },
      { id: 28, name: "Ceiling fan" }
    ]
  },
  {
    id: 7,
    name: "Kitchen and dining",
    icon: <Utensils className="h-4 w-4" />,
    amenities: [
      { id: 29, name: "Kitchen" },
      { id: 30, name: "Space where guests can cook their own meals" },
      { id: 31, name: "Fridge" },
      { id: 32, name: "Microwave" },
      { id: 33, name: "Cooking basics" },
      { id: 34, name: "Pots and pans, oil, salt and pepper" },
      { id: 35, name: "Dishes and cutlery" },
      { id: 36, name: "Bowls, chopsticks, plates, cups, etc." },
      { id: 37, name: "Freezer" },
      { id: 38, name: "Gas cooker" },
      { id: 39, name: "Double oven" },
      { id: 40, name: "Kettle" },
      { id: 41, name: "Wine glasses" },
      { id: 42, name: "Toaster" },
      { id: 43, name: "Baking sheet" },
      { id: 44, name: "Blender" },
      { id: 45, name: "Barbecue utensils" },
      { id: 46, name: "Grill, charcoal, bamboo skewers/iron skewers, etc" }
    ]
  },
  {
    id: 8,
    name: "Services",
    icon: <Wrench className="h-4 w-4" />,
    amenities: [
      { id: 47, name: "Pets allowed" },
      { id: 48, name: "Luggage drop-off allowed" },
      { id: 49, name: "Long-term stays allowed" },
      { id: 50, name: "Cleaning available during stay" }
    ]
  },
  {
    id: 9,
    name: "Entertainment",
    icon: <Headphones className="h-4 w-4" />,
    amenities: [
      { id: 51, name: "TV" },
      { id: 52, name: "Bluetooth sound system" },
      { id: 53, name: "Books and reading material" }
    ]
  },
  {
    id: 10,
    name: "Outdoor",
    icon: <Trees className="h-4 w-4" />,
    amenities: [
      { id: 54, name: "Private patio or balcony" },
      { id: 55, name: "Private back garden" },
      { id: 56, name: "Outdoor furniture" },
      { id: 57, name: "BBQ grill" },
      { id: 58, name: "Sun loungers" }
    ]
  },
  {
    id: 11,
    name: "Parking and facilities",
    icon: <Car className="h-4 w-4" />,
    amenities: [
      { id: 59, name: "Free parking on premises" },
      { id: 60, name: "Free on-street parking" },
      { id: 61, name: "Private pool" }
    ]
  },
  {
    id: 12,
    name: "Location features",
    icon: <MapPin className="h-4 w-4" />,
    amenities: [
      { id: 62, name: "Private entrance" },
      { id: 63, name: "Separate street or building entrance" }
    ]
  }
];

export default function EditVillaModalComponent({ villa, isOpen, onClose }: EditVillaModalComponentProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Initialize selected amenities when villa data changes
  useEffect(() => {
    if (villa && villa.amenities) {
      // Extract amenity IDs from villa.amenities array
      // Assuming villa.amenities is array of amenity objects with id field
      const amenityIds = villa.amenities.map((amenity: any) => amenity.amenity?.id || amenity.id);
      setSelectedAmenities(amenityIds);
    }
  }, [villa]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const getCategorySelectedCount = (categoryId: number) => {
    const category = amenityCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    return category.amenities.filter(amenity => 
      selectedAmenities.includes(amenity.id)
    ).length;
  };

  const isCategoryPartiallySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenityCategories.find(cat => cat.id === categoryId);
    return selectedCount > 0 && selectedCount < (category?.amenities.length || 0);
  };

  const isCategoryFullySelected = (categoryId: number) => {
    const selectedCount = getCategorySelectedCount(categoryId);
    const category = amenityCategories.find(cat => cat.id === categoryId);
    return selectedCount === (category?.amenities.length || 0) && selectedCount > 0;
  };

  const handleCategorySelectAll = (categoryId: number, checked: boolean) => {
    const category = amenityCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    if (checked) {
      const newAmenities = category.amenities.map(amenity => amenity.id);
      setSelectedAmenities(prev => [...prev, ...newAmenities.filter(id => !prev.includes(id))]);
    } else {
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
              {amenityCategories.map((category) => {
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
                  {amenityCategories.map(category => {
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