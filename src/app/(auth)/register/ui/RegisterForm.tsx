"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (
    data: RegisterFormData
  ) => {
    console.log({ data });
    // server action
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Full Name</label>
      <input
        type="text"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        {...register("name", { required: true })}
      />
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">* Name is required</span>
      )} */}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Password</label>
      <input
        type="password"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        {...register("password", { required: true, minLength: 6 })}
      />

      <button className="btn-primary">Create account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/login" className="btn-secondary text-center">
        Register
      </Link>
    </form>
  );
};
