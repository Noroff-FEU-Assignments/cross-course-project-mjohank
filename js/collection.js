import { errorMessage } from "./components/errorMessage.js";

const productsContainer = document.querySelector(".collection-cards-container");
const loaderContainer = document.querySelector(".loader-container");
const sortingSelect = document.getElementById("collection-sorting");
let productsData = []; // Array to store the fetched products (for sorting)

const productsUrl =
  "https://cors.noroff.dev/https://rainydays.mjohank.no/wp-json/wc/store/products?per_page=15";

// FETCHING THE PRODUCT LIST FROM THE API

async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const resultList = await response.json();

    productsData = resultList; // Updating the products array

    displayCollection();
  } catch (error) {
    loaderContainer.innerHTML = "";
    productsContainer.innerHTML = errorMessage(
      "An error occurred while trying to fetch the products from the API"
    );
  }
}

// ADDING SORTING FUNCTIONALITY

sortingSelect.addEventListener("change", function () {
  const selectedSorting = sortingSelect.value;
  sortProducts(selectedSorting);
  displayCollection();
});

function sortProducts(sorting) {
  switch (sorting) {
    case "low-to-high":
      productsData.sort((a, b) => a.prices.price - b.prices.price);
      break;
    case "high-to-low":
      productsData.sort((a, b) => b.prices.price - a.prices.price);
      break;
    case "a-to-z":
      productsData.sort((a, b) => (a.name > b.name ? 1 : -1));
      break;
    case "z-to-a":
      productsData.sort((a, b) => (b.name > a.name ? 1 : -1));
      break;
  }
}

// CREATING THE HTML TO DISPLAY THE PRODUCTS IN THE COLLECTION

function displayCollection() {
  productsContainer.innerHTML = "";

  productsData.forEach((product) => {
    loaderContainer.innerHTML = "";

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

fetchProducts();
