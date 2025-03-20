import { sql } from "@vercel/postgres";
import { BrandCreateType, BrandType } from "@/api";

export const createBrand = async ({ name, image }: BrandCreateType) => {
  console.log(name, image);
  const data = await sql<BrandType>`
    INSERT INTO brand (name, image) VALUES (${name}, ${image}) RETURNING id, name, image;
  `;

  return data.rows[0];
};
