import { DeliveryCart, PaymentCart } from "@/widgets/Cart/type";
import { ProductCartType } from "@/store/cart";

export enum StatusEnum {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  WAIT_PAYMENT = "WAIT_PAYMENT",
  WAIT_DELIVERY = "WAIT_DELIVERY",
  IN_DELIVERY = "IN_DELIVERY",
  READY_TO_RECEIVE = "READY_TO_RECEIVE",
  CANCELED = "CANCELED",
  RETURN = "RETURN",
  DONE = "DONE",
}

export interface BodyCreateSell {
  name: string;
  second_name: string;
  payment: PaymentCart;
  delivery: DeliveryCart;
  phone: string;
  products: ProductCartType[];
  email: string;
}

export interface SellRequest extends BodyCreateSell {
  id: number;
  status: StatusEnum;
  created_at: string;
  notes: { id: string; description: string; sell_id: string }[];
}

export type SearchParam = string | string[] | null;

export interface SearchParams {
  limit?: SearchParam;
  offset?: SearchParam;
  status?: SearchParam;
  date_from?: SearchParam;
  date_to?: SearchParam;
}

export interface IUserInfo {
  second_name: SellRequest["second_name"];
  name: SellRequest["name"];
  delivery: SellRequest["delivery"];
  payment: SellRequest["payment"];
  phone: SellRequest["phone"];
}
