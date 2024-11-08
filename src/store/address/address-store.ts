import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address } from "@/interfaces/address.interface";

interface State {
  address: Address;

  // methods
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        zipCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: "address-store" }
  )
);
