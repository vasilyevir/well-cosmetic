"use server";
import "server-only";

import { sql } from "@vercel/postgres";
import { CategoryCreateType, CategoryEditType, CategoryType } from "@/api/category/type";

export const createCategory = async ({ name, image, id_brand }: CategoryCreateType) => {
  const data = await sql<CategoryType>`
    INSERT INTO category (name, image, id_brand) VALUES (${name}, ${image}, ${id_brand}) RETURNING id, name, image, id_brand;
  `;

  return data.rows[0];
};

export const editCategory = async ({ name, image, id_brand, id }: CategoryEditType) => {
  await sql<CategoryType>`
    UPDATE category SET name = ${name}, image = ${image}, id_brand = ${id_brand} WHERE id = ${id};
  `;

  return id;
};

export const getCategoryFromBrandID = async ({ id }: { id: string }) => {
  const category = await sql<CategoryType>`
    SELECT * FROM public.category WHERE id = ${id}
  `;

  return category.rows;
};

export const deleteCategory = async ({ id }: { id: string }) => {
  const data = await sql`
    DELETE FROM category WHERE id = ${id}
  `;

  return data.rows;
};
