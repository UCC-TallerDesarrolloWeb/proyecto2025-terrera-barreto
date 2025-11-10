import type {IPurchase} from "@/types/purchase.ts";

const PURCHASES_KEY = "purchases";

const safeParse = <T,>(raw: string | null, fallback: T): T => {
    try {
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
};

export const readPurchases = (): IPurchase[] =>
    safeParse<IPurchase[]>(localStorage.getItem(PURCHASES_KEY), []);

const writePurchases = (list: IPurchase[]) => {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(list));
};

const genId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.floor(Math.random() * 1e6)}`);

export const addPurchase = (data: Omit<IPurchase, "id" | "createdAt">): IPurchase => {
    const purchase: IPurchase = {
        id: genId(),
        createdAt: new Date().toISOString(),
        ...data,
    };
    const list = readPurchases();
    list.unshift(purchase);
    writePurchases(list);
    return purchase;
};

export const clearPurchases = () => writePurchases([]);
