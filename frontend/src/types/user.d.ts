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
  imageURLs: string[];
  adultCount: number;
  childCount: number;
};

export type HotelResponseType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageURL: string[];
  lastUpdated: Date;
};
