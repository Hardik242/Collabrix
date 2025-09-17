"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useCallback,
  type FormEvent,
} from "react";
import { toast } from "react-toastify/unstyled";
import { redirectServer, register } from "../actions/auth";

export default function Page() {
  const [signupMessage, formAction, isPending] = useActionState(
    register,
    undefined,
  );

  if (signupMessage?.success) {
    toast(
      <div className="flex flex-col items-start justify-between">
        <p className="text-black">{signupMessage.message}</p>
        <p className="text-sm">Redirecting to signin page in 3 seconds...</p>
      </div>,
      {
        type: "success",
        autoClose: 3000,
        onClose: () => {
          void redirectServer("/signin");
        },
      },
    );
  }

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);

      startTransition(() => {
        formAction(data);
      });
    },
    [formAction],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold md:text-3xl">
          Sign Up
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            {signupMessage?.emailMessage && (
              <div className="mb-1 flex w-full items-center justify-center rounded-lg border border-red-600 bg-red-300 px-2 py-1">
                <p className="text-sm font-bold text-black">
                  !! {signupMessage.emailMessage}
                </p>
              </div>
            )}
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
                autoComplete="email"
                placeholder="name@example.com"
                required
                disabled={isPending}
                className={`w-full rounded-xl border border-gray-300 px-3 pt-5 pb-1 text-sm outline-none focus:border-black ${signupMessage?.emailMessage && "border-red-500"}`}
              />
            </div>
          </div>

          <div>
            {signupMessage?.passwordMessage && (
              <div className="mb-1 flex w-full items-center justify-center rounded-lg border border-red-600 bg-red-300 px-2 py-1">
                <p className="text-sm font-bold text-black">
                  !! {signupMessage.passwordMessage}
                </p>
              </div>
            )}
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
                autoComplete="current-password"
                placeholder="8-20 characters"
                required
                disabled={isPending}
                minLength={8}
                maxLength={20}
                className={`w-full rounded-xl border border-gray-300 px-3 pt-5 pb-1 text-sm outline-none focus:border-black ${signupMessage?.passwordMessage && "border-red-500"}`}
              />
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer rounded-3xl bg-black py-2 text-center text-sm text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {isPending ? "Registering..." : "Register"}
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
            <div className="mb-1 flex w-full items-center justify-center rounded-md border border-red-600 bg-red-300/60 p-2">
              <p className="text-sm font-bold text-black/80">
                ! {signupMessage?.message}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
