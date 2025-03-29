export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  categories: string[];
  isMadeInCanada: boolean;
  amazonUrl?: string;
  walmartUrl?: string;
};
