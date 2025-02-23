//import navbar
import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();
// import footer
import { footer } from "../components/footer/footer.js";
document.querySelector(".footer-div").innerHTML = footer();
let boxData = JSON.parse(localStorage.getItem("product-details"));

// PAGELINKING_
document.querySelector("#navbar-kfc-logo").onclick = () => {
  location.href = "../index.html";
};
document.querySelector("#navbar-menu").onclick = () => {
  location.href = "../pages/menu.html";
};
// document.querySelector("#navbar-deals").onclick = () => {
//   location.href = "../pages/deals.html";
// };
// document.querySelector("#navbar-about").onclick = () => {
//   location.href = "../pages/about.html";
// };
document.querySelector("#navbar-man-icon").onclick = () => {
  location.href = "../pages/signup.html";
};
document.querySelector("#navbar-account").onclick = () => {
  location.href = "../pages/profile.html";
};
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "../pages/cart.html";
};
document.querySelector(".cart-count").onclick = () => {
  location.href = "../pages/cart.html";
};

// preload
var loader;

function loadNow(opacity) {
  if (opacity <= 0) {
    displayContent();
  } else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      loadNow(opacity - 0.05);
    }, 100);
  }
}

function displayContent() {
  loader.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  loader = document.getElementById("loader");
  loadNow(1);
});

// side dish container
let sideArr = [
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndFries",
    name: "Secret Recipe Fries",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndMashGravy",
    name: "Mashed Potatoes & Gravy",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndMacCheese",
    name: "Mac & Cheese",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndColeslaw",
    name: "Cole Slaw",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndGreenBeans",
    name: "Green Beans",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndGravy",
    name: "Gravy",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndCorn",
    name: "Whole Kernel Corn",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-IndMash",
    name: "Mashed Potatoes (No Gravy)",
  },
];





displaySide(sideArr);

function displaySide(sideArr) {
  let side1Container = document.querySelector(".side-dish-1");
  side1Container.innerHTML = "";

  sideArr.forEach((e) => {  
    let card = document.createElement("div");
    card.setAttribute("class", "side-dish-card");
    let itemImg = document.createElement("img");
    itemImg.classList.add("side-dish-img");
    itemImg.setAttribute("src", e.image);
    let itemName = document.createElement("p");
    itemName.textContent = e.name;
    let checkBox = document.createElement("div");
    checkBox.setAttribute("class", "check-box");

    card.append(itemImg, itemName, checkBox);
    side1Container.append(card);

    // functionlities

    card.onclick = function () {
      showSideName(e);
      showConfirmIcon(checkBox);
    };
  });
}

function showSideName(e) {
  let sideItemArea = document.querySelector(".side-item");
  sideItemArea.textContent = `Side: ${e.name}`;
}

function showConfirmIcon(checkBox) {
  let allCheckBoxes = document.querySelectorAll(".check-box");

  allCheckBoxes.forEach((e) => {
    e.innerHTML = "";
  });
  checkBox.innerHTML +=
    '<i class="check-icon fa-sharp fa-solid fa-circle-check"></i>';
}

// beverage arr

let beverageArr = [
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-Pepsi",
    name: "Pepsi",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-dietPepsi",
    name: "Diet Pepsi",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-mtndew",
    name: "Mountain Dew",
  },
  {
    image:
      "https://digitaleat.kfc.com/menus/image/bare/kfc-mtndewsweetlightning",
    name: "Mountain Dew Sweet Lightning",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-sierramist",
    name: "Sierra Mist",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-LemMed",
    name: "Colonel Lemondade",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-drPepper",
    name: "Dr. Pepper",
  },
  {
    image: "https://digitaleat.kfc.com/menus/image/bare/kfc-sweetTea",
    name: "Sweat Tea",
  },
];

displayBeverage(beverageArr);

function displayBeverage(beverageArr) {
  let side1Container = document.querySelector(".beverage-container");
  side1Container.innerHTML = "";

  beverageArr.forEach((e) => {
    let card = document.createElement("div");
    card.setAttribute("class", "beverage-card");
    let itemImg = document.createElement("img");
    itemImg.classList.add("beverage-card-img");
    itemImg.setAttribute("src", e.image);
    let itemName = document.createElement("p");
    itemName.textContent = e.name;

    let checkBox = document.createElement("div");
    checkBox.setAttribute("class", "bev-check-box");

    card.append(itemImg, itemName, checkBox);
    side1Container.append(card);

    // functionlities
    card.onclick = function () {
      showBeverageName(e);
      showTick(checkBox);
    };
  });
}

