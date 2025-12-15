import React, { Fragment, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCartCount, useCartItems, useCartStore } from "@store/cartStore";
import Input from "@components/Input";
import Button from "@components/Button";
import { addPurchase } from "@utils/purchasesStorage";
import { useLocation } from "react-router-dom";

const TAX_RATE = 0.05;

const Cart = ({ setShowCart }) => {
    const { pathname } = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [submitAttempt, setSubmitAttempt] = useState(false);

    const count = useCartCount();
    const items = useCartItems();

    const inc = useCartStore((s) => s.inc);
    const dec = useCartStore((s) => s.dec);
    const clear = useCartStore((s) => s.clear);

    const subtotal = useMemo(
        () => items.reduce((prev, item) => prev + item.price * item.quantity, 0),
        [items],
    );
    const taxes = Math.round(subtotal * TAX_RATE);
    const total = subtotal + taxes;

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

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempt(true);
        if (hasErrors) return;

        addPurchase({
            name: name.trim(),
            address: address.trim(),
            payment,
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

    const nameId = "cart-name";
    const addressId = "cart-address";
    const cashPaymentId = "payment-cash";
    const cardPaymentId = "payment-card";

    return (
        <div className="cart-overlay">
            <div className="cart">
                <IoMdClose onClick={() => setShowCart(false)} className="cart__close" />
                <h3 className="cart__title">Carrito</h3>
                <span className="cart__subtitle">{count} producto(s)</span>

                {items.length === 0 && (
                    <div className="cart-message">
                        Tu carrito está vacío
                    </div>
                )}

                {!showForm && items.length > 0 && (
                    <Fragment>
                        {items.map((item) => {
                            return (
                                <div className="cart-product" key={`${item.id}-${item.size}`}>
                                    <img src={item.image} alt="" className="cart-product__image" />
                                    <div className="cart-product__info">
                                        <h5>{item.name}</h5>
                                        <span>Tamaño: {item.size}</span>
                                    </div>
                                    <div className="cart-product__counter">
                                        <button onClick={() => dec(item.id, item.size)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => inc(item.id, item.size)}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="cart-total">
                            <span>Subtotal: ${subtotal}</span>
                            <Button onClick={onConfirmProducts} isWhite={true}>Confirmar Productos</Button>
                        </div>
                    </Fragment>
                )}

                {showForm && items.length > 0 && (
                    <Fragment>
                        <form className="cart-form" noValidate onSubmit={onSubmit}>
                            <label htmlFor={nameId} className="label">Nombre y apellido:</label>
                            <Input
                                id={nameId}
                                type="text"
                                placeholder="Jhon Doe"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                maxLength={50}
                            />
                            {submitAttempt && errors.name && <small className="error-text">{errors.name}</small>}

                            <label htmlFor={addressId} className="label">Dirección:</label>
                            <Input
                                id={addressId}
                                type="text"
                                placeholder="Av. Siempre Viva 123"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                maxLength={100}
                            />
                            {submitAttempt && errors.address && (
                                <small className="error-text">{errors.address}</small>
                            )}

                            <p className="payment-text">Método de pago:</p>
                            <div className="payment-row">
                                <label className="radio-label" htmlFor={cashPaymentId}>
                                    <input
                                        id={cashPaymentId}
                                        className="radio"
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={payment === "cash"}
                                        onChange={() => setPayment("cash")}
                                    />
                                    Efectivo
                                </label>

                                <label className="radio-label" htmlFor={cardPaymentId}>
                                    <input
                                        id={cardPaymentId}
                                        className="radio"
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={payment === "card"}
                                        onChange={() => setPayment("card")}
                                    />
                                    Débito/Crédito
                                </label>
                            </div>

                            {submitAttempt && errors.payment && (
                                <small className="error-text">{errors.payment}</small>
                            )}

                            <div className="form-footer">
                                <div className="totals">
                                    <span>Productos: ${subtotal}</span>
                                    <span>Impuestos (5%): ${taxes}</span>
                                    <h5>Total: ${total}</h5>
                                </div>

                                <div className="footer-buttons">
                                    <Button type="button" onClick={onBack} withBorder={true}>
                                        Volver
                                    </Button>
                                    <Button type="submit" isWhite={true}>
                                        Comprar
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default Cart;
