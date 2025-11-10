import React, { Fragment, useMemo, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useCartCount, useCartItems, useCartStore } from "@store/cartStore.ts";
import Input from "@/components/Input";
import Button from "@components/Button.tsx";
import {addPurchase} from "@utils/purchasesStorage.ts";
import type {TPaymentMethod} from "@/types/purchase.ts";
import {useLocation} from "react-router-dom";

interface Props {
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
    overflow: hidden;
`;

const CartContainer = styled.div`
    width: 45%;
    height: 100%;
    background: #e86b45;
    padding: 30px 30px 0 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    & h3 {
        font-family: "Inter", sans-serif;
        font-size: 40px;
        color: #fff;
        font-weight: 600;
    }

    & span {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        color: #fff;
        margin-bottom: 12px;
    }

    & svg {
        color: #fff;
        cursor: pointer;
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 20px;
    }

    @media (max-width: 990px) {
        width: 65%;
    }

    @media (max-width: 680px) {
        width: 85%;
    }

    @media (max-width: 560px) {
        width: 90%;
    }
`;

const CartProduct = styled.div`
    border: 1px solid #fff;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & img {
        height: 70px;
        width: 70px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 14px;
        padding: 4px;
        margin-right: 14px;

        @media (max-width: 560px) {
            width: 50px;
            height: 50px;
        }
    }
`;

const CartProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    font-family: "Inter", sans-serif;
    justify-content: center;
    height: 100%;

    & h5 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 4px;
        margin-top: auto;

        @media (max-width: 560px) {
            font-size: 18px;
        }

        @media (max-width: 380px) {
            font-size: 16px;
        }
    }

    & span {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: auto;

        @media (max-width: 560px) {
            font-size: 12px;
            
        }
        
        @media (max-width: 380px) {
            font-size: 10px;
        }
    }
`;

const CartProductCounter = styled.div`
    margin-left: auto;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    & button {
        background: rgba(255, 255, 255, 0.4);
        height: 100%;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        font-size: 24px;
        border: none;
        outline: none;
        color: #fff;
        cursor: pointer;

        &:first-of-type {
            border-radius: 10px 0 0 10px;
        }

        &:last-of-type {
            border-radius: 0 10px 10px 0;
        }

        @media (max-width: 560px) {
            width: 30px;
        }

        @media (max-width: 380px) {
            width: 20px;
            font-size: 14px;
        }
    }

    & span {
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;

        @media (max-width: 560px) {
            width: 30px;
        }

        @media (max-width: 380px) {
            width: 20px;
        }
    }
`;

const CartTotal = styled.div`
    margin-top: auto;
    border-top: solid 1px #fff;
    padding-top: 20px;
    display: flex;
    flex-direction: column;

    & span {
        font-size: 20px;
        margin-bottom: 18px;
    }
    
    @media (max-width: 380px) {
        & button {
            font-size: 16px;
        }
    }
`;

const CartMessageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: "Inter", sans-serif;
`;

const CartForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 100%;
    padding-bottom: 20px;
`;

const Label = styled.label`
    color: #fff;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    margin-bottom: 6px;
`;

const ErrorText = styled.small`
    color: #fff;
    opacity: 0.9;
    background: rgba(0, 0, 0, 0.15);
    border: 1px dashed rgba(255, 255, 255, 0.6);
    padding: 6px 8px;
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    margin-top: -6px;
    margin-bottom: 10px;
`;

const PaymentText = styled.p`
    color: #fff;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    margin: 10px 0 6px 0;
`;

const PaymentRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
`;

const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-family: "Inter", sans-serif;
    cursor: pointer;
`;

const Radio = styled.input`
    accent-color: #ff9900;
    cursor: pointer;
`;

const FormFooter = styled.div`
    align-items: center;
    border-top: 1px solid #fff;
    padding-top: 16px;
    margin-top: auto;
`;

const Totals = styled.div`
    display: flex;
    flex-direction: column;

    & span,
    & h5 {
        color: #fff;
        font-family: "Inter", sans-serif;
        margin: 5px 0 0 0;
    }
    
    & h5 {
        font-size: 24px;
    }
`;

const FooterButtons = styled.div`
    display: flex;
    gap: 10px;
    height: 40px;
    margin-top: 14px;
    
    & button {
        height: 100%;
        font-size: 16px;
    }
`;

const TAX_RATE = 0.05;

