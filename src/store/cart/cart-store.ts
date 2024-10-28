import { create } from "zustand";
import { CartProduct } from "@/interfaces/product.interface";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, p) => total + p.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // check if product exists in cart with selected size
        const productExistInCart = cart.some(
          (p) => p.id === product.id && p.size === product.size
        );

        if (!productExistInCart) {
          set({
            cart: [...cart, product],
          });
          return;
        }

        // product exists in cart update the quantity
        const updatedCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return { ...p, quantity: p.quantity + product.quantity };
          }

          return p;
        });

        set({
          cart: updatedCartProducts,
        });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return { ...p, quantity: quantity };
          }

          return p;
        });

        set({
          cart: updatedCartProducts,
        });
      },
    }),
    { name: "shopping-cart" }
  )
);
