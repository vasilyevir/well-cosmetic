import {NextRequest} from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    const data = await sql`
      SELECT * FROM category WHERE id_brand = 1
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