
export interface Villa_Data {
  villaName: string;
  location: string;
  bedRooms: number;
  bathRooms: number;
  maxGuest: number;
  pricePerNight: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  description: string;
  imageUrl: string; // ✅ Cloudinary URL
  amenities: number[];
}