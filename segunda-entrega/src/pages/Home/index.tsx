import React from "react";
import PageLayout from "@/layout/PageLayout";
import styled from "styled-components";
import Button from "@components/Button.tsx";
import CarouselImage from "@assets/images/carousel_pizza.png";
import ProductsJson from "@data/products.json";
import type { Product } from "@/types/product.ts";

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
`;

const ImageContainer = styled.div`
    width: 40%;
    display: flex;
    margin-left: auto;

    & img {
        width: 100%;
        margin: auto;
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
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px;
    align-items: center;
    background: #fff6e7;
    border-radius: 30px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

    & img {
        width: 100%;
        margin-bottom: 12px;
    }

    & h4 {
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        font-weight: 500;
    }

    & p {
        font-family: "Inter", sans-serif;
        text-align: center;
        color: #5e5e61;
        height: 540px;
    }
    
    & button {
        margin-top: auto;
        width: 100%;
        border-radius: 100px;
        padding: 10px;
    }
`;

const SizeSelector = styled.div`
    width: fit-content;
    display: flex;
    margin-top: auto;
    margin-bottom: 10px;
    gap: 18px;

    & > div:first-child {
        margin-left: auto;
    }
    & > div:last-child {
        margin-right: auto;
    }
`;

const Size = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &.selected span:first-child {
        background-color: #ffefcc;
        border: 1px solid #ff9900;
    }

    & span {
        text-align: center;
        font-family: "Poppins", sans-serif;
    }

    & span:first-child {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 400;
        border-radius: 50%;
        border: dashed 1px rgba(0, 0, 0, 0.65);
        margin-bottom: 4px;
        transition: ease-in 0.1s;
    }

    & span:first-child:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const products: Product[] = ProductsJson as Product[];

const images = import.meta.glob("/src/assets/images/*", {
    eager: true,
    as: "url",
}) as Record<string, string>;

const srcFor = (name: string) => images["/src/assets/images/" + name];

const Home: React.FC = () => {
    return (
        <PageLayout>
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
                        <ProductContainer key={product.id}>
                            <img src={srcFor(product.image)} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>

                            <SizeSelector>
                                {Object.entries(product.sizes).map(([size, price]) => (
                                    <Size key={`${product.id}-size-${size}`}>
                                        <span>{size}</span>
                                        <span>${price}</span>
                                    </Size>
                                ))}
                            </SizeSelector>

                            <Button>Agregar al Carrito</Button>
                        </ProductContainer>
                    ))}
                </ProductsContainer>
            </MenuContainer>
        </PageLayout>
    );
};

export default Home;
