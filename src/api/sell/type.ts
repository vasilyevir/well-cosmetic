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
}

export interface SellRequest extends BodyCreateSell {
  id: number;
  status: StatusEnum;
}

export interface SearchParams {
  limit?: string | string[];
  offset?: string | string[];
}

export interface IUserInfo {
  second_name: SellRequest["second_name"];
  name: SellRequest["name"];
  delivery: SellRequest["delivery"];
  payment: SellRequest["payment"];
  phone: SellRequest["phone"];
}
