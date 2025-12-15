import React, { useEffect, useMemo, useState } from "react";
import { readPurchases } from "@/utils/purchasesStorage";

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        setPurchases(readPurchases());
        const onStorage = (e) => {
            if (e.key === "purchases") {
                setPurchases(readPurchases());
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const content = useMemo(() => {
        if (!purchases.length) {
            return <div className="purchases__empty">No tenés compras aún.</div>;
        }

        return (
            <div className="purchases__grid">
                {purchases.map((p) => {
                    const created = new Date(p.createdAt);
                    const dateText = created.toLocaleString("es-AR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    });

                    return (
                        <article className="purchase-card" key={p.id}>
                            <header className="purchase-card__header">
                                <div>
                                    <h4>Compra #{p.id.slice(0, 8).toUpperCase()}</h4>
                                    <span>{dateText}</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <h4>${p.total}</h4>
                                </div>
                            </header>

                            <div className="purchase-card__meta">
                                <small>Nombre: {p.name}</small>
                                <small>Dirección: {p.address}</small>
                                <small>Pago: {p.payment === "cash" ? "Efectivo" : "Débito/Crédito"}</small>
                            </div>

                            <div className="purchase-card__items">
                                {p.items.map((it, idx) => (
                                    <div className="purchase-card__item" key={`${p.id}-${it.id}-${it.size}-${idx}`}>
                                        <img className="purchase-card__thumb" src={it.image} alt={it.name} />
                                        <div className="purchase-card__item-info">
                                            <strong>{it.name}</strong>
                                            <span>
                                                Tamaño: {it.size} · Cant: {it.quantity}
                                            </span>
                                        </div>
                                        <div className="purchase-card__item-right">
                                            <span>${it.price}</span>
                                            <span>${it.price * it.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="purchase-card__totals">
                                <div>
                                    <span>Productos: ${p.subtotal}</span>
                                    <span>Impuestos (5%): ${p.taxes}</span>
                                    <h5>Total: ${p.total}</h5>
                                </div>
                                <div />
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    }, [purchases]);

    return (
        <div className="purchases">
            <h2>Historial de compras</h2>
            {content}
        </div>
    );
};

export default Purchases;
