"use server";
import "server-only";
import { sql } from "@vercel/postgres";
import { ProductCreateType, ProductEditType, ProductType } from "@/api";

export const createProduct = async ({
  name,
  image,
  id_category,
  price_with_sale,
  price,
  amount,
  description,
}: ProductCreateType) => {
  const data = await sql<ProductType>`
    INSERT INTO product (name, image, id_category, price_with_sale, price, amount, description) 
    VALUES (${name}, ${image}, ${id_category}, ${price_with_sale}, ${price}, ${amount}, ${description}) 
    RETURNING id, name, image, id_category, price_with_sale, price, amount, description;
  `;

  return data.rows;
};

export const editProduct = async ({
  name,
  amount,
  description,
  price_with_sale,
  price,
  id_category,
  image,
  id,
}: ProductEditType) => {
  const data = await sql`
    UPDATE product SET name = ${name}, image = ${image}, price = ${price}, price_with_sale = ${price_with_sale}, description = ${description}, id_category = ${id_category}, amount = ${amount} WHERE id = ${id} RETURNING id, name, image, id_category, price_with_sale, price, amount, description;
  `;

  return data.rows;
};

export const deleteProduct = async ({ id }: { id: string }) => {
  const data = await sql`
    DELETE FROM product WHERE id = ${id}
  `;

  return data.rows;
};
