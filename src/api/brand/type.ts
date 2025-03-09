export interface BrandType {
  id: number;
  categories: number[];
  name: string;
  image: string;
}

export interface MutatedBrandType extends Omit<BrandType, 'categories'> {
  categories: Array<{
    id: number;
    name: string
  }>
}