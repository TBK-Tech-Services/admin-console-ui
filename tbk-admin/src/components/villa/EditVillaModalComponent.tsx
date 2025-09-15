import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface EditVillaModalComponentProps {
  villa: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditVillaModalComponent({ villa, isOpen, onClose }: EditVillaModalComponentProps) {
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
              <Input id="edit-name" defaultValue={villa.name} />
            </div>
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" defaultValue={villa.location} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="edit-bedrooms">Bedrooms</Label>
              <Select defaultValue={villa.bedrooms.toString()}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="edit-bathrooms">Bathrooms</Label>
              <Select defaultValue={villa.bathrooms.toString()}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="edit-maxGuests">Max Guests</Label>
              <Input id="edit-maxGuests" type="number" defaultValue={villa.maxGuests} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-price">Price per Night</Label>
              <Input 
                id="edit-price" 
                type="number"
                defaultValue="15000"
                min="0"
                placeholder="15000"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select defaultValue={villa.status.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
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
            <Label htmlFor="edit-amenities">Amenities</Label>
            <Textarea 
              id="edit-amenities" 
              defaultValue={villa.amenities.join(", ")}
              className="min-h-[60px]"
            />
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea 
              id="edit-description" 
              defaultValue={villa.description}
              className="min-h-[80px]"
            />
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