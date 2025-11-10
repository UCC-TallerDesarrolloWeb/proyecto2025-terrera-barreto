import React, {Fragment} from "react";
import styled from "styled-components";
import Button from "@components/Button.tsx";
import CarouselImage from "@assets/images/carousel_pizza.png";
import ProductsJson from "@data/products.json";
import type {IProduct, TProductSize} from "@/types/product.ts";
import ProductCard from "@components/ProductCard.tsx";
import {useCartStore} from "@store/cartStore.ts";

const CarouselContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 24px;
    display: flex;
`;

const CarouselContent = styled.div`
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & h2 {
        font-family: "Inter", sans-serif;
        font-size: 42px;
        margin-bottom: 10px;
        z-index: 1;
    }

    & p {
        font-family: "Inter", sans-serif;
        font-size: 22px;
        font-weight: 500;
        color: #3f3f3f;
        margin-bottom: 16px;
    }

    @media (max-width: 625px) {
        width: 100%;
    }
`;

const ImageContainer = styled.div`
    width: 40%;
    display: flex;
    margin-left: auto;

    & img {
        width: 100%;
        margin: auto;
    }

    @media (max-width: 625px) {
        display: none;
    }
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 920px;
    margin: 0 auto;

    & h3 {
        font-family: "Inter", sans-serif;
        font-size: 24px;
        font-weight: 600;
    }

    & p {
        font-family: "Inter", sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #5e5e61;
        margin-bottom: 16px;
    }
`;

const ProductsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 520px 520px;
    gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 906px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 620px);
    }

    @media (max-width: 875px) {
        grid-template-rows: repeat(3, 600px);
    }

    @media (max-width: 760px) {
        grid-template-rows: repeat(3, 550px);
    }

    @media (max-width: 680px) {
        grid-template-rows: repeat(3, 530px);
    }

    @media (max-width: 640px) {
        grid-template-rows: repeat(3, 540px);
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
        grid-template-rows: 640px;
    }

    @media (max-width: 500px) {
        grid-template-rows: 600px;
    }

    @media (max-width: 450px) {
        grid-template-rows: 540px;
    }

    @media (max-width: 380px) {
        grid-template-rows: 500px;
    }
`;

const products: IProduct[] = ProductsJson as IProduct[];

const images = import.meta.glob("/src/assets/images/*", {
    eager: true,
    as: "url",
}) as Record<string, string>;

const srcFor = (name: string) => images["/src/assets/images/" + name];

const Home: React.FC = () => {

    const add = useCartStore((s) => s.add);

    const handleAddToCart = (product: IProduct, selectedSize: string) => {
        const price = product.sizes[selectedSize as keyof typeof product.sizes];
        if (price == null) {
            alert("Tamaño inválido");
            return;
        }

        add({
            id: product.id,
            name: product.name,
            size: selectedSize as TProductSize,
            price,
            image: srcFor(product.image),
        });

        alert(`${product.name} (${selectedSize}) agregada al carrito`);
    };

    return (
        <Fragment>
            <CarouselContainer>
                <CarouselContent>
                    <h2>Probá nuestra NUEVA Margarita</h2>
                    <p>Con albahaca fresca y recién salida del horno :)</p>
                    <Button>Pedir ahora</Button>
                </CarouselContent>
                <ImageContainer>
                    <img src={CarouselImage} alt="Imagen de pizza margarita con fondo" />
                </ImageContainer>
            </CarouselContainer>

            <MenuContainer>
                <h3>Menú</h3>
                <p>¿Qué vas a pedir hoy?</p>

                <ProductsContainer>
                    {products.map((product) => (
                        <ProductCard
                            {...product}
                            image={srcFor(product.image)}
                            onButtonClick={(selectedSize: string) => handleAddToCart(product, selectedSize)}
                        />
                    ))}
                </ProductsContainer>
            </MenuContainer>
        </Fragment>
    );
};

export default Home;
