import React from "react";
import { LogoText, TextButton } from "@components/Typography";
import Badge from "@components/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartCount } from "@store/cartStore";

const Header = ({ onCartButtonClick }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isPurchases = pathname === "/purchases";
    const count = useCartCount();

    return (
        <header className="header">
            <TextButton className="header__link header__link--left" onClick={onCartButtonClick}>
                Carrito
                <Badge>
                    {count}
                </Badge>
            </TextButton>
            <div className="logo-container">
                <img src="/images/logo.png" alt={"Mmmenú logo"}/>
                <LogoText>
                    Mmmenú
                </LogoText>
            </div>
            <TextButton className="header__link header__link--right" onClick={() => navigate(isPurchases ? "/" : "/purchases")}>
                {isPurchases ? "Home" : "Compras"}
            </TextButton>
        </header>
    );
};

export default Header;
