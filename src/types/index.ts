export interface Product {
  _id: string;
  image: string;
  image1?: string;
  image2?: string;
  image3?: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  logo?: string;
  ratings: number;
  brandCategory: string;
  description: string;
}

export interface THeader {
  id: number;
  name: string;
  image: string;
  description: string;
  star: number;
}

export interface TProduct {
  _id: string;
  image: string;
  title: string;
  description: string;
  brand: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  longDescription: string;
}
