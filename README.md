# Proyecto 2025 (primera entrega)

##Primera Entrega
## Información del proyecto

- [Descripción del proyecto](#descripción-del-proyecto)
- [Autores](#autores)
- [Enlace al sitio](#enlace-al-sitio)
- [Contenido de la página](#contenido-de-la-página)
- [Tecnologías utilizadas](#tecnologías-utilizadas)

---

## Descripción del proyecto

### Mmmenu

Nuestro proyecto de página web llamado **Mmmenu**, consiste en una página de envios de pizza.

## Autores

| Nombre   | Apellido |
|----------| -------- |
| Luciano  | Barreto  |
| Athina   | Terrera  |

---

## Enlace al sitio

GitHub Pages: https://luchobarreto.github.io/proyecto2025-terrera-barreto/

## Contenido de la página

- **Header:** Nombre de la página, logo, botón hacia carrito y menú.
- **Home:** Página de inicio y catálogo de productos.
- **Carrito:** Información de compra y cliente.
- **Footer:** Información de contacto

---

## Tecnologías utilizadas

| Tecnología       | Descripción                             |
| ---------------- | --------------------------------------- |
| **HTML5**        | Estructura de la página                 |
| **CSS3**         | Estilos y diseño responsivo             |
| **JavaScript**   | Interactividad                          |
| **GitHub Pages** | Publicación del sitio                   |
| **VS Code**      | Editor de desarrollo                    |
| **Figma**        | Desarrollo de mockup (desktop y mobile) |


## Índice
- [Primera entrega (Vanilla)](#primera-entrega-vanilla)
    - [Descripción](#descripción)
    - [Autores](#autores)
    - [Enlace al sitio](#enlace-al-sitio)
    - [Contenido](#contenido)
    - [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Segunda entrega (React + TypeScript)](#segunda-entrega-react--typescript)
    - [Resumen](#resumen)
    - [Stack técnico](#stack-técnico)
    - [Estructura del proyecto](#estructura-del-proyecto)
    - [Funcionalidades principales](#funcionalidades-principales)
    - [Rutas y navegación](#rutas-y-navegación)
    - [Estado, persistencia y datos](#estado-persistencia-y-datos)
    - [Estilos y UI](#estilos-y-ui)
    - [Scripts](#scripts)
    - [Cómo ejecutar](#cómo-ejecutar)
    - [Build y previsualización](#build-y-previsualización)
    - [Notas técnicas](#notas-técnicas)
    - [Cambios destacados entre entregas](#cambios-destacados-entre-entregas)

---

## Primera entrega (Vanilla)

### Descripción
**Mmmenu** es una página web de envíos de pizza (catálogo + carrito + formulario de compra).

### Autores
| Nombre  | Apellido |
|---------|----------|
| Luciano | Barreto  |
| Athina  | Terrera  |

### Enlace al sitio
GitHub Pages: https://luchobarreto.github.io/proyecto2025-terrera-barreto/

### Contenido
- **Header:** Nombre, logo, acceso a carrito y menú.
- **Home:** Catálogo de productos.
- **Carrito:** Selección de productos y datos del cliente.
- **Footer:** Información de contacto.

### Tecnologías utilizadas
| Tecnología       | Descripción                      |
|------------------|----------------------------------|
| **HTML5**        | Estructura de la página          |
| **CSS3**         | Estilos y diseño responsivo      |
| **JavaScript**   | Interactividad                   |
| **GitHub Pages** | Publicación                      |
| **VS Code**      | Editor                           |
| **Figma**        | Mockup (desktop y mobile)        |

---------------------------------------------------------------------------------------------------

## Segunda entrega (React + TypeScript)

### Resumen
Reimplementación de **Mmmenu** como **SPA** con **React + TypeScript**, estado global del carrito con **Zustand** (persistencia en `localStorage`), **React Router** para navegación, **styled-components** para estilos y **historial de compras** persistido en `localStorage`.

### Stack técnico

**Lenguajes**
- TypeScript **5.9**
- JavaScript (ES202x)

**Frameworks / Librerías**
- React **19.1.1**
- React DOM **19.1.1**
- React Router DOM **7.9.4**
- Zustand **5.0.8** (store + `persist`)
- styled-components **6.1.19**
- react-icons **5.5.0**
- react-toastify **11.0.5**

### Estructura del proyecto
/src
-/assets/images            # imágenes de productos y UI
- /components               # UI reusables (Button, Input, ProductCard, Badge, Typography, etc.)
- /layout                   # PageLayout, Header, Footer
- /pages                    # Home, Purchases
- /store                    # useCartStore.ts (Zustand + persist)
- /types                    # product.ts, cart.ts, purchase.ts
- /utils                    # purchasesStorage.ts (historial)
- /data                     # products.json
- App.tsx
main.tsx / index.tsx


### Funcionalidades principales

- **Catálogo**
    - Fuente de datos: `src/data/products.json`.
    - Render con `ProductCard`.
    - Imágenes resueltas con `import.meta.glob` desde `/src/assets/images`.

- **Selector de tamaño**
    - Opciones **S/M/L** por producto.
    - Estado local por card; estilo con prop `isSelected` en styled-components.
    - Precio dinámico según tamaño.

- **Carrito (overlay modal)**
    - Abrir/cerrar desde el **Header**.
    - Acciones: **agregar**, **inc** (sumar), **dec** (restar), **remover** al llegar a 0, **vaciar**.
    - Cálculos en `Cart`: **Subtotal**, **Impuestos 5%**, **Total**.
    - Badge en Header con la **cantidad total** de ítems.

- **Persistencia**
    - Estado global con **Zustand + persist** (key `cart` en `localStorage`).
    - Historial de compras guardado en `localStorage` (key `purchases`).

- **Formulario de compra**
    - Campos: **nombre y apellido**, **dirección**, **método de pago** (efectivo/tarjeta).
    - Validación con mensajes de error.
    - `submit` → guarda compra con `addPurchase`, limpia carrito y cierra overlay.

- **Historial de compras** (`/purchases`)
    - Lectura con `readPurchases`.
    - Grid responsive (1, 2 o 3 columnas según ancho).
    - Muestra items (nombre, tamaño, cantidad, precios) y totales.
    - Si se compra estando en `/purchases`, se **recarga la página** para reflejar el nuevo registro.

- **Navegación**
    - **React Router** con rutas `/` y `/purchases`, usando `Outlet` en `PageLayout`.
    - Botón derecho del Header alterna **“Compras” ↔ “Home”** según `pathname`.

- **Estilos / UI**
    - **styled-components** con variantes por props (ej.: `Button` con `isWhite`, `withBorder`).
    - Tipografías **Inter** y **Poppins**.
    - Diseño responsive en grillas y controles.

