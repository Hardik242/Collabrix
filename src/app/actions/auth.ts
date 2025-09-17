"use server";

import { signInSchema, signUpSchema } from "@/schemas";
import { signIn } from "@/server/auth";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

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
      emailMessage:
        result.error.issues
          .map((issue) => {
            if (issue.path[0] === "email") return issue.message;
          })
          ?.join("\n") ?? null,
      passwordMessage:
        result.error.issues
          .map((issue) => {
            if (issue.path[0] === "password") return issue.message;
          })
          ?.join("\n") ?? null,
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

export async function authenticate(
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
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData), // Pass form fields as an object
      redirect: false,
    });

    return {
      success: true,
      message: "Logged In Successfully",
    };
  } catch (error) {
    console.log("IN auth: ", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid Credentials",
          };

        default:
          return {
            success: false,
            message: "Something went wrong",
          };
      }
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function redirectServer(path: string) {
  redirect(path, RedirectType.replace);
}
