"use client";

import Link from "next/link";
import { useActionState } from "react";

import { authenticate } from "@/actions/auth/login";

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <label htmlFor="email">Password</label>
      <input
        type="password"
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <button type="submit" className="btn-primary">
        Login
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/register" className="btn-secondary text-center">
        Create new account
      </Link>
    </form>
  );
};
