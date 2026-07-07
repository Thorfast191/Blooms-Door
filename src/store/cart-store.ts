import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  stock: number;
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
                      stock: item.stock,
                      quantity: Math.min(
                        i.quantity + item.quantity,
                        item.stock,
                      ),
                    }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                stock: item.stock,
                quantity: Math.min(item.quantity, item.stock),
              },
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId !== productId) return item;

            return {
              ...item,
              quantity:
                item.quantity < item.stock ? item.quantity + 1 : item.quantity,
            };
          }),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.productId !== productId) return item;

              return {
                ...item,
                quantity: item.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
