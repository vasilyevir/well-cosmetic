"use client";

import { CellContext } from "@tanstack/table-core";
import { SellRequest, StatusEnum } from "@/api/sell/type";
import { useState } from "react";
import { updateStatusSell } from "@/api/sell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypographyP } from "@/ui/Text";

const StatusOptions: {
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

export const StatusCell = ({ row }: CellContext<SellRequest, any>) => {
  const { id, status, products } = row.getValue<{
    id: SellRequest["id"];
    status: SellRequest["status"];
    products: SellRequest["products"];
  }>("status_column");
  const [value, setValue] = useState(status);

  const onChange = async (value: StatusEnum) => {
    const { status: newStatus } = await updateStatusSell({ id, status: value });

    setValue(newStatus);
  };

  return (
    <div className="flex flex-col items-center">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {StatusOptions.map((el) => (
            <SelectItem value={el.value} key={el.value}>
              {el.key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <HoverCard>
        <HoverCardTrigger asChild className="text-left w-min">
          <Button variant="link" className="text-blue-400">
            Выбрано {products.length} продуктов
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <ul>
            {products.map((el) => (
              <li key={el.id} className="flex justify-between w-full">
                <Link href={`/product/${el.id}`}>
                  <TypographyP className="text-blue-400">{el.name}</TypographyP>
                </Link>
                <TypographyP>{el.amountSelected} шт.</TypographyP>
              </li>
            ))}
          </ul>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
