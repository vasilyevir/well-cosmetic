"use server";

import "server-only";

import { sql } from "@vercel/postgres";
import { BrandCreateType, BrandEditType, BrandType } from "@/api";

export const createBrand = async ({ name, image }: BrandCreateType) => {
  const data = await sql<BrandType>`
    INSERT INTO brand (name, image) VALUES (${name}, ${image}) RETURNING id, name, image;
  `;

  return data.rows[0];
};

export const editBrand = async ({ name, image, id }: BrandEditType) => {
  const data = await sql<BrandType>`
      UPDATE brand SET name = ${name}, image = ${image} WHERE id = ${id} RETURNING id, name, image
  `;

  return data.rows[0];
};

export const deleteBrand = async (id: string) => {
  const data = await sql`
    DELETE FROM brand WHERE id = ${id}
  `;
  return data.rows;
};
