"use server";
import "server-only";
import { sql } from "@vercel/postgres";
import { TypeProduct } from "@/api/type_product/type";
import { NeonDbError } from "@neondatabase/serverless";
import { RequestNeon } from "@/lib/request";

export const createTypeProduct = async ({ name }: { name: string }) => {
  return await RequestNeon({
    onSuccess: async () => {
      const data = await sql<TypeProduct>`
    INSERT INTO type_product (name) VALUES (${name}) RETURNING id, name
  `;
      return data.rows[0];
    },
    onError: (e) => {
      if (e instanceof NeonDbError) {
        const { code } = e;

        if (code === "23505") {
          return {
            message: "Такое имя уже создано",
          };
        }
      }
    },
  });
};

export const getTypeProducts = async () => {
  return RequestNeon({
    onSuccess: async () => {
      const data = await sql<TypeProduct>`
      SELECT * FROM type_product
    `;

      return data.rows;
    },
  });
};
