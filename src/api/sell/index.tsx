"use server";
import "server-only";

import { sql } from "@vercel/postgres";
import {
  BodyCreateSell,
  SearchParam,
  SearchParams,
  SellRequest,
  StatusEnum,
} from "@/api/sell/type";

export const createSell = async ({
  payment,
  name,
  second_name,
  phone,
  products,
  delivery,
  email,
}: BodyCreateSell) => {
  const data = await sql<{ id: number }>`
    INSERT INTO sells (delivery, payment, name, second_name, phone, products, email) 
    VALUES (${delivery}, ${payment}, ${name}, ${second_name}, ${phone}, ${JSON.stringify(products)}, ${email})
    RETURNING id
  `;

  return data.rows[0];
};

const getValue = (value?: SearchParam) => {
  return Array.isArray(value) ? value[0] : value || null;
};

export const getSells = async ({ limit, offset, status, date_to, date_from }: SearchParams) => {
  const limit1 = getValue(limit);
  const offset1 = getValue(offset);
  const start_date = getValue(date_from);
  const end_date = getValue(date_to);
  const status1 = getValue(status);

  const start_date1 = start_date
    ? new Date(start_date).toISOString().split("T")[0]
    : new Date("2024-12-17T03:24:00").toISOString().split("T")[0];

  const end_date1 = end_date
    ? new Date(end_date).toISOString().split("T")[0]
    : new Date(Date.now()).toISOString().split("T")[0];

  const data = await sql<SellRequest>`
    SELECT sells.*, 
           (SELECT json_agg(notes.*) 
            FROM notes 
            WHERE notes.sell_id = sells.id) AS notes
    FROM sells
    WHERE (status = ${status1}::status OR cast(${status1} as status) is NULL) 
    AND (created_at >= ${start_date1}) 
    AND (created_at < ${end_date1}) 
    ORDER BY created_at DESC
    LIMIT GREATEST(${limit1}::integer, 10)
    OFFSET GREATEST(${offset1}::integer, 0)
  `;

  return data.rows;
};

export const getSellID = async ({ id }: { id: string }) => {
  const data = await sql<SellRequest>`
    SELECT sells.*, 
           (SELECT json_agg(notes.*) 
            FROM notes 
            WHERE notes.sell_id = sells.id) AS notes
    FROM sells
    WHERE id = ${id}
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
