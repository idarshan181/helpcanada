export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  category: string;
  isMadeInCanada: boolean;
  amazonUrl?: string;
  walmartUrl?: string;
};
