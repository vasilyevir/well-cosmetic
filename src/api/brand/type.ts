export interface BrandType {
  id: string;
  name: string;
  image: string;
}
export interface BrandCreateType {
  image: string;
  name: string;
}

export interface BrandEditType extends BrandCreateType {
  id: string;
}

export interface MutatedBrandType extends Omit<BrandType, "categories"> {
  categories: Array<{
    id: string;
    name: string;
  }>;
  amount: number;
}
