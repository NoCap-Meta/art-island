import { create } from 'zustand';

//manage cart open
export const useCartStore = create(set => ({
  cartOpen: false,
  setCartOpen: (value) => set(state => ({ cartOpen: value }))
}))
