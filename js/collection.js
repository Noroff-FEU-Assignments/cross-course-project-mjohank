/* const productsContainer = document.querySelector(".collection-cards-container");

function displayCollection() {
  productList.forEach((product) => {
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

displayCollection(); */

import { errorMessage } from "./components/errorMessage.js";

const productsContainer = document.querySelector(".collection-cards-container");
const loaderContainer = document.querySelector(".loader-container");

const productsUrl =
  "https://cors.noroff.dev/https://rainydays.mjohank.no/wp-json/wc/store/products?per_page=15";

async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const resultList = await response.json();
    console.log(resultList);

    productsContainer.innerHTML = "";
    loaderContainer.innerHTML = "";

    displayCollection(resultList);
  } catch (error) {
    loaderContainer.innerHTML = "";
    productsContainer.innerHTML = errorMessage(
      "An error ocurred while trying to fetch the products from the API"
    );
  }
}
fetchProducts();

function displayCollection(products) {
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="product-card">
          <a href="/product-details.html?id=${product.id}" class="card-link">
            <img
              src="${product.images[0].src}"
              alt="${product.alt}"
              class="card-img"
            />
            <div class="card-text-container">
              <p class="jacket-name">${product.name}</p>
              <p class="price">NOK ${product.prices.price}</p>
            </div>
          </a>
        </div>`;
  });
}
