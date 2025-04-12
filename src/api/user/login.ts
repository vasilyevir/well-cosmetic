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

export const LogInRequest = async ({ email, password }: z.infer<typeof formSchema>) => {
  const validateResult = formSchema.safeParse({ email, password });

  if (validateResult.success) {
    const { password } = validateResult.data;

    let data;

    try {
      data = await sql<{ id: number; email: string; password: string }>`
        SELECT password, email, id FROM "user" WHERE email = ${email}
      `;
    } catch (e) {
      throw new Error("Произошла ошибка во время проверки аккауета");
    }

    const { id, password: passwordUser } = data?.rows[0] || {};

    const isValid = await bcrypt.compare(password, passwordUser);

    if (!id || !isValid) {
      throw new Error("Пароль или почта не верны");
    }

    return { userId: `${id}` };
  }
};
