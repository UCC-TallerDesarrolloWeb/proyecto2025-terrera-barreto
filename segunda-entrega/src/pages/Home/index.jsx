import React, { Fragment, useEffect, useState } from "react";
import Button from "@components/Button";
import CarouselImage from "@assets/images/carousel_pizza.png";
import ProductCard from "@components/ProductCard";
import { useCartStore } from "@store/cartStore";
import { fetchProducts } from "@api/products";

const images = import.meta.glob("/src/assets/images/*", {
    eager: true,
    query: "?url",
    import: "default",
});

const srcFor = (name) => images["/src/assets/images/" + name];

const Home = () => {
    const add = useCartStore((s) => s.add);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const data = await fetchProducts();
                if (!cancelled) {
                    setProducts(data);
                    setError("");
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err?.message || "Error al cargar el menú");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleAddToCart = (product, selectedSize) => {
        const price = product.sizes[selectedSize];
        if (price == null) {
            alert("Tamaño inválido");
            return;
        }

        add({
            id: product.id,
            name: product.name,
            size: selectedSize,
            price,
            image: srcFor(product.image),
        });

        alert(`${product.name} (${selectedSize}) agregada al carrito`);
    };

    return (
        <Fragment>
            <div className="carousel">
                <div className="carousel__content">
                    <h2>Probá nuestra NUEVA Margarita</h2>
                    <p>Con albahaca fresca y recién salida del horno :)</p>
                    <Button>Pedir ahora</Button>
                </div>
                <div className="carousel__image">
                    <img src={CarouselImage} alt="Imagen de pizza margarita con fondo" />
                </div>
            </div>

            <div className="menu">
                <h3>Menú</h3>
                <p>¿Qué vas a pedir hoy?</p>

                {loading && <div className="products__status">Cargando pizzas...</div>}
                {error && !loading && <div className="products__status products__status--error">{error}</div>}

                {!loading && !error && (
                    <div className="products">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                                image={srcFor(product.image)}
                                onButtonClick={(selectedSize) => handleAddToCart(product, selectedSize)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Home;
