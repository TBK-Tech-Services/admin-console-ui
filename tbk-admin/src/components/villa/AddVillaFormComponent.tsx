import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addVillaService } from "@/services/villa.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // or your toast library
import { uploadImageToCloudinary, validateImageFile } from "@/utils/cloudinary";

export default function AddVillaFormComponent({ onClose }) {

  // useSelector
  const amenities = useSelector((state: RootState) => state.amenities.listOfAmenities);

  // useQueryClient for invalidation
  const queryClient = useQueryClient();

  // State Variables
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    villaName: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    pricePerNight: 0,
    status: "AVAILABLE",
    description: "",
  });

  // Mutation for adding villa
  const addVillaMutation = useMutation({
    mutationFn: addVillaService,
    onSuccess: () => {
      toast.success("Villa added successfully!");
      queryClient.invalidateQueries({ queryKey: ['villas'] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add villa");
    }
  });

  // Handler Function to Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate image
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handler Function to Remove Image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  // Handler to update form fields
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  // Main Form Submit Handler
  const handleSubmit = async () => {
    // Validation
    if (!formData.villaName || !formData.location || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload a villa image");
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    try {
      setIsUploading(true);

      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(selectedImage);

      // Step 2: Prepare payload
      const payload = {
        villaName: formData.villaName,
        location: formData.location,
        bedRooms: formData.bedrooms,
        bathRooms: formData.bathrooms,
        maxGuest: formData.maxGuests,
        pricePerNight: formData.pricePerNight,
        status: formData.status,
        description: formData.description,
        imageUrl: imageUrl, // ✅ Cloudinary URL
        amenities: selectedAmenities,
      };

      // Step 3: Submit to backend
      await addVillaMutation.mutateAsync(payload);

    } catch (error: any) {
      toast.error(error.message || "Failed to add villa");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || addVillaMutation.isPending;

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Villa Name</Label>
            <Input 
              id="name" 
              placeholder="Enter villa name" 
              value={formData.villaName}
              onChange={(e) => handleInputChange('villaName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter location" 
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input 
              id="bedrooms" 
              type="number" 
              placeholder="3" 
              min="1" 
              value={formData.bedrooms}
              onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input 
              id="bathrooms" 
              type="number" 
              placeholder="2" 
              min="1" 
              value={formData.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input 
              id="maxGuests" 
              type="number" 
              placeholder="8" 
              min="1" 
              value={formData.maxGuests}
              onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price per Night</Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="15000" 
              min="0" 
              value={formData.pricePerNight}
              onChange={(e) => handleInputChange('pricePerNight', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
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

        {/* Amenities Section - Keep as is */}
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
                        <div className="text-gray-600">{category.icon}</div>
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
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  </div>

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
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        {/* Updated Image Upload Section */}
        <div>
          <Label htmlFor="image">Villa Image</Label>
          <div className="space-y-3">
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label 
                  htmlFor="image" 
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  Click to upload villa image
                  <span className="block text-xs text-gray-400 mt-1">
                    PNG, JPG, WebP up to 5MB
                  </span>
                </Label>
              </div>
            ) : (
              <div className="relative border rounded-lg overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Villa preview" 
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
                <div className="p-2 bg-gray-50">
                  <p className="text-sm text-gray-700 truncate">{selectedImage?.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button 
          className="bg-gradient-primary hover:opacity-90"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isUploading ? 'Uploading Image...' : 'Adding Villa...'}
            </>
          ) : (
            'Add Villa'
          )}
        </Button>
      </div>
    </>
  );
}