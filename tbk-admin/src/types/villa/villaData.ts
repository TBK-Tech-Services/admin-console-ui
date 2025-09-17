
export interface Villa_Data {
  villaName: string;
  location: string;
  bedRooms: number;
  bathRooms: number;
  maxGuest: number;
  pricePerNight: number;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE"; 
  amenities: number[];
  description: string;
  images: string[];
}