import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Bed, Bath, Edit, Eye, Trash2, X, ChevronLeft, ChevronRight, Images, ExternalLink } from "lucide-react";
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDeleteVilla = () => {
    if (onDeleteVilla) {
      onDeleteVilla();
    }
  };

  // Get all images - combine imageUrl with images array
  const allImages = [
    ...(villa.imageUrl ? [{ url: villa.imageUrl }] : []),
    ...(villa.images || [])
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const formattedPrice = `₹${villa.price?.toLocaleString()}/night`;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          {/* Main Image with click to open gallery */}
          <div className="relative group cursor-pointer" onClick={() => openGallery(0)}>
            <img
              src={villa.imageUrl || allImages[0]?.url || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"}
              alt={villa.name}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
            />
            {/* Overlay with view gallery button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2">
                <Images className="h-5 w-5" />
                <span className="font-medium">View All Photos ({allImages.length})</span>
              </div>
            </div>
            {/* Image count badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Images className="h-4 w-4" />
              {allImages.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {allImages.slice(0, 5).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${villa.name} ${index + 1}`}
                  className={`h-16 w-24 object-cover rounded cursor-pointer transition-all ${index === 0 ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                  onClick={() => openGallery(index)}
                />
              ))}
              {allImages.length > 5 && (
                <div
                  className="h-16 w-24 bg-muted rounded flex items-center justify-center cursor-pointer hover:bg-muted/80"
                  onClick={() => openGallery(5)}
                >
                  <span className="text-sm font-medium">+{allImages.length - 5} more</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-xl sm:text-2xl font-bold">{villa.name}</h1>
              <div className="flex items-center gap-2">
                <Badge className={`${getVillaStatusColor(villa.status)} text-xs`}>
                  {villa.status}
                </Badge>

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
                      <AlertDialogContent className="mx-4 sm:mx-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-base sm:text-lg">Delete Villa</AlertDialogTitle>
                          <AlertDialogDescription className="text-xs sm:text-sm">
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
                        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                          <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteVilla}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
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
            <div className="flex items-center text-muted-foreground mb-3 sm:mb-4 text-sm">
              <button
                onClick={() => villa.location && window.open(villa.location, '_blank')}
                className="flex items-center text-primary hover:text-primary/80 mb-3 sm:mb-4 text-sm transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 shrink-0" />
                <span>View Location</span>
                <ExternalLink className="h-3 w-3 ml-1 shrink-0" />
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between py-1.5 sm:py-2 border-b text-sm">
              <span className="text-muted-foreground">Price per night</span>
              <span className="font-bold text-primary text-base sm:text-lg">{formattedPrice}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2 border-b text-sm">
              <span className="text-muted-foreground">Max Guests</span>
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                {villa.maxGuests} guests
              </div>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2 border-b text-sm">
              <span className="text-muted-foreground">Bedrooms</span>
              <div className="flex items-center">
                <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                {villa.bedrooms} bedrooms
              </div>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2 text-sm">
              <span className="text-muted-foreground">Bathrooms</span>
              <div className="flex items-center">
                <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                {villa.bathrooms} bathrooms
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 h-9 sm:h-10 text-xs sm:text-sm" variant="outline" onClick={onEditClick}>
              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Edit Villa
            </Button>
            <Button className="flex-1 h-9 sm:h-10 text-xs sm:text-sm" onClick={onToggleBookings}>
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline">{showAllBookings ? 'Hide' : 'View'} All</span>
              <span className="xs:hidden">{showAllBookings ? 'Hide' : 'View'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Image Gallery Modal */}
      {isGalleryOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/95 z-[9998]"
            onClick={() => setIsGalleryOpen(false)}
          />
          <div className="fixed inset-0 z-[9999] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-lg font-medium">
                {currentImageIndex + 1} / {allImages.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:bg-white/20 h-10 w-10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center px-4 relative">
              {/* Previous Button */}
              {allImages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="absolute left-4 text-white hover:bg-white/20 h-12 w-12"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}

              {/* Current Image */}
              <img
                src={allImages[currentImageIndex]?.url}
                alt={`${villa.name} ${currentImageIndex + 1}`}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />

              {/* Next Button */}
              {allImages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="absolute right-4 text-white hover:bg-white/20 h-12 w-12"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="p-4">
              <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${villa.name} ${index + 1}`}
                    className={`h-16 w-24 object-cover rounded cursor-pointer transition-all ${index === currentImageIndex
                      ? 'ring-2 ring-white opacity-100'
                      : 'opacity-50 hover:opacity-80'
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}