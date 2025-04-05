import { DeliveryCart, PaymentCart } from "@/widgets/Cart/type";

export const PaymentDescription: Record<PaymentCart, string> = {
  [PaymentCart.PICKUP]: "Оплата наличными при самовывозе",
  [PaymentCart.SBER]: "Перевод на сбербанк",
  [PaymentCart.COURIER]: "Оплата наличными курьеру",
};

export const DeliveryDescription: Record<DeliveryCart, string> = {
  [DeliveryCart.PICKUP]: "Самовывоз",
  [DeliveryCart.BOXBERRY]: "Boxberry",
  [DeliveryCart.COURIER]: "Курьер компании",
  [DeliveryCart.SDEK]: "SDEK",
};
