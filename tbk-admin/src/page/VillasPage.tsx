import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddVillaFormComponent from "@/components/villa/AddVillaFormComponent";
import VillaCardComponent from "@/components/villa/VillaCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllAmenityCategoriesService } from "@/services/villa.service";
import { setAmenities } from "@/store/slices/amenitiesSlice";

export default function VillasPage() {
  
  // useSelector
  const villas = useSelector((state: RootState) => state.villas.listOfVilla);

  // useDispatch 
  const dispatch = useDispatch();
  
  // useNavigate
  const navigate = useNavigate();

  // State Variables
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useQuery
  const { data } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAllAmenityCategoriesService,
  });

  // useEffect
  useEffect(() => {
    if(data){
      dispatch(setAmenities(data));
    }
  }, [data , dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Villa Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your villa properties and track their performance ({villas?.length || 0} villas)
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Villa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Villa</DialogTitle>
            </DialogHeader>
            <AddVillaFormComponent onClose={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {
        (villas?.length === 0 )
        ? 
        (
          <div className="text-center py-12 text-muted-foreground">
            <p>No villas found. Add your first villa to get started!</p>
          </div>
        ) 
        : 
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              villas?.map((villa) => (
                <VillaCardComponent 
                  key={villa.id} 
                  villa={villa}
                  onClick={() => navigate(`/villas/${villa.id}`)}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
}