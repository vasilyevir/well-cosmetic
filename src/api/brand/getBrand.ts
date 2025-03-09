import {sql} from "@vercel/postgres";

import {MutatedBrandType} from "./type";

export const GetBrand = async () => {
  const data = await sql<MutatedBrandType>`
    SELECT b.id AS id, b.name AS name, b.image AS image,
     (SELECT json_agg(json_build_object('id', c.id, 'name', c.name))
      FROM unnest(b.categories) cat_id
      JOIN category c ON c.id = cat_id) AS categories
    FROM brand b
  `;

  return data.rows;
}