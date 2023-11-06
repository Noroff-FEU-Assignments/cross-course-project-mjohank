import { errorMessage } from "./components/errorMessage.js";

const productInfo = document.querySelector(".product-info");
const pageTitle = document.querySelector("title");
const currentCrumb = document.querySelector(".current-crumb");
const loaderContainer = document.querySelector(".loader-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const detailsURL =
  "https://cors.noroff.dev/https://rainydays.mjohank.no/wp-json/wc/store/products/" +
  id;

// console.log(detailsURL);

async function displayDetails() {
  try {
    const response = await fetch(detailsURL);
    const json = await response.json();
    console.log(json);

    loaderContainer.innerHTML = "";
    pageTitle.innerHTML = `${json.name} | Rainydays`;
    currentCrumb.innerHTML = `${json.name}`;

    productInfo.innerHTML = `
  <div class="product-image-and-text">
          <img src="${json.images[0].src}" alt="${json.images[0].alt}" class="product-img" id="product-img" />
          <p class="product-text">${json.description}</p>
        </div>

        <div class="product-details">
          <div class="detail-text">
            <h1 class="primary-heading" id="product-name">${json.name}</h1>
            <p class="product-price text" id="product-price">NOK ${json.prices.price}</p>
          </div>

          <a href="#" class="addToCart-btn">Add to cart</a>

          <a href="../cart.html" class="viewCart-btn">View cart</a>
        </div>`;
  } catch (error) {
    console.log(error);
    loaderContainer.innerHTML = "";
    productInfo.innerHTML = errorMessage(
      "An error ocurred while trying to fetch the product from the API"
    );
  }
}

displayDetails();
