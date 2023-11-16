import { errorMessage } from "./components/errorMessage.js";

const productsContainer = document.querySelector(".collection-cards-container");
const loaderContainer = document.querySelector(".loader-container");
const sortingSelect = document.getElementById("collection-sorting");
const filterSelect = document.getElementById("collection-filter");
let productsData = []; // Array to store the fetched products (for sorting)

const productsUrl =
  "https://cors.noroff.dev/https://rainydays.mjohank.no/wp-json/wc/store/products?per_page=15";

// FETCHING THE PRODUCT LIST FROM THE API

async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const resultList = await response.json();

    productsData = resultList; // Updating the products array
    // console.log(productsData);

    displayCollection();
  } catch (error) {
    loaderContainer.innerHTML = "";
    productsContainer.innerHTML = errorMessage(
      "An error occurred while trying to fetch the products from the API"
    );
  }
}

// CREATING THE HTML TO DISPLAY THE PRODUCTS ON THE COLLECTION PAGE

function displayCollection(products = productsData) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
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

// ADDING SORTING FUNCTIONALITY

sortingSelect.addEventListener("change", function () {
  const selectedSorting = sortingSelect.value;
  sortProducts(selectedSorting);
  displayCollection();
});

function sortProducts(sorting) {
  let arrayToSort = [...productsData];

  switch (sorting) {
    case "low-to-high":
      arrayToSort.sort((a, b) => a.prices.price - b.prices.price);
      break;
    case "high-to-low":
      arrayToSort.sort((a, b) => b.prices.price - a.prices.price);
      break;
    case "a-to-z":
      arrayToSort.sort((a, b) => (a.name > b.name ? 1 : -1));
      break;
    case "z-to-a":
      arrayToSort.sort((a, b) => (b.name > a.name ? 1 : -1));
      break;
  }
  productsData = arrayToSort;
}

// ADDING FILTER FUNCTIONALITY

filterSelect.addEventListener("change", function () {
  const selectedCategory = filterSelect.value;
  filterProducts(selectedCategory);
});

function filterProducts(category) {
  let filteredProducts = [];

  if (category === "all") {
    filteredProducts = [...productsData];
  } else {
    filteredProducts = productsData.filter((product) =>
      product.categories.some((cat) => cat.slug === category)
    );
  }
  displayCollection(filteredProducts);
}

fetchProducts();
