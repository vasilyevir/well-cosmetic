import { StatusEnum } from "@/api/sell/type";

export const StatusOptions: {
  value: StatusEnum;
  key: string;
}[] = [
  {
    value: StatusEnum.NEW,
    key: "Новый",
  },
  {
    value: StatusEnum.PROCESSING,
    key: "В обработке",
  },
  {
    value: StatusEnum.WAIT_PAYMENT,
    key: "Ожидает оплаты",
  },
  {
    value: StatusEnum.WAIT_DELIVERY,
    key: "Ожидает отправки",
  },
  {
    value: StatusEnum.IN_DELIVERY,
    key: "Передан в службу доставки",
  },
  {
    value: StatusEnum.READY_TO_RECEIVE,
    key: "Готов к получению",
  },
  {
    value: StatusEnum.CANCELED,
    key: "Отменен",
  },
  {
    value: StatusEnum.RETURN,
    key: "Возврат",
  },
  {
    value: StatusEnum.DONE,
    key: "Выполнен",
  },
];
