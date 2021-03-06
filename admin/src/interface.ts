export type Service = {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Images = {
  filename: string;
  message: string;
  url: string;
  path: string;
  wasFile: boolean;
};
export type ImageProduct = {
  _id: string;
  url: string;
  filename: string;
  path: string;
};
export type Product = {
  price: number;
  priceOld: number;
  inStock: boolean;
  _id: string;
  name: string;
  brand?: {
    name: string;
  };
  type?: string;
  servicedArea?: string;
  powerCooling?: string;
  powerHeating?: string;
  powerConsumptionCooling?: string;
  powerConsumptionHeating?: string;
  energyEfficiency?: string;
  noiseInside?: string;
  noiseOutside?: string;
  sizeIndoor?: string;
  sizeOutdoor?: string;
  weightIndoor?: string;
  weightOutdoor?: string;
  warranty?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  images: ImageProduct[];
};
