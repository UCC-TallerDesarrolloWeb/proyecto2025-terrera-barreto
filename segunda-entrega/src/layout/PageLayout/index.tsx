import React, {useState} from "react";
import PageContainer from "@components/PageContainer";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Cart from "@components/Cart";

const ContentContainer = styled.section`
    display: flex;
    width: 100%;
    max-width: 100vw;
    flex-direction: column;
    padding: 0 60px;
`;

const PageLayout: React.FC = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <PageContainer>
            <Header onCartButtonClick={() => setShowCart(true)}/>
            <ContentContainer>
                <Outlet/>
            </ContentContainer>
            <Footer/>

            {showCart && (
                <Cart setShowCart={setShowCart}>

                </Cart>
            )}
        </PageContainer>
    );
}

export default PageLayout;