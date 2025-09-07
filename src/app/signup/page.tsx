"use client";

import Link from "next/link";
import { useActionState } from "react";
import { toast } from "sonner";
import { redirectServer, register } from "../actions/auth";

export default function Page() {
  const [signupMessage, formAction, isPending] = useActionState(
    register,
    undefined,
  );

  if (signupMessage?.success) {
    toast.success(signupMessage.message);
    void redirectServer("/signin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold md:text-3xl">
          Sign Up
        </h1>

        <form action={formAction} className="space-y-4">
          <div className="relative h-fit">
            <label
              htmlFor="email"
              className="absolute top-[6px] left-3 text-[10px]"
            >
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              disabled={isPending}
              className="w-full rounded-xl border border-gray-300 px-3 pt-5 pb-1 text-sm outline-none focus:border-black"
            />
            {signupMessage?.success === false &&
              signupMessage?.emailMessage?.length !== 0 && (
                <p className="text-xs text-red-500">
                  * {signupMessage.emailMessage}
                </p>
              )}
          </div>

          <div className="relative h-fit">
            <label
              htmlFor="password"
              className="absolute top-[6px] left-3 text-[10px]"
            >
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="8-20 characters"
              required
              disabled={isPending}
              minLength={8}
              maxLength={20}
              className="w-full rounded-xl border border-gray-300 px-3 pt-5 pb-1 text-sm outline-none focus:border-black"
            />
            {signupMessage?.success === false &&
              signupMessage?.passwordMessage?.length !== 0 && (
                <p className="text-xs text-red-500">
                  * {signupMessage.passwordMessage}
                </p>
              )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer rounded-3xl bg-black py-2 text-center text-sm text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>

          {signupMessage?.success === false && signupMessage?.message && (
            <p className="text-center text-xs text-red-500">
              {signupMessage?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
