import React from "react";
import styled from "styled-components";
import {LogoText, TextButton} from "@components/Typography.tsx";
import Badge from "@components/Badge.tsx";

import LogoImage from "@assets/images/logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import {useCartCount} from "@store/cartStore.ts";

interface Props {
    onCartButtonClick: () => void;

}

const HeaderContainer = styled.header`
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 16px 0;
    
    & > span:first-of-type {
        margin-left: auto;
    }
    
    & > span:last-of-type {
        margin-right: auto;
    }

    @media (max-width: 560px) {
        gap: 30px;
    }

    @media (max-width: 500px) {
        gap: 20px;
    }

    @media (max-width: 450px) {
        gap: 10px;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    & > img {
        width: 40px;
    }
`;

const Header: React.FC<Props> = ({ onCartButtonClick }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isPurchases = pathname === "/purchases";

    const count = useCartCount();

    return (
        <HeaderContainer>
            <TextButton onClick={onCartButtonClick}>
                Carrito
                <Badge>
                    {count}
                </Badge>
            </TextButton>
            <LogoContainer>
                <img src={LogoImage} alt={"Mmmenú logo"}/>
                <LogoText>
                    Mmmenú
                </LogoText>
            </LogoContainer>
            <TextButton onClick={() => navigate(isPurchases ? "/" : "/purchases")}>
                {isPurchases ? "Home" : "Compras"}
            </TextButton>
        </HeaderContainer>
    );
}

export default Header;