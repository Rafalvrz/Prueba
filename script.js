
/* =========================
   Product data
========================= */

const products = [
  {
    category: "Tenis",
    name: "Tenis deportivos",
    description: "Colección de tenis deportivos.",

    models: [
      {
        name: "Blanco",
        image: "./img/tenis1.png"
      },
      {
        name: "Negro",
        image: "./img/tenis2.jpg"
      },
      {
        name: "Azul",
        image: "./img/tenis3.jpg"
      }
    ]
  },

  {
    category: "Ropa",
    name: "Playeras",
    description: "Colección de playeras.",

    models: [
      {
        name: "Playera blanca",
        image: "./img/ropa3.jpg"
      },
      {
        name: "Playera negra",
        image: "./img/ropa1.jpg"
      },
      {
        name: "Playera azul",
        image: "./img/ropa2.jpg"
      }
    ]
  },

  {
    category: "Accesorios",
    name: "Mochilas",
    description: "Colección de mochilas.",

    models: [
      {
        name: "Mochila negra",
        image: "./img/backpack1.jpg"
      },
      {
        name: "Mochila azul",
        image: "./img/backpack2.jpg"
      },
      {
        name: "Mochila roja",
        image: "./img/backpack3.jpg"
      }
    ]
  }
];


/* =========================
   DOM elements
========================= */

const categoriesElement =
  document.getElementById("categories");

const productsContainer =
  document.getElementById("productsContainer");


/* =========================
   Render categories
========================= */

function renderCategories() {
  const categories = [
    "Todos",
    ...new Set(products.map(product => product.category))
  ];

  categoriesElement.innerHTML = categories
    .map((category, index) => `
      <button
        type="button"
        class="${index === 0 ? "active" : ""}"
        data-category="${category}"
        aria-pressed="${index === 0}"
      >
        ${category}
      </button>
    `)
    .join("");

  categoriesElement.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) return;

    // Update the active category.
    categoriesElement
      .querySelectorAll("button")
      .forEach(item => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", isActive);
      });

    const selectedCategory = button.dataset.category;

    // "Todos" displays every product.
    const filteredProducts =
      selectedCategory === "Todos"
        ? products
        : products.filter(
            product => product.category === selectedCategory
          );

    renderProducts(filteredProducts);
  });
}


/* =========================
   Render products
========================= */

function renderProducts(productsToShow) {
  productsContainer.innerHTML = productsToShow
    .map((product, productIndex) => `
      <section class="product-section">

        <img
          class="main-image"
          id="main-image-${productIndex}"
          src="${product.models[0].image}"
          alt="${product.name}: ${product.models[0].name}"
        >

        <div class="product-info">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
        </div>

        <section class="models">
          <h3>Modelos disponibles</h3>

          <div class="carousel-container">

            <button
              type="button"
              class="arrow"
              data-direction="-1"
              data-carousel="${productIndex}"
              aria-label="Modelos anteriores de ${product.name}"
            >
              &#8249;
            </button>

            <div
              class="carousel"
              id="carousel-${productIndex}"
            >
              ${product.models
                .map((model, modelIndex) => `
                  <button
                    type="button"
                    class="thumbnail ${
                      modelIndex === 0 ? "active" : ""
                    }"
                    data-product="${productIndex}"
                    data-model="${modelIndex}"
                    aria-label="Seleccionar ${model.name}"
                    aria-pressed="${modelIndex === 0}"
                  >
                    <img
                      src="${model.image}"
                      alt="${model.name}"
                      loading="lazy"
                    >

                    <span>${model.name}</span>
                  </button>
                `)
                .join("")}
            </div>

            <button
              type="button"
              class="arrow"
              data-direction="1"
              data-carousel="${productIndex}"
              aria-label="Modelos siguientes de ${product.name}"
            >
              &#8250;
            </button>

          </div>
        </section>

      </section>
    `)
    .join("");

  attachModelEvents(productsToShow);
  attachCarouselEvents();
}


/* =========================
   Select a model
========================= */

function attachModelEvents(productsToShow) {
  productsContainer
    .querySelectorAll(".thumbnail")
    .forEach(button => {
      button.addEventListener("click", () => {
        const productIndex =
          Number(button.dataset.product);

        const modelIndex =
          Number(button.dataset.model);

        const product = productsToShow[productIndex];
        const model = product.models[modelIndex];

        const mainImage = document.getElementById(
          `main-image-${productIndex}`
        );

        const carousel = document.getElementById(
          `carousel-${productIndex}`
        );

        // Update the main image.
        mainImage.src = model.image;
        mainImage.alt = `${product.name}: ${model.name}`;

        // Update the selected thumbnail.
        carousel
          .querySelectorAll(".thumbnail")
          .forEach((thumbnail, index) => {
            const isSelected = index === modelIndex;

            thumbnail.classList.toggle("active", isSelected);

            thumbnail.setAttribute(
              "aria-pressed",
              isSelected
            );
          });
      });
    });
}


/* =========================
   Carousel navigation
========================= */

function attachCarouselEvents() {
  productsContainer
    .querySelectorAll(".arrow")
    .forEach(button => {
      button.addEventListener("click", () => {
        const productIndex =
          Number(button.dataset.carousel);

        const direction =
          Number(button.dataset.direction);

        const carousel = document.getElementById(
          `carousel-${productIndex}`
        );

        carousel.scrollBy({
          left: direction * 250,
          behavior: "smooth"
        });
      });
    });
}


/* =========================
   Initialize catalog
========================= */

renderCategories();
renderProducts(products);   