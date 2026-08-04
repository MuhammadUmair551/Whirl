import { create } from 'zustand';

export type CartItems = {
  [flavorId: string]: number;
};

type CartStore = {
  items: CartItems;
  total: number;
  add: (flavorId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: {},
  total: 0,

  add: (flavorId: string) => set((state) => {
    const newItems = {
      ...state.items,
      [flavorId]: (state.items[flavorId] || 0) + 1,
    };
    return {
      items: newItems,
      total: Object.values(newItems).reduce((total, quantity) => total + quantity, 0),
    };
  }),

  clear: () => set({ items: {}, total: 0 }),
}));
