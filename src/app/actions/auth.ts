"use server";

import { signUpSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import bcrypt from "bcrypt";

export async function register(
  prevState:
    | {
        success: boolean;
        emailMessage?: string | null;
        passwordMessage?: string | null;
        message?: string;
      }
    | undefined,
  formData: FormData,
) {
  const result = await signUpSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      success: false,
      emailMessage: result.error.issues
        .filter((issue) => issue.path[0] === "email")
        ?.map((issue) => issue.message)
        .join("\n"),
      passwordMessage: result.error.issues
        .filter((issue) => issue.path[0] === "password")
        ?.map((issue) => issue.message)
        .join("\n"),
    };
  } else {
    try {
      const { email, password } = result.data;

      const user = await db.user.findUnique({
        where: { email: email },
      });

      //If user found in database
      if (user) {
        return {
          success: false,
          message: "User already exists",
        };
      }

      //If user does not exists in database
      const hash = await bcrypt.hash(password, 10);

      await db.user.create({
        data: {
          email,
          password: hash,
        },
      });

      return {
        success: true,
        message: "Signed Up Successfully",
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Some error occured. Please try again ",
      };
    }
  }
}

export async function redirectServer(path: string) {
  redirect(path);
}
