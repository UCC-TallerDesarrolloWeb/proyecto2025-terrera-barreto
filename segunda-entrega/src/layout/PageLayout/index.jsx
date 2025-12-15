import React, { useState } from "react";
import PageContainer from "@components/PageContainer";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router-dom";
import Cart from "@components/Cart";

const PageLayout = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <PageContainer>
            <Header onCartButtonClick={() => setShowCart(true)}/>
            <section className="page-content">
                <Outlet/>
            </section>
            <Footer/>

            {showCart && (
                <Cart setShowCart={setShowCart}/>
            )}
        </PageContainer>
    );
};

export default PageLayout;
