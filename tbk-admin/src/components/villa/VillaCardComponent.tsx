import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AddVillaFormComponentProps {
  onClose: () => void;
}

export default function AddVillaFormComponent({ onClose }: AddVillaFormComponentProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input id="maxGuests" type="number" placeholder="8" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price per Night</Label>
            <Input id="price" placeholder="₹15,000" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="amenities">Amenities</Label>
          <Textarea 
            id="amenities" 
            placeholder="WiFi, Pool, Parking, Beach Access (comma separated)" 
            className="min-h-[60px]"
          />
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