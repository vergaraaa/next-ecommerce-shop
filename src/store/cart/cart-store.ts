import { create } from "zustand";
import { CartProduct } from "@/interfaces/product.interface";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    total: number;
    subtotal: number;
    tax: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, p) => total + p.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subtotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce((total, p) => total + p.quantity, 0);

        return { total, subtotal, tax, itemsInCart };
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
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (p) => p.id !== product.id || p.size !== product.size
        );

        set({
          cart: updatedCartProducts,
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: "shopping-cart" }
  )
);
