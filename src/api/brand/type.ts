export interface BrandType {
  id: number;
  name: string;
  image: string;
}
export interface BrandCreateType {
  image: string;
  name: string;
}

export interface MutatedBrandType extends Omit<BrandType, "categories"> {
  categories: Array<{
    id: number;
    name: string;
  }>;
  amount: number;
}
