export interface ProductType {
  id: string;
  name: string;
  image?: string;
  price: number;
  price_with_sale?: number;
  description: string;
  id_category: string;
  amount: number;
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
}

export interface ProductEditType extends ProductCreateType {
  id: string;
}