const Cart: React.FC<Props> = ({ setShowCart }) => {

    const { pathname } = useLocation();

    const [showForm, setShowForm] = useState(false);

    const count = useCartCount();
    const items = useCartItems();

    const inc = useCartStore((s) => s.inc);
    const dec = useCartStore((s) => s.dec);
    const clear = useCartStore((s) => s.clear);

    const subtotal = useMemo(
        () => items.reduce((prev, item) => prev + item.price * item.quantity, 0),
        [items]
    );
    const taxes = Math.round(subtotal * TAX_RATE);
    const total = subtotal + taxes;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState<"" | "cash" | "card">("");
    const [submitAttempt, setSubmitAttempt] = useState(false);

    const errors = {
        name: !name.trim() ? "Ingresá tu nombre y apellido." : "",
        address: !address.trim() ? "Ingresá tu dirección." : "",
        payment: !payment ? "Elegí un método de pago." : "",
    };

    const hasErrors =
        Boolean(errors.name) || Boolean(errors.address) || Boolean(errors.payment);

    const onConfirmProducts = () => {
        if (!items.length) return;
        setShowForm(true);
    };

    const onBack = () => {
        setShowForm(false);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempt(true);
        if (hasErrors) return;

        addPurchase({
            name: name.trim(),
            address: address.trim(),
            payment: payment as TPaymentMethod,
            items: [...items],
            subtotal,
            taxes,
            total,
        });

        alert(`¡Gracias ${name.trim()}! Total: $${total}`);
        clear();
        setShowForm(false);
        setShowCart(false);

        setName("");
        setAddress("");
        setPayment("");

        if (pathname === "/purchases") {
            window.location.reload();
        }
    };

    return (
        <CartOverlay>
            <CartContainer>
                <IoMdClose onClick={() => setShowCart(false)} />
                <h3>Carrito</h3>
                <span>{count} producto(s)</span>

                {items.length === 0 && (
                    <CartMessageContainer>
                        Tu carrito está vacio
                    </CartMessageContainer>
                )}

                {!showForm && items.length > 0 && (
                    <Fragment>
                        {items.map((item) => {
                            return (
                                <CartProduct key={`${item.id}-${item.size}`}>
                                    <img src={item.image} alt="" />
                                    <CartProductInfo>
                                        <h5>{item.name}</h5>
                                        <span>Tamaño: {item.size}</span>
                                    </CartProductInfo>
                                    <CartProductCounter>
                                        <button onClick={() => dec(item.id, item.size)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => inc(item.id, item.size)}>+</button>
                                    </CartProductCounter>
                                </CartProduct>
                            );
                        })}
                        <CartTotal>
                            <span>Subtotal: ${subtotal}</span>
                            <Button onClick={onConfirmProducts} isWhite={true}>Confirmar Productos</Button>
                        </CartTotal>
                    </Fragment>
                )}

                {showForm && items.length > 0 && (
                    <Fragment>
                        <CartForm noValidate={true} onSubmit={onSubmit}>
                            <Label>Nombre y apellido:</Label>
                            <Input
                                type="text"
                                placeholder="Jhon Doe"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                                maxLength={50}
                            />
                            {submitAttempt && errors.name && <ErrorText>{errors.name}</ErrorText>}

                            <Label>Dirección:</Label>
                            <Input
                                type="text"
                                placeholder="Av. Siempre Viva 123"
                                value={address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setAddress(e.target.value)
                                }
                                maxLength={100}
                            />
                            {submitAttempt && errors.address && (
                                <ErrorText>{errors.address}</ErrorText>
                            )}

                            <PaymentText>Método de pago:</PaymentText>
                            <PaymentRow>
                                <RadioLabel>
                                    <Radio
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={payment === "cash"}
                                        onChange={() => setPayment("cash")}
                                    />
                                    Efectivo
                                </RadioLabel>

                                <RadioLabel>
                                    <Radio
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={payment === "card"}
                                        onChange={() => setPayment("card")}
                                    />
                                    Débito/Crédito
                                </RadioLabel>
                            </PaymentRow>

                            {submitAttempt && errors.payment && (
                                <ErrorText>{errors.payment}</ErrorText>
                            )}

                            <FormFooter>
                                <Totals>
                                    <span>Productos: ${subtotal}</span>
                                    <span>Impuestos (5%): ${taxes}</span>
                                    <h5>Total: ${total}</h5>
                                </Totals>

                                <FooterButtons>
                                    <Button type="button" onClick={onBack} withBorder={true}>
                                        Volver
                                    </Button>
                                    <Button type="submit" isWhite={true}>
                                        Comprar
                                    </Button>
                                </FooterButtons>
                            </FormFooter>
                        </CartForm>
                    </Fragment>
                )}
            </CartContainer>
        </CartOverlay>
    );
};

export default Cart;
