import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Bed, Bath, Edit, Eye, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { getVillaStatusColor } from "@/utils/getVillaStatusColor";

export default function VillaHeaderComponent({ villa, onEditClick, showAllBookings, onToggleBookings, onDeleteVilla }) {

  // Handler Function to Delete a Villa
  const handleDeleteVilla = () => {
    if (onDeleteVilla) {
      onDeleteVilla();
    }
  };

  // Format price
  const formattedPrice = `₹${villa.price?.toLocaleString()}/night`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <img 
          src={villa.images?.[0]?.link || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"} 
          alt={villa.name}
          className="w-full h-64 lg:h-80 object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold">{villa.name}</h1>
            <div className="flex items-center gap-2">
              <Badge className={getVillaStatusColor(villa.status)}>
                {villa.status}
              </Badge>
              
              {/* More Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEditClick}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Villa
                  </DropdownMenuItem>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem 
                        onSelect={(e) => e.preventDefault()}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Villa
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Villa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete "{villa.name}"? 
                          This action cannot be undone and will remove all associated data including:
                          <br /><br />
                          • Villa images and details
                          • All booking history
                          • Guest information and reviews
                          <br /><br />
                          <strong>This action is irreversible.</strong>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteVilla}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            {villa.location}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Price per night</span>
            <span className="font-bold text-primary text-lg">{formattedPrice}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Max Guests</span>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {villa.maxGuests} guests
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Bedrooms</span>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {villa.bedrooms} bedrooms
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Bathrooms</span>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {villa.bathrooms} bathrooms
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline" onClick={onEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Villa
          </Button>
          <Button className="flex-1" onClick={onToggleBookings}>
            <Eye className="h-4 w-4 mr-2" />
            {showAllBookings ? 'Hide' : 'View'} All Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}