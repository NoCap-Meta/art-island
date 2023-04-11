import { create } from 'zustand';

//manage cart open
export const useCartStore = create(set => ({
  cartOpen: false,
  setCartOpen: (value) => set(state => ({ cartOpen: value }))
}))


export const useTabStore = create(set => ({
  selectedTab: 'Profile',
  setSelectedTab: (value) => set(state => ({ selectedTab: value }))
}))

