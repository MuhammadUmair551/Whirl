import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: {},
  total: 0,

  add: (flavorId) => set(state => {
    const newItems = {
      ...state.items,
      [flavorId]: (state.items[flavorId] || 0) + 1,
    };
    return {
      items: newItems,
      total: Object.values(newItems).reduce((a, b) => a + b, 0),
    };
  }),

  clear: () => set({ items: {}, total: 0 }),
}));