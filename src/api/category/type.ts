export interface CategoryType {
  id: string;
  id_brand: string;
  name: string;
  product: number[];
  image: string;
}

export interface CategoryMutatedType extends CategoryType {
  brand_name: string;
}
export interface CategoryCreateType {
  image: string;
  name: string;
  id_brand: string;
}

export interface CategoryEditType extends CategoryCreateType {
  id: string;
}
