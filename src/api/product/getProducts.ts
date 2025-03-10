import {sql} from "@vercel/postgres";
import {ProductMutatedType} from "@/api/product/type";
import {getBrandFromID} from "@/api";
import {getCategoryFromID} from "@/api/category";

export const getProducts = async ({idBrand, idCategory}: {idBrand: string; idCategory: string}) => {
  const data = await sql<ProductMutatedType>`
    SELECT p.*, b.name AS brand_name, c.name AS category_name
    FROM product p
    JOIN brand b ON p.id_brand = b.id
    JOIN category c ON p.id_category = c.id
    WHERE p.id_brand = ${idBrand} AND p.id_category = ${idCategory}
  `;
  const brand = await getBrandFromID({id: idBrand})
  const category = await getCategoryFromID({id: idCategory})

  return {
    results: data.rows,
    length: data.rows.length,
    brand_name: brand[0]?.name || '',
    category_name: category[0]?.name || '',
    id_brand: brand[0]?.id,
    id_category: category[0]?.id
  }
}