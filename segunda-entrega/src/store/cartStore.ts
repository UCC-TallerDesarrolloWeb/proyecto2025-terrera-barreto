import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TProductSize } from "@/types/product";
import type { ICartItem } from "@/types/cart";

type AddInput = {
    id: number;
    name: string;
    size: TProductSize | string;
    price: number;
    image: string;
};

type CartState = {
    items: ICartItem[];
    add: (input: AddInput) => void;
    inc: (id: number, size: TProductSize | string) => void;
    dec: (id: number, size: TProductSize | string) => void;
    remove: (id: number, size: TProductSize | string) => void;
    clear: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set,) => ({
            items: [],

            add: ({ id, name, size, price, image }) =>
                set((state) => {
                    const s = size as TProductSize;
                    const idx = state.items.findIndex((i) => i.id === id && i.size === s);
                    if (idx >= 0) {
                        const items = [...state.items];
                        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
                        return { items };
                    }
                    return {
                        items: [
                            ...state.items,
                            { id, name, size: s, price, quantity: 1, image },
                        ],
                    };
                }),

            inc: (id, size) =>
                set((state) => {
                    const s = size as TProductSize;
                    const idx = state.items.findIndex((i) => i.id === id && i.size === s);
                    if (idx < 0) return state;
                    const items = [...state.items];
                    items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
                    return { items };
                }),

            dec: (id, size) =>
                set((state) => {
                    const s = size as TProductSize;
                    const idx = state.items.findIndex((i) => i.id === id && i.size === s);
                    if (idx < 0) return state;
                    const current = state.items[idx];
                    const nextQty = current.quantity - 1;
                    if (nextQty <= 0) {
                        return {
                            items: state.items.filter((i) => !(i.id === id && i.size === s)),
                        };
                    }
                    const items = [...state.items];
                    items[idx] = { ...current, quantity: nextQty };
                    return { items };
                }),

            remove: (id, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.size === (size as TProductSize))
                    ),
                })),

            clear: () => set({ items: [] }),
        }),
        {
            name: "cart",
            version: 1,
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useCartItems = () => useCartStore((s) => s.items);
export const useCartCount = () =>
    useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
        if (e.key === "cart") {
            useCartStore.persist.rehydrate();
        }
    });
}
