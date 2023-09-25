const productsContainer = document.querySelector(".collection-cards-container");

function displayProducts() {
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="product-card" onclick="redirectToProductPage('${product.name}')">
          <a href="../products/Hemsedal.html" class="card-link">
            <img
              src="${product.img}"
              alt="${product.alt}"
              class="card-img"
            />
            <div class="card-text-container">
              <p class="jacket-name">${product.name}</p>
              <p class="price">NOK ${product.price}</p>
            </div>
          </a>
        </div>`;
  });
}

displayProducts();
