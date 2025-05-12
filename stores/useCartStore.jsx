import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addtoCart: (room) => set((state) => ({
                cart: [...state.cart, room]
            })),
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== id)
            })),
            clearCart: () => set({ cart: [] })
        }),
        {
            name: 'booking-cart'
        }
    )
)