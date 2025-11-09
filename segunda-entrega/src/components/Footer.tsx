import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    margin-top: 40px;
    background: #E86B45;
    padding: 40px;
    display: flex;
    justify-content: space-around;
    min-height: 300px;
    gap: 20px;
`;

const FooterContent = styled.div`
    font-family: "Inter", sans-serif;
    display: flex;
    flex-direction: column;
    color: #fff;
    
    & > strong {
        margin-top: 16px;
    }
`;

const ContactInformation = styled(FooterContent)``;

const PoliciesInformation = styled(FooterContent)`
    text-align: right;
    
    & span, a {
        color: #fff;
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <ContactInformation>
                <strong>Contacto</strong>
                <p>Tel: +54 9 11 1234-5678</p>
                <p>Email: contacto@mmmenu.com</p>
                <strong>Dirección</strong>
                <p>Av. Siempre Viva 123, Córdoba, AR</p>
                <strong>Horario</strong>
                <p>Lun–Dom: 12:00 — 23:00</p>
            </ContactInformation>
            <PoliciesInformation>
                <strong>Políticas</strong>
                <p>
                    <a href="#">Términos y Condiciones</a>
                    {" · "}
                    <a href="#">Política de Privacidad</a>
                    {" · "}
                    <a href="#">Política de Cookies</a>
                </p>
                <strong>Soporte</strong>
                <p>
                    ¿Problemas con un pedido?
                    <br/>
                    Contactanos por email a <span>soporte@mmmenu.com</span>
                </p>
                <div className="copyright">
                    Copyright © 2025 Mmmenú LLC · Todos los derechos reservados.
                </div>
            </PoliciesInformation>
        </FooterContainer>
    );
}

export default Footer;