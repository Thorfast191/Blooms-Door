import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (productId: string) => void;

  increaseQuantity: (productId: string) => void;

  decreaseQuantity: (productId: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ========================
      // ADD ITEM
      // ========================

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                    }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      // ========================
      // REMOVE
      // ========================

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      // ========================
      // INCREASE
      // ========================

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),

      // ========================
      // DECREASE
      // ========================

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      // ========================
      // CLEAR
      // ========================

      clearCart: () => set({ items: [] }),

      // ========================
      // TOTAL ITEMS
      // ========================

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // ========================
      // TOTAL PRICE
      // ========================

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
