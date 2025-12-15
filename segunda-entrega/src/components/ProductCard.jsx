import React, { useState } from "react";
import Button from "@components/Button";

const ProductCard = ({
    id,
    name,
    image,
    description,
    sizes,
    onButtonClick,
}) => {
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-card__image" />
            <h4 className="product-card__title">{name}</h4>
            <p className="product-card__description">{description}</p>

            <div className="size-selector">
                {Object.entries(sizes).map(([size, price]) => (
                    <div
                        key={`${id}-size-${size}`}
                        className={`size ${selectedSize === size ? "size--selected" : ""}`}
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
                    </div>
                ))}
            </div>

            <Button
                onClick={() => {
                    if(selectedSize !== null) {
                        onButtonClick(selectedSize);
                        setSelectedSize(null);
                    }
                }}
                className="product-card__button"
            >
                Agregar al Carrito
            </Button>
        </div>
    );
};

export default ProductCard;
