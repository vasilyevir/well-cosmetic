"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUserInfo, SellRequest } from "@/api/sell/type";
import { TypographyLarge, TypographyP } from "@/ui/Text";
import { Button } from "@/components/ui/button";
import { RightArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";
import Link from "next/link";
import { StatusCell } from "@/components/Sell/Cell/StatusCell";
import { DeliveryDescription, PaymentDescription } from "@/constants/descriprion";

export const columns: ColumnDef<SellRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorFn: (row) => ({
      status: row.status,
      id: row.id,
      products: row.products,
    }),
    id: "status_column",
    header: "Статус",
    cell: (props) => <StatusCell {...props} />,
  },
  {
    accessorKey: "products",
    header: "Итоговая цена",
    cell: ({ row }) => {
      const products = row.getValue("products") as SellRequest["products"];
      const totalPrice = products.reduce((acc, el) => {
        if (!!el.price_with_sale) {
          return acc + el.price_with_sale * el.amountSelected;
        }

        return acc + el.price * el.amountSelected;
      }, 0);

      return <TypographyLarge>{totalPrice}</TypographyLarge>;
    },
  },

  {
    accessorFn: (row) => ({
      payment: row.payment,
      delivery: row.delivery,
      name: row.name,
      phone: row.phone,
      second_name: row.second_name,
    }),
    header: "Оплата",
    id: "user_info",
    cell: ({ row }) => {
      const { payment, delivery, second_name, name, phone } = row.getValue<IUserInfo>("user_info");

      return (
        <div>
          <TypographyP>
            {name} {second_name}
          </TypographyP>
          <TypographyP className="text-blue-400">
            <Link href={`tel:${phone}`}>{phone}</Link>
          </TypographyP>
          <TypographyP>{PaymentDescription[payment]}</TypographyP>
          <TypographyP>{DeliveryDescription[delivery]}</TypographyP>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <Button asChild size="icon" variant="secondary">
          <Link href={`/admin/sell/${id}`}>
            <RightArrow />
          </Link>
        </Button>
      );
    },
  },
];
