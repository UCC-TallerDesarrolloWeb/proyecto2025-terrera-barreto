import type {ICartItem} from "@/types/cart.ts";

export type TPaymentMethod = "cash" | "card";

export interface IPurchase {
    id: string;
    name: string;
    address: string;
    payment: TPaymentMethod;
    items: ICartItem[];
    subtotal: number;
    taxes: number;
    total: number;
    createdAt: string;
}