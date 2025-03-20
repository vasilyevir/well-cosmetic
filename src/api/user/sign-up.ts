"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export const SignUpRequest = async ({ email, password }: z.infer<typeof formSchema>) => {
  const validateResult = formSchema.safeParse({ email, password });

  if (validateResult.success) {
    const { password } = validateResult.data;
    const hashPassword = await bcrypt.hash(password, 10);
    let data;

    try {
      data = await sql<{ id: number; email: string }>`
        INSERT INTO "user" (email, password) VALUES (${email}, ${hashPassword}) RETURNING id, email
      `;
    } catch (e) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    const { id } = data?.rows[0] || {};

    if (!id) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    return { userId: `${id}` };
  }
};
