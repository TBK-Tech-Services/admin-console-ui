import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface AddVillaFormComponentProps {
  onClose: () => void;
}

export default function AddVillaFormComponent({ onClose }: AddVillaFormComponentProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [customAmenities, setCustomAmenities] = useState<string[]>([]);
  const [newAmenityInput, setNewAmenityInput] = useState<string>("");

  // Available amenities (matching your database enum)
  const amenitiesList = [
    { id: 1, name: "WIFI" },
    { id: 2, name: "POOL" },
    { id: 3, name: "PARKING" },
    { id: 4, name: "BEACH_ACCESS" },
    { id: 5, name: "KITCHEN" },
    { id: 6, name: "AC" },
    { id: 7, name: "TV" },
    { id: 8, name: "BALCONY" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const addCustomAmenity = () => {
    if (newAmenityInput.trim() && !customAmenities.includes(newAmenityInput.trim())) {
      setCustomAmenities([...customAmenities, newAmenityInput.trim()]);
      setNewAmenityInput("");
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    setCustomAmenities(customAmenities.filter(item => item !== amenity));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAmenity();
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

        <div>
          <Label htmlFor="amenities">Amenities</Label>
          
          {/* Predefined Amenities */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity.id} className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox 
                  checked={selectedAmenities.includes(amenity.id)} 
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)} 
                />
                <Label className="text-sm font-normal">{amenity.name}</Label>
              </div>
            ))}
          </div>

          {/* Add Custom Amenity */}
          <div className="mt-4 space-y-2">
            <Label className="text-sm font-medium">Add Custom Amenity</Label>
            <div className="flex gap-2">
              <Input
                value={newAmenityInput}
                onChange={(e) => setNewAmenityInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter custom amenity (e.g., Hot Tub, Gym)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addCustomAmenity}
                variant="outline"
                size="sm"
                className="px-4"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Custom Amenities Display */}
          {customAmenities.length > 0 && (
            <div className="mt-3">
              <Label className="text-sm font-medium text-muted-foreground">Custom Amenities:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {customAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomAmenity(amenity)}
                      className="text-primary hover:text-primary/70 ml-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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