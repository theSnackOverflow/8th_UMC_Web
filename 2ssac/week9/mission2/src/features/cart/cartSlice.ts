import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type LP = {
  id: string;
  title: string;
  singer: string;
  price: number;
  image: string;
  amount: number;
};

interface CartState {
  [x: string]: any;
  cartItems: LP[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      const raw = action.payload;

      const payload: LP = {
        id: raw.id,
        title: raw.title,
        singer: raw.singer, //  string → number 변환
        price: Number(raw.price),
        image: raw.img,
        amount: 1,
      };

      const existingItem = state.cartItems.find((i) => i.id === payload.id);
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.cartItems.push(payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;


      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  addItem,
  removeItem,
  increase,
  decrease,
  clearCart,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
