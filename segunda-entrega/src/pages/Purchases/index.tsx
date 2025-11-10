import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { readPurchases } from "@/utils/purchasesStorage";
import type {IPurchase} from "@/types/purchase.ts";

const PurchasesContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px 24px 16px;

    & h2 {
        font-family: "Inter", sans-serif;
        font-size: 28px;
        font-weight: 600;
        margin: 12px 0 16px 0;
    }
`;

const Empty = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
    color: #5e5e61;
`;

const CardsGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 680px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1080px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const Card = styled.article`
    background: #fff6e7;
    border-radius: 18px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CardHeader = styled.header`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 8px;

    & h4 {
        margin: 0;
        font-family: "Poppins", sans-serif;
        font-size: 18px;
        font-weight: 500;
    }

    & span {
        font-family: "Inter", sans-serif;
        color: #5e5e61;
        font-size: 14px;
    }
`;

const Meta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    & small {
        font-family: "Inter", sans-serif;
        color: #5e5e61;
    }
`;

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ItemRow = styled.div`
    display: grid;
    grid-template-columns: 56px 1fr auto;
    gap: 10px;
    align-items: center;
`;

const Thumb = styled.img`
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.06);
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;

    & strong {
        font-family: "Poppins", sans-serif;
        font-size: 16px;
    }

    & span {
        font-family: "Inter", sans-serif;
        color: #5e5e61;
        font-size: 14px;
    }
`;

const ItemRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: "Inter", sans-serif;
    font-size: 14px;
`;

const Totals = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    border-top: 1px dashed rgba(0, 0, 0, 0.15);
    padding-top: 8px;

    & div {
        display: flex;
        flex-direction: column;
        font-family: "Inter", sans-serif;

        & span {
            color: #5e5e61;
            font-size: 14px;
        }

        & h5 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }
    }
`;

const Purchases: React.FC = () => {
    const [purchases, setPurchases] = useState<IPurchase[]>([]);

    useEffect(() => {
        setPurchases(readPurchases());
        const onStorage = (e: StorageEvent) => {
            if (e.key === "purchases") {
                setPurchases(readPurchases());
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const content = useMemo(() => {
        if (!purchases.length) {
            return <Empty>No tenés compras aún.</Empty>;
        }

        return (
            <CardsGrid>
                {purchases.map((p) => {
                    const created = new Date(p.createdAt);
                    const dateText = created.toLocaleString("es-AR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    });

                    return (
                        <Card key={p.id}>
                            <CardHeader>
                                <div>
                                    <h4>Compra #{p.id.slice(0, 8).toUpperCase()}</h4>
                                    <span>{dateText}</span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <h4>${p.total}</h4>
                                </div>
                            </CardHeader>

                            <Meta>
                                <small>Nombre: {p.name}</small>
                                <small>Dirección: {p.address}</small>
                                <small>Pago: {p.payment === "cash" ? "Efectivo" : "Débito/Crédito"}</small>
                            </Meta>

                            <ItemsList>
                                {p.items.map((it, idx) => (
                                    <ItemRow key={`${p.id}-${it.id}-${it.size}-${idx}`}>
                                        <Thumb src={it.image} alt={it.name} />
                                        <ItemInfo>
                                            <strong>{it.name}</strong>
                                            <span>
                                                Tamaño: {it.size} · Cant: {it.quantity}
                                            </span>
                                        </ItemInfo>
                                        <ItemRight>
                                            <span>${it.price}</span>
                                            <span>${it.price * it.quantity}</span>
                                        </ItemRight>
                                    </ItemRow>
                                ))}
                            </ItemsList>

                            <Totals>
                                <div>
                                    <span>Productos: ${p.subtotal}</span>
                                    <span>Impuestos (5%): ${p.taxes}</span>
                                    <h5>Total: ${p.total}</h5>
                                </div>
                                <div />
                            </Totals>
                        </Card>
                    );
                })}
            </CardsGrid>
        );
    }, [purchases]);

    return (
        <PurchasesContainer>
            <h2>Historial de compras</h2>
            {content}
        </PurchasesContainer>
    );
};

export default Purchases;
