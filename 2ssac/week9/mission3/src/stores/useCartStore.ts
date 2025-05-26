import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type LP = {
  id: string;
  title: string;
  singer: string;
  price: number;
  image: string;
  amount: number;
};

type CartItemInput = Omit<LP, "amount">;

interface CartState {
  cartItems: LP[];
  amount: number;
  total: number;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  immer((set) => {
    const recalculate = (state: CartState) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    };

    return {
      cartItems: [],
      amount: 0,
      total: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === item.id);
          if (existing) {
            existing.amount += 1;
          } else {
            state.cartItems.push({ ...item, amount: 1 });
          }
          recalculate(state);
        }),

      removeItem: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          recalculate(state);
        }),

      increase: (id) =>
        set((state) => {
          const item = state.cartItems.find((i) => i.id === id);
          if (item) item.amount += 1;
          recalculate(state);
        }),

      decrease: (id) =>
        set((state) => {
          const item = state.cartItems.find((i) => i.id === id);
          if (item) {
            item.amount -= 1;
            if (item.amount < 1) {
              state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
            }
          }
          recalculate(state);
        }),

      clearCart: () =>
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        }),
    };
  })
);
