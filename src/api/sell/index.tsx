"use server";
import "server-only";

import { sql } from "@vercel/postgres";
import { BodyCreateSell, SearchParams, SellRequest, StatusEnum } from "@/api/sell/type";

export const createSell = async ({
  payment,
  name,
  second_name,
  phone,
  products,
  delivery,
}: BodyCreateSell) => {
  const data = await sql<{ id: number }>`
    INSERT INTO sells (delivery, payment, name, second_name, phone, products) 
    VALUES (${delivery}, ${payment}, ${name}, ${second_name}, ${phone}, ${JSON.stringify(products)})
    RETURNING id
  `;

  return data.rows[0];
};

export const getSells = async ({ limit, offset }: SearchParams) => {
  const limit1 = Array.isArray(limit) ? limit[0] : limit;
  const offset1 = Array.isArray(offset) ? offset[0] : offset;

  const data = await sql<SellRequest>`
    SELECT * FROM sells ORDER BY id LIMIT ${limit1} OFFSET ${offset1}
  `;

  return data.rows;
};

export const getSellID = async ({ id }: { id: string }) => {
  const data = await sql<SellRequest>`
    SELECT * FROM sells WHERE id = ${id}
  `;

  return data.rows[0];
};

export const updateStatusSell = async ({
  status,
  id,
}: {
  status: StatusEnum;
  id: string | number;
}) => {
  const data = await sql<{ id: string; status: StatusEnum }>`
    UPDATE sells SET status = ${status} WHERE id = ${id} RETURNING id, status
  `;
  return data.rows[0];
};
