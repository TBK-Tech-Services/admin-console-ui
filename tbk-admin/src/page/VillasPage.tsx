import { Home, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddVillaFormComponent from "@/components/villa/AddVillaFormComponent";
import VillaCardComponent from "@/components/villa/VillaCardComponent";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllAmenityCategoriesService, getAllVillasService } from "@/services/villa.service";
import { setAmenities } from "@/store/slices/amenitiesSlice";

export default function VillasPage() {

  // useDispatch 
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // State Variables
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useQuery for Fetching Amenitites Category
  const { data } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAllAmenityCategoriesService,
  });

  // useQuery for Fetching all Villas
  const { data: villas } = useQuery({
    queryKey: ['villas'],
    queryFn: getAllVillasService,
  });

  console.log(villas)

  // useEffect
  useEffect(() => {
    if (data) {
      dispatch(setAmenities(data));
    }
  }, [data, dispatch]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Stack on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Villa Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Manage your villa properties and track their performance ({villas?.length || 0} villas)
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Villa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                Add New Villa
              </DialogTitle>
            </DialogHeader>
            <AddVillaFormComponent onClose={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {
        (villas?.length === 0)
          ?
          (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              <p className="text-sm sm:text-base">No villas found. Add your first villa to get started!</p>
            </div>
          )
          :
          (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {
                villas?.map((villa) => (
                  <VillaCardComponent
                    key={villa?.id}
                    villa={villa}
                    onClick={() => navigate(`/villas/${villa?.id}`)}
                  />
                ))
              }
            </div>
          )
      }
    </div>
  );
}