const PURCHASES_KEY = "purchases";

const safeParse = (raw, fallback) => {
    try {
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

export const readPurchases = () =>
    safeParse(localStorage.getItem(PURCHASES_KEY), []);

const writePurchases = (list) => {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(list));
};

const genId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.floor(Math.random() * 1e6)}`);

export const addPurchase = (data) => {
    const purchase = {
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
