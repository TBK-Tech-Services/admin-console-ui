import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo } from "react";
import { ChevronDown, Loader2, Upload, Home, MapPin, Bed, Bath, Users, IndianRupee, FileText, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";
import { addVillaService, getAllAmenityCategoriesService } from "@/services/villa.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadImageToCloudinary, validateImageFile } from "@/utils/cloudinary";

export default function AddVillaFormComponent({ onClose }) {
  const { data: amenities = [] } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAllAmenityCategoriesService,
  });

  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    villaName: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    status: "AVAILABLE",
    description: "",
  });

  const categorySelectedCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    amenities.forEach(category => {
      counts[category.id] = category.amenities.filter(a =>
        selectedAmenities.includes(a.id)
      ).length;
    });
    return counts;
  }, [amenities, selectedAmenities]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) setSelectedAmenities([...selectedAmenities, amenityId]);
    else setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
  };

  const handleCategorySelectAll = (categoryId: number, checked: boolean) => {
    const category = amenities.find(cat => cat.id === categoryId);
    if (!category) return;
    if (checked) {
      const newAmenities = category.amenities.map(amenity => amenity.id);
      setSelectedAmenities(prev => [...prev, ...newAmenities.filter(id => !prev.includes(id))]);
    } else {
      const amenityIds = category.amenities.map(amenity => amenity.id);
      setSelectedAmenities(prev => prev.filter(id => !amenityIds.includes(id)));
    }
  };

  const handleSubmit = async () => {
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
      const imageUrl = await uploadImageToCloudinary(selectedImage);
      const payload = {
        villaName: formData.villaName,
        location: formData.location,
        bedRooms: formData.bedrooms,
        bathRooms: formData.bathrooms,
        maxGuest: formData.maxGuests,
        status: formData.status,
        description: formData.description,
        imageUrl: imageUrl,
        amenities: selectedAmenities,
      };
      await addVillaMutation.mutateAsync(payload);
    } catch (error: any) {
      toast.error(error.message || "Failed to add villa");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || addVillaMutation.isPending;

  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Home className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-base">Basic Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />Villa Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter villa name"
                  value={formData.villaName}
                  onChange={(e) => handleInputChange('villaName', e.target.value)}
                  className="h-11 border-border/60 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="text-sm font-medium">
                    <Bed className="h-4 w-4 inline mr-1 text-muted-foreground" />Bedrooms
                  </Label>
                  <Input id="bedrooms" type="number" placeholder="3" min="1" value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                    className="h-11 border-border/60 focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="text-sm font-medium">
                    <Bath className="h-4 w-4 inline mr-1 text-muted-foreground" />Bathrooms
                  </Label>
                  <Input id="bathrooms" type="number" placeholder="2" min="1" value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                    className="h-11 border-border/60 focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGuests" className="text-sm font-medium">
                    <Users className="h-4 w-4 inline mr-1 text-muted-foreground" />Guests
                  </Label>
                  <Input id="maxGuests" type="number" placeholder="8" min="1" value={formData.maxGuests}
                    onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                    className="h-11 border-border/60 focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="h-11 border-border/60 focus:border-primary transition-colors">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">
                        <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" />Available</div>
                      </SelectItem>
                      <SelectItem value="OCCUPIED">
                        <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-orange-500" />Occupied</div>
                      </SelectItem>
                      <SelectItem value="MAINTENANCE">
                        <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-red-500" />Maintenance</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the villa and its features..."
              className="min-h-[120px] resize-none border-border/60 focus:border-primary transition-colors"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="image" className="text-sm font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />Villa Image *
            </Label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer hover:scale-[1.01] transition-transform duration-200">
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Label htmlFor="image" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP (max 5MB)</p>
                    </div>
                  </div>
                </Label>
              </div>
            ) : (
              <div className="animate-in fade-in duration-200 relative border-2 border-primary/30 rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Villa preview" className="w-full h-48 object-cover" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-all shadow-lg">
                  <X className="h-4 w-4" />
                </button>
                <div className="p-2 bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0">
                  <p className="text-xs text-white font-medium truncate">{selectedImage?.name}</p>
                  <p className="text-xs text-white/80">{selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Amenities */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-accent/10">
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-semibold text-base">Amenities *</h3>
          </div>

          <div className="border-2 rounded-xl divide-y overflow-hidden bg-muted/20 max-h-[500px]">
            <div className="overflow-y-auto max-h-full">
              {amenities.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const selectedCount = categorySelectedCounts[category.id] ?? 0;
                const totalCount = category.amenities.length;
                const isPartiallySelected = selectedCount > 0 && selectedCount < totalCount;
                const isFullySelected = selectedCount === totalCount && selectedCount > 0;

                return (
                  <div key={category.id} className="bg-card">
                    <div className="flex items-center justify-between p-3 hover:bg-accent/5 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3 flex-1">
                        <Checkbox
                          checked={isFullySelected}
                          ref={(el) => { if (el) el.indeterminate = isPartiallySelected; }}
                          onCheckedChange={(checked) => handleCategorySelectAll(category.id, checked as boolean)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="text-xl">{category.icon}</div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{category.name}</span>
                            {selectedCount > 0 && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                {selectedCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => toggleCategory(category.id)}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-3 pb-3 bg-muted/30">
                        <div className="grid grid-cols-1 gap-2 pt-2">
                          {category.amenities.map((amenity) => (
                            <div key={amenity.id}
                              className={`flex items-center space-x-2 p-2 rounded-lg transition-all hover:translate-x-0.5 ${
                                selectedAmenities.includes(amenity.id)
                                  ? 'bg-primary/10 border border-primary/20'
                                  : 'hover:bg-muted'
                              }`}>
                              <Checkbox
                                checked={selectedAmenities.includes(amenity.id)}
                                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <Label className="text-sm cursor-pointer flex-1">{amenity.name}</Label>
                              {selectedAmenities.includes(amenity.id) && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedAmenities.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
                <CheckCircle2 className="h-4 w-4" />
                Selected: {selectedAmenities.length}
              </div>
              <div className="text-xs text-muted-foreground">
                {amenities.map(category => {
                  const count = categorySelectedCounts[category.id] ?? 0;
                  return count > 0 ? `${category.name}: ${count}` : null;
                }).filter(Boolean).join(' • ')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose} disabled={isLoading} className="min-w-[100px]">
          Cancel
        </Button>
        <Button
          className="bg-gradient-primary hover:shadow-medium transition-all min-w-[150px] gap-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isUploading ? 'Uploading...' : 'Adding...'}
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Add Villa
            </>
          )}
        </Button>
      </div>
    </div>
  );
}