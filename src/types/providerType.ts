// --- Interfaces ---
export interface Category {
  _id: string;
  name: string;
}

export interface Profile {
  _id: string;
  name: string;
  age: number;
  bio: string;
  gallery: string[];
  city: { _id: string; name: string };
  category: { _id: string; name: string };
  services: { _id: string; name: string }[];
  pricing: {
    oneHour: number;
    threeHours: number;
    fullNight: number;
  };
}

export interface ProfilesResponse {
  success: boolean;
  results: number;
  data: Profile[];
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

// Filter params ke liye type
export interface ProfileQueryParams {
  city?: string;
  categoryId?: string;
  all?: boolean;
}
export interface Category {
  _id: string;
  name: string;
  image?: string; // Agar aapne mongo query se image add ki hai
}

export interface City {
  _id: string;
  name: string;
}

export interface Service {
  _id: string;
  name: string;
}
export interface MasterDataResponse {
  success: boolean;
  data: {
    categories: Category[];
    cities: City[];
    services: Service[];
  };
}