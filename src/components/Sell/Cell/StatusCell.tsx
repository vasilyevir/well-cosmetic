"use client";

import { CellContext } from "@tanstack/table-core";
import { SellRequest, StatusEnum } from "@/api/sell/type";
import { useEffect, useState } from "react";
import { updateStatusSell } from "@/api/sell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypographyP } from "@/ui/Text";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StatusOptions } from "@/constants/options";
import { format } from "date-fns";

import { Tags } from "@/components/AdminSellContent/Tags";

export const StatusCell = ({ row }: CellContext<SellRequest, any>) => {
  const { id, status, products, created_at, notes } = row.getValue<{
    id: SellRequest["id"];
    status: SellRequest["status"];
    products: SellRequest["products"];
    created_at: SellRequest["created_at"];
    notes: SellRequest["notes"];
  }>("status_column");

  const [value, setValue] = useState(status);

  const onChange = async (value: StatusEnum) => {
    const { status: newStatus } = await updateStatusSell({ id, status: value });

    setValue(newStatus);
  };

  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <div className="flex flex-col items-start">
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
      <Popover>
        <PopoverTrigger asChild className="text-left w-min">
          <Button variant="link" className="text-blue-400 p-0">
            Выбрано {products.length} продуктов
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ul>
            {products.map((el) => (
              <li key={el.id} className="flex justify-between w-full">
                <Link href={`/product/${el.id}`}>
                  <TypographyP className="text-blue-400">{el.name}</TypographyP>
                </Link>
                <TypographyP className="shrink-0">{el.amountSelected} шт.</TypographyP>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <div className="flex gap-2">
        <TypographyP>Дата создания:</TypographyP>
        <TypographyP className="font-bold">{format(created_at, "PPP")}</TypographyP>
      </div>
      <div>
        <Tags notes={notes} sell_id={id} />
      </div>
    </div>
  );
};
