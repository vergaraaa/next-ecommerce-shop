"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId: userId },
    });

    if (!address) return {};

    const userStoredAddress = address
      ? { ...address, country: address.countryId }
      : {};

    return userStoredAddress;
  } catch (error) {
    console.log(error);
    return null;
  }
};
