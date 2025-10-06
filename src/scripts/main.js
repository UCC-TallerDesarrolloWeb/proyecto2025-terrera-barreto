const pizzas = [
    {
        id: 1,
        name: "Muzzarella",
        description: "Queso fundido, masa crocante.",
        image: "./src/assets/images/muzzarella.png",
        sizes: {
            S: 100,
            M: 130,
            L: 160
        }
    },
    {
        id: 2,
        name: "Fugazzeta",
        description: "Cebolla caramelizada y mucho queso.",
        image: "./src/assets/images/fugazzeta.png",
        sizes: {
            S: 110,
            M: 145,
            L: 170
        }
    },
    {
        id: 3,
        name: "Margarita",
        description: "Tomate, mozzarella y albahaca.",
        image: "./src/assets/images/margarita.png",
        sizes: {
            S: 95,
            M: 125
        }
    },
    {
        id: 4,
        name: "Jamón y Queso",
        description: "Jamón jugoso y queso derretido.",
        image: "./src/assets/images/jyq.png",
        sizes: {
            S: 120,
            M: 150,
            L: 180
        }
    },
    {
        id: 5,
        name: "Pepperoni",
        description: "Rodajas picantes y crujientes de pepperoni.",
        image: "./src/assets/images/pepperoni.png",
        sizes: {
            S: 130,
            M: 165,
            L: 190
        }
    },
    {
        id: 6,
        name: "Bacon",
        description: "Bacon ahumado, bien crocante.",
        image: "./src/assets/images/bacon.png",
        sizes: {
            S: 115,
            M: 140
        }
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let showCart = false;

const productsContainer = document.getElementById("products-container");
const cartCounter = document.getElementById("cart-counter");
const productsCounter = document.getElementById("products-counter");
const cartContainer = document.getElementById("cart-container");
const headerCartButton = document.getElementById("open-cart-button");
const cartForm = document.getElementById("cart-form");
const cartProductsContainerEl = document.getElementById("cart-products-container");
const productTotalEl = document.getElementById("product-total");
const taxesEl = document.getElementById("taxes");
const grandTotalEl = document.getElementById("grand-total");
const closeCartButton  = document.getElementById("close-cart-button");
const btnBack = document.getElementById("btn-back");

/**
 * Renderiza las pizzas en el DOM y adjunta listeners para cada tarjeta de producto.
 * @method renderPizzas
 * @return {void}
 */
const renderPizzas = () => {
    productsContainer.innerHTML = "";

    pizzas.forEach(pizza => {
        const pizzaDiv = document.createElement("div");
        pizzaDiv.classList.add("product-container");

        pizzaDiv.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h4>${pizza.name}</h4>
      <p>${pizza.description}</p>
      <div class="size-selector">
        ${Object.entries(pizza.sizes)
            .map(([size, price]) => `
            <div class="size" data-size="${size}">
              <span>${size}</span>
              <span>$${price}</span>
            </div>
          `)
            .join("")}
      </div>
      <button data-id="${pizza.id}">Agregar al Carrito</button>
    `;

        productsContainer.appendChild(pizzaDiv);
    });

    addCartListeners();
};

/**
 * Añade listeners a cada tarjeta de producto para seleccionar tamaño y agregar al carrito.
 * @method addCartListeners
 * @return {void}
 */
const addCartListeners = () => {
    const productContainers = document.querySelectorAll(".product-container");

    productContainers.forEach(container => {
        const sizes = container.querySelectorAll(".size");
        const button = container.querySelector("button");
        let selectedSize = null;

        sizes.forEach(sizeDiv => {
            sizeDiv.addEventListener("click", () => {
                sizes.forEach(s => s.classList.remove("selected"));
                sizeDiv.classList.add("selected");
                selectedSize = sizeDiv.dataset.size;
            });
        });

        button.addEventListener("click", () => {
            const pizzaId = parseInt(button.dataset.id);
            const pizza = pizzas.find(p => p.id === pizzaId);

            if (!selectedSize) {
                alert("Seleccioná un tamaño antes de agregar al carrito");
                return;
            }

            const price = pizza.sizes[selectedSize];

            const existing = cart.find(
                item => item.id === pizza.id && item.size === selectedSize
            );

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: pizza.id,
                    name: pizza.name,
                    size: selectedSize,
                    price,
                    quantity: 1,
                    image: pizza.image
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${pizza.name} (${selectedSize}) agregada al carrito`);
            render();
        });
    });
};

/**
 * Actualiza el contador del carrito en el header y el texto resumen dentro del overlay.
 * @method renderCartCounter
 * @return {void}
 */
const renderCartCounter = () => {
    if (cart.length === 0) {
        cartCounter.innerHTML = "0";
        productsCounter.innerHTML = "0 productos";
    } else {
        cartCounter.innerHTML = cart.length;
        productsCounter.innerHTML = `${cart.length} productos`;
    }
};

/**
 * Añade listeners a los botones de cantidad (+ / -) dentro del carrito y actualiza cantidades.
 * @method attachQuantityListeners
 * @return {void}
 */
const attachQuantityListeners = () => {
    document.querySelectorAll(".cart-product-quantity button").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index);
            const action = btn.dataset.action;

            if (action === "increase") {
                cart[index].quantity += 1;
            } else if (action === "decrease") {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });
};

/**
 * Renderiza el contenido del carrito (lista de productos y total) en el overlay.
 * @method renderCart
 * @return {void}
 */