function showTick(checkBox) {
  let allCheckBoxes = document.querySelectorAll(".bev-check-box");
  allCheckBoxes.forEach((e) => {
    e.innerHTML = "";
  });
  checkBox.innerHTML +=
    '<i class="check-icon fa-sharp fa-solid fa-circle-check"></i>';
}

function showBeverageName(e) {
  let bevArea = document.querySelector(".beverage-item");
  bevArea.innerHTML = `Beverage: ${e.name}`;
}

// qty count
let qtyCount = 1;
let qtyCountArea = document.querySelector(".qty-count");
qtyCountArea.innerHTML = qtyCount;

let qtyIncrementBtn = document.querySelector(".qty-increment");
qtyIncrementBtn.onclick = function () {
  qtyCountArea.innerHTML = ++qtyCount;

  let fixedPrice = boxData[0].price;
  fixedPrice =Number(fixedPrice.substring(1, fixedPrice.length));

  let currentPrice = document.querySelector(".box-price");
  currentPrice.innerHTML = "Price: ₹ "+(qtyCount * fixedPrice).toFixed(2);
  

};

let qtyDecrementBtn = document.querySelector(".qty-decrement");
qtyDecrementBtn.onclick = function () {
  if (qtyCount > 1) {
    qtyCountArea.innerHTML = --qtyCount;

    let fixedPrice = boxData[0].price;
    fixedPrice =Number(fixedPrice.substring(1, fixedPrice.length));
  
    let currentPrice = document.querySelector(".box-price");
    currentPrice.innerHTML = "Price: ₹ "+(qtyCount * fixedPrice).toFixed(2);
  }
};

let deliveryContainer = document.querySelector(".delivery-options-container");

let buyBtn = document.querySelector(".buy-btn");
buyBtn.onclick = function () {
  deliveryContainer.classList.add("display-block");
};

let closeDivBtn = document.querySelector(".close-delivery-btn");
closeDivBtn.onclick = function () {
  deliveryContainer.classList.remove("display-block");
};

// redirect to address page
let quickPick = document.querySelector(".quick-pick-btn");
quickPick.onclick = function () {
  window.location.href = "../pages/address-page.html";
};

let deliveryPick = document.querySelector(".delivery-btn");
deliveryPick.onclick = function () {
  window.location.href = "../pages/address-page.html";
};

// stop the fixed box
let fixedBox = document.querySelector(".product-data-box");
let footerArea = document.querySelector(".footer-div");

window.addEventListener("scroll", () => {
  let footerReact = footerArea.getBoundingClientRect();
  let fixedBoxReact = fixedBox.getBoundingClientRect();
  console.log(
    "footer bottom",
    footerReact.bottom,
    "box top",
    fixedBoxReact.top
  );

  console.log(fixedBoxReact.bottom > footerReact.top);
  if (fixedBoxReact.bottom > footerReact.top + 10) {
    fixedBox.style.position = "absolute";
    fixedBox.style.bottom = `${footerReact.height}px`;
  } else {
    fixedBox.style.position = "fixed";
    fixedBox.style.bottom = "initial";
  }
});

// navbar linking
let navKfcLogo = document.querySelector("#navbar-kfc-logo");
navKfcLogo.onclick = function () {
  window.location.href = "../index.html";
};

let navbarMenu = document.querySelector("#navbar-menu");
navbarMenu.onclick = function () {
  window.location.href = "../pages/menu.html";
};

let mainIcon = document.querySelector("#navbar-man-icon");

mainIcon.onclick = function  (){
  window.location.href = "../pages/signup.html"
}
document.querySelector("#navbar-account").onclick = () => {
  location.href = "../pages/profile.html";
};
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "../pages/cart.html";
};

//cart total
let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
function totalCartAmount() {
  let cartTotalArea = document.querySelector("#navbar-price");
  let totalCart;
  totalCart = cartData.reduce((acc, curr) => {
    let price = Number(curr.price.substring(1, curr.price.length));
    return (acc += price);
  }, 0);

  totalCart = totalCart.toFixed(2);
  console.log(totalCart);
  cartTotalArea.innerHTML = "₹" + totalCart;
  document.querySelector(".cart-count").innerHTML = cartData.length;
}

totalCartAmount();





// product data box dynamic 
let boxTitle = document.querySelector(".box-title");

boxTitle.innerHTML = boxData[0].title;
let boxDes = document.querySelector(".des");
boxDes.innerHTML = boxData[0].description;

let boxPrice = document.querySelector(".box-price");
boxPrice.textContent =`Price: ${boxData[0].price}`;


//qty
