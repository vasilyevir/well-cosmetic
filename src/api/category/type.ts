export interface CategoryType {
  id: number;
  id_brand: number;
  name: string;
  product: number[];
  image: string;
}

export interface CategoryMutatedType extends CategoryType {
  brand_name: string;
}