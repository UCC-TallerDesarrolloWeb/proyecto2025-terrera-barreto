import React from "react";
import styled from "styled-components";
import Button from "@components/Button.tsx";
import type { IProduct } from "@/types/product.ts";

interface Props extends IProduct {
    onButtonClick: (selectedSize: string) => void;
}

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
        text-align: center;
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

    @media (max-width: 560px) {
        height: 640px;
    }

    @media (max-width: 500px) {
        height: 600px;
    }

    @media (max-width: 450px) {
        height: 540px;
    }

    @media (max-width: 380px) {
        height: 500px;
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

    @media (max-width: 906px) {
        margin-bottom: 26px;
    }

    @media (max-width: 875px) {
        margin-bottom: 46px;
    }

    @media (max-width: 760px) {
        margin-bottom: 26px;
    }

    @media (max-width: 680px) {
        margin-bottom: 20px;
    }

    @media (max-width: 640px) {
        margin-bottom: 20px;
    }
    
    
`;

const Size = styled.div<{ isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    cursor: pointer;

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
        border: dashed 1px
        ${({ isSelected }) => (isSelected ? "#ff9900" : "rgba(0,0,0,0.65)")};
        margin-bottom: 4px;
        transition: ease-in 0.1s;
        background: ${({ isSelected }) => (isSelected ? "#ffefcc" : "transparent")};
    }

    &:hover span:first-child {
        background: ${({ isSelected }) =>
                isSelected ? "#ffefcc" : "rgba(0,0,0,0.1)"};
    }
`;

const ProductCard: React.FC<Props> = ({
    id,
    name,
    image,
    description,
    sizes,
    onButtonClick
}) => {
    const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

    return (
        <ProductContainer>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>{description}</p>

            <SizeSelector>
                {Object.entries(sizes).map(([size, price]) => (
                    <Size
                        key={`${id}-size-${size}`}
                        isSelected={selectedSize === size}
                        onClick={() => {
                            if(selectedSize === size) {
                                setSelectedSize(null);
                            } else {
                                setSelectedSize(size);
                            }
                        }}
                    >
                        <span>{size}</span>
                        <span>${price}</span>
                    </Size>
                ))}
            </SizeSelector>

            <Button
                onClick={() => {
                    if(selectedSize !== null) {
                        onButtonClick(selectedSize);
                        setSelectedSize(null);
                    }
                }}
            >
                Agregar al Carrito
            </Button>
        </ProductContainer>
    );
};

export default ProductCard;
