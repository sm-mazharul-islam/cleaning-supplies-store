export interface Product {
  _id: string;
  image: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  title: string;
  originalPrice: number;
  salePrice: number;
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
