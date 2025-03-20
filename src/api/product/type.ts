export interface ProductType {
  id: number;
  name: string;
  image?: string;
  price: number;
  price_with_sale?: number;
  description: string;
  id_category: number;
  amount: number;
}

export interface ProductMutatedType extends ProductType {
  brand_name: string;
  category_name: string;
}
