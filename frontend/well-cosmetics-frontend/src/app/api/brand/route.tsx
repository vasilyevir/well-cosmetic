import {NextRequest} from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    const data = await sql`
      SELECT b.id AS id, b.name AS name, b.image AS image,
       (SELECT json_agg(json_build_object('id', c.id, 'name', c.name))
        FROM unnest(b.categories) cat_id
        JOIN category c ON c.id = cat_id) AS categories
      FROM brand b
    `;

    return Response.json({results: data.rows}, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
  } catch (error) {
    Response.json({ error }, { status: 500 });
  }
}