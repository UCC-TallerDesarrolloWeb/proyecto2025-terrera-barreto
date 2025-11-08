import React from "react";
import styled from "styled-components";
import {LogoText, TextButton} from "@components/Typography.tsx";
import Badge from "@components/Badge.tsx";

import LogoImage from "@assets/images/logo.png";

const HeaderContainer = styled.header`
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    
    & > span:first-of-type {
        margin-left: auto;
    }
    
    & > span:last-of-type {
        margin-right: auto;
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

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <TextButton>
                Menú
            </TextButton>
            <TextButton>
                Carrito
                <Badge>
                    4
                </Badge>
            </TextButton>
            <LogoContainer>
                <img src={LogoImage} alt={"Mmmenú logo"}/>
                <LogoText>
                    Mmmenú
                </LogoText>
            </LogoContainer>
            <TextButton>
                +54 351 858 3498
            </TextButton>
        </HeaderContainer>
    );
}

export default Header;