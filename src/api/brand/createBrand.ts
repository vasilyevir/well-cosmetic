import { sql } from "@vercel/postgres";
import { BrandCreateType, BrandType } from "@/api";

export const createBrand = async ({ name, image }: BrandCreateType) => {
  const data = await sql<BrandType>`
    INSERT INTO brand (name, image) VALUES (${name}, ${image}) RETURNING id, name, image;
  `;
  console.log(data);
  return data.rows[0];
};
