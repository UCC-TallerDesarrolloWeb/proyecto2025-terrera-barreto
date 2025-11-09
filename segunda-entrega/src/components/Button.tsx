import React, { type ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode | ReactNode[];
}

const ButtonContainer = styled.button`
    width: fit-content;
    padding: 10px 22px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #FFFCF7;
    background: #E86B45;
    border: 0;
    border-radius: 14px;
    cursor: pointer;
    transition: ease-in 0.2s;
    
    &:hover {
        background: #d65026;
        
    }
`;

const Button: React.FC<Props> = ({ children }) => {
    return (
        <ButtonContainer>
            {children}
        </ButtonContainer>
    );
}

export default Button;