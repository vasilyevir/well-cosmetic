export interface ProductType {
  id: string;
  name: string;
  image?: string;
  price: number;
  price_with_sale?: number;
  description: string;
  id_category: string;
  amount: number;
  article?: string;
  country?: string;
  volume?: string;
  type_product?: string;
  id_type_product?: string;
}

export interface ProductMutatedType extends ProductType {
  brand_name: string;
  category_name: string;
}

export interface ProductCreateType {
  name: string;
  image: string;
  price: number;
  price_with_sale?: number;
  description: string;
  id_category: string;
  amount: number;
  article?: string;
  country?: string;
  volume?: string;
  id_type_product?: string;
}

export interface ProductEditType extends ProductCreateType {
  id: string;
}
