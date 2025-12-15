const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const fetchProducts = async () => {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("No se pudo cargar el menú");
    return res.json();
};
