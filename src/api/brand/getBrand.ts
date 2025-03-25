"use server";
import "server-only";

import { sql } from "@vercel/postgres";

import { BrandType, MutatedBrandType } from "@/api";

export const GetBrand = async () => {
  const data = await sql<MutatedBrandType>`
    SELECT 
      b.id,
      b.name,
      b.image,
      (
          SELECT json_agg(json_build_object('id', c.id, 'name', c.name, 'image', c.image))
          FROM category c
          WHERE c.id_brand = b.id
      ) AS categories,
      (
          SELECT COUNT(p.id)
          FROM product p
          WHERE p.id_category IN (
              SELECT c.id
              FROM category c
              WHERE c.id_brand = b.id
          )
      ) AS amount
    FROM 
        brand b
  `;

  return data.rows;
};

export const getAllBrands = async () => {
  const data = await sql<BrandType>`
    SELECT * FROM public.brand
  `;
  return data.rows;
};

export const getBrandFromID = async ({ id }: { id: string | number }) => {
  const brand = await sql<BrandType>`
    SELECT * FROM public.brand WHERE id = ${id}
  `;

  return brand.rows;
};
