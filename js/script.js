import { errorMessage } from "./components/errorMessage.js";

const featuredProductsContainer = document.querySelector(
  ".most-popular-cards-container"
);
const featuredURL =
  "https://cors.noroff.dev/https://rainydays.mjohank.no/wp-json/wc/store/products?featured=true&per_page=3";

async function fetchFeatured() {
  try {
    const response = await fetch(featuredURL);
    const featuredJSON = await response.json();

    displayFeatured(featuredJSON);
  } catch (error) {
    featuredProductsContainer.innerHTML = errorMessage(
      "An error ocurred while trying to fetch the products from the API",
      error
    );
  }
}

fetchFeatured();

function displayFeatured(featuredProducts) {
  featuredProducts.forEach((featuredProduct) => {
    featuredProductsContainer.innerHTML += `
    <div class="product-card">
            <a href="/product-details.html?id=${featuredProduct.id}" class="card-link">
              <img
                src="${featuredProduct.images[0].src}"
                alt="${featuredProduct.alt}"
                class="card-img"
              />
              <div class="card-text-container">
                <p class="jacket-name">${featuredProduct.name}</p>
                <p class="price">NOK ${featuredProduct.prices.price}</p>
              </div>
            </a>
          </div>
    `;
  });
}
