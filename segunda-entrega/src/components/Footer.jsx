import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <strong>Contacto</strong>
                <p>Tel: +54 9 11 1234-5678</p>
                <p>Email: contacto@mmmenu.com</p>
                <strong>Dirección</strong>
                <p>Av. Siempre Viva 123, Córdoba, AR</p>
                <strong>Horario</strong>
                <p>Lun-Dom: 12:00 - 23:00</p>
            </div>
            <div className="footer__content footer__content--policies">
                <strong>Políticas</strong>
                <p>
                    {/* --> PLACEHOLDER <-- links */}
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
            </div>
        </footer>
    );
};

export default Footer;
