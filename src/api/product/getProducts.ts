import { sql } from "@vercel/postgres";
import { ProductMutatedType } from "@/api/product/type";
import { getBrandFromID } from "@/api";
import { getCategoryFromID } from "@/api/category";

export const getProducts = async ({ idCategory }: { idCategory: string }) => {
  const data = await sql<ProductMutatedType>`
    SELECT p.*, c.name AS category_name
    FROM product p
    JOIN category c ON p.id_category = c.id
    WHERE p.id_category = ${idCategory}
  `;

  const category = (await getCategoryFromID({ id: idCategory }))?.[0];
  const brand = (await getBrandFromID({ id: category.id_brand || 0 }))?.[0];

  return {
    results: data.rows,
    length: data.rows.length,
    brand_name: brand?.name || "",
    category_name: category.name || "",
    id_brand: brand?.id,
    id_category: category?.id,
  };
};

export const getProductID = async ({ id }: { id: string }) => {
  const data = await sql<ProductMutatedType>`
    SELECT p.*
    FROM product p
    WHERE p.id = ${id}
  `;
  const product = data.rows?.[0];
  const category = (await getCategoryFromID({ id: `${product?.id_category || 0}` }))?.[0];
  const brand = (await getBrandFromID({ id: `${category?.id_brand || 0}` }))?.[0];

  return {
    product,
    category: {
      id: category.id,
      name: category.name,
    },
    brand: {
      id: brand.id,
      name: brand.name,
    },
  };
};
