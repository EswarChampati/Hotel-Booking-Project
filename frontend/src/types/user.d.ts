export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: string;
  starRating: string;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};
