"use server";

import bcryptjs from "bcryptjs";

import prisma from "@/lib/prisma";
import { RegisterFormData } from "@/app/(auth)/register/ui/RegisterForm";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...formData,
        email: formData.email.toLowerCase(),
        password: bcryptjs.hashSync(formData.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: "User created",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Unable to create user",
    };
  }
};