const renderCart = () => {
    const cartProductsContainer = document.querySelector(".cart-products-container");
    cartProductsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartProductsContainer.innerHTML = `
      <p style="color:white; font-family:Inter,sans-serif; text-align:center; margin-top:50px;">
        Tu carrito está vacío 🍕
      </p>
    `;
        renderCartCounter();
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const productDiv = document.createElement("div");
        productDiv.classList.add("cart-product");
        productDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-product-info">
        <h5>${item.name}</h5>
        <span>Tamaño: ${item.size}</span>
      </div>
      <div class="cart-product-quantity">
        <button data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button data-index="${index}" data-action="increase">+</button>
      </div>
    `;
        cartProductsContainer.appendChild(productDiv);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `
    <span>Total: $${total}</span>
    ${cart.length > 0 ? `<button id="confirm-products">Confirmar Productos</button>` : ""}
  `;
    cartProductsContainer.appendChild(totalDiv);

    attachQuantityListeners();
    renderCartCounter();
};

/**
 * Muestra u oculta el overlay del carrito. Cuando se muestra, bloquea el scroll del body y renderiza el carrito.
 * @method toggleCart
 * @param {boolean} state - Si `true`, muestra el overlay; si `false` o ausente, lo oculta.
 * @return {void}
 */
const toggleCart = (state) => {
    if (state) {
        cartContainer.style.display = "flex";
        document.body.style.overflow = "hidden";
        renderCart();
    } else {
        cartContainer.style.display = "none";
        document.body.style.overflow = "";
    }
};

/**
 * Calcula totales de productos e impuestos, y muestra el formulario de checkout, ocultando la lista de productos del carrito.
 * @method showCheckoutForm
 * @return {void}
 */
const showCheckoutForm = () => {
    const total = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const taxes = Math.round(total * 0.05);
    const grand = total + taxes;

    productTotalEl.textContent = `Productos: $${total}`;
    taxesEl.textContent = `Impuestos (5%): $${taxes}`;
    grandTotalEl.textContent = `Total: $${grand}`;

    cartProductsContainerEl.style.display = "none";
    cartForm.style.display = "flex";

    const nameInput = document.getElementById("user-name");
    if (nameInput) nameInput.focus();
};

btnBack.addEventListener("click", () => {
    cartForm.style.display = "none";
    cartProductsContainerEl.style.display = "flex";
})

/**
 * Valida los campos del formulario de checkout: nombre, dirección y método de pago.
 * @method validateCheckoutForm
 * @return {boolean} Retorna `true` si todos los campos son válidos; retorna `false` y limpia/manda `alert` si encuentra errores.
 */
const validateCheckoutForm = () => {
    const nameInput = document.getElementById("user-name");
    const addressInput = document.getElementById("user-address");
    const paymentSelected = document.querySelector("input[name='payment-method']:checked");

    const name = nameInput.value.trim();
    const address = addressInput.value.trim();

    if (!name || !address || !paymentSelected) {
        alert("Por favor, completá todos los campos (nombre, dirección y método de pago).");
        if (!name) {
            nameInput.value = "";
            nameInput.focus();
        }
        if (!address) {
            addressInput.value = "";
        }
        return false;
    }

    const nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
    if (!nameRe.test(name)) {
        alert("Nombre inválido. Usá sólo letras y espacios (2-50 caracteres).");
        nameInput.value = "";
        nameInput.focus();
        return false;
    }

    if (address.length < 5 || address.length > 100) {
        alert("Dirección inválida. Debe tener entre 5 y 100 caracteres.");
        addressInput.value = "";
        addressInput.focus();
        return false;
    }
    if (/^\d+$/.test(address)) {
        alert("Dirección inválida. Ingresá calle + número (no solo números).");
        addressInput.value = "";
        addressInput.focus();
        return false;
    }

    if (!/[A-Za-z0-9]/.test(address)) {
        alert("Dirección inválida. Ingresá caracteres alfanuméricos.");
        addressInput.value = "";
        addressInput.focus();
        return false;
    }

    return true;
};

/**
 * Maneja el submit del formulario de checkout: valida, procesa la "compra", limpia carrito y resetea el formulario.
 * @method handleCartSubmit
 * @param {Event} e - Evento submit del formulario
 * @return {void}
 */
const handleCartSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert("No hay productos en el carrito.");
        cartForm.style.display = "none";
        cartProductsContainerEl.style.display = "flex";
        return;
    }

    if (!validateCheckoutForm()) return;

    alert("Compra realizada con éxito. ¡Gracias por tu pedido!");

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    renderCartCounter();

    cartForm.reset();

    productTotalEl.textContent = `Productos: $0`;
    taxesEl.textContent = `Impuestos (5%): $0`;
    grandTotalEl.textContent = `Total: $0`;

    cartForm.style.display = "none";
    cartProductsContainerEl.style.display = "flex";

    toggleCart(false);
}

cartForm.addEventListener("submit", handleCartSubmit);

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "confirm-products") {
        if (cart.length === 0) return;
        showCheckoutForm();
    }
});

headerCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    showCart = !showCart;
    toggleCart(true);
});

cartContainer.addEventListener("click", (e) => {
    if (e.target === cartContainer) {
        showCart = false;
        toggleCart(false);
    }
});

document.getElementById("order-now").addEventListener("click", () => {
    document.querySelector(".menu-container").scrollIntoView({behavior: "smooth"});
});

closeCartButton.addEventListener("click", () => {
    toggleCart(false);
});

/**
 * Inicializa la UI renderizando pizzas y el contador del carrito.
 * @method render
 * @return {void}
 */
const render = () => {
    renderPizzas();
    renderCartCounter();
};

render();
