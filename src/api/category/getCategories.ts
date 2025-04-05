"use server";

import "server-only";

import { sql } from "@vercel/postgres";
import { CategoryMutatedType, CategoryType } from "./type";
import { getBrandFromID } from "@/api";

export const getCategories = async ({ id }: { id: string }) => {
  const data = await sql<CategoryMutatedType>`
    SELECT c.*, b.name AS brand_name 
    FROM category c 
    JOIN brand b ON c.id_brand = b.id 
    WHERE c.id_brand = ${id}
  `;
  const brand = await getBrandFromID({ id });

  return { results: data.rows, brand };
};

export const getCategoryFromID = async ({ id }: { id: string }) => {
  const category = await sql<CategoryType>`
    SELECT * FROM public.category WHERE id = ${id}
  `;

  return category.rows;
};

export const getCategoryFromBrandID = async ({ id }: { id: string }) => {
  const category = await sql<CategoryType>`
    SELECT * FROM public.category WHERE id = ${id}
  `;

  return category.rows;
};
