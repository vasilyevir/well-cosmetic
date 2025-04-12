"use server";
import "server-only";
import { StatusEnum } from "@/api/sell/type";
import { sql } from "@vercel/postgres";

export const createNotesSell = async ({
  description,
  sell_id,
}: {
  description: string;
  sell_id: string;
}) => {
  const data = await sql<{ id: string; sell_id: string }>`
    INSERT INTO notes (description, sell_id) VALUES (${description}, ${sell_id}) RETURNING id, sell_id
  `;

  return data.rows[0];
};

export const deleteNoteSell = async ({ id }: { id: string }) => {
  await sql<{ id: string; status: StatusEnum }>`
    DELETE FROM notes WHERE id = ${id}
  `;

  return { id };
};
