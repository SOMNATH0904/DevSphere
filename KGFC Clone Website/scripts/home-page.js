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

//navbar and footer import

import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();

import { footer } from "../components/footer/footer.js";
document.querySelector(".footer-div").innerHTML = footer();

// navbar linking
document.querySelector("#navbar-kfc-logo").onclick = () => {
  location.href = "./index.html";
};
document.querySelector("#navbar-menu").onclick = () => {
  location.href = "./pages/menu.html";
};
// document.querySelector("#navbar-deals").onclick = () => {
//   location.href = "./pages/deals.html";
// };
// document.querySelector("#navbar-about").onclick = () => {
//   location.href = "./pages/about.html";
// };
document.querySelector("#navbar-man-icon").onclick = () => {
  location.href = "./pages/signup.html";
};
document.querySelector("#navbar-account").onclick = () => {
  location.href = "./pages/signup.html";
};
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "./pages/cart.html";
};
document.querySelector(".cart-count").onclick = () => {
  location.href = "./pages/cart.html";
};

// Image Slider

var img = document.querySelector(".img");

var slides = [
  "https://images.ctfassets.net/wtodlh47qxpt/4wzmNLWjqVZZl95Fcf48r2/90bd1294b970f903545d8f0f5278b28a/Allu_Arjun_Combo_Meal__1440x396px.jpg?w=1366&fit=fill&fm=webp",
  "https://images.ctfassets.net/wtodlh47qxpt/4gztBB8yAvtp6jV7JAuLD/093fddbb77a78a44a4d3d5e066c592de/KFC_Peri_Peri_Banner__1440x396px.jpg?w=1366&fit=fill&fm=webp",
  "https://images.ctfassets.net/wtodlh47qxpt/500GRYvL6xfLzNRY68rr4u/c66030e22aa477594939c55281fc00fd/variety_bucket_banner_1440x396px.jpg?w=1366&fit=fill&fm=webp",
  "https://images.ctfassets.net/wtodlh47qxpt/2cKs5e17FbKIE7Dza5ZlNM/e7163ee02d91d59d81a20ecf606f707b/Biryani_Banner_1440x396px.jpg?w=1366&fit=fill&fm=webp",
  "https://images.ctfassets.net/wtodlh47qxpt/4qo6xWTWQmjg8ycSRETMU5/649a454a732e77c4cc534524e48bd800/Box_Meals_App_Banner__1440x396px.jpg?w=1366&fit=fill&fm=webp",
];

var Start = 0;

function slider() {
  if (Start < slides.length) {
    Start = Start + 1;
  } else {
    Start = 1;
  }
  img.innerHTML = "<img src=" + slides[Start - 1] + ">";
}
setInterval(slider, 1500);

// Categories Section

var catgData = [
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT208.jpg?ver=25.08",
    title: "EXCLUSIVE DEAL",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT86.jpg?ver=25.08",
    title: "CHICKEN BUCKETS",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT200.jpg?ver=25.08",
    title: "NEW LAUNCH",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT190.jpg?ver=25.08",
    title: "BIRIYANI BUCKETS",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT158.jpg?ver=25.08",
    title: "BOX MEAL",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT99.jpg?ver=25.08",
    title: "BURGERS",
  },
  {
    img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT89.jpg?ver=25.08",
    title: "SNACKS",
  },
  {
    img: "https://online.kfc.co.in/static/media/finger_lickin.fc21c805.svg",
    title: "View All Menu →",
  },
];

displayCatg();
function displayCatg() {
  var catg = document.querySelector(".disp-catg");
  catgData.map((ele) => {
    let div = document.createElement("div");
    div.onclick = function () {
      location.href = "./pages/menu.html";
    };
    let img = document.createElement("img");
    img.src = ele.img;
    let h3 = document.createElement("h3");
    h3.textContent = ele.title;
    div.append(img, h3);
    catg.append(div);
  });
}

// delivery options
let deliveryContainer = document.querySelector(".delivery-options-container");

let buyBtn = document.querySelector(".start-order-btn");
buyBtn.onclick = function () {
  deliveryContainer.classList.add("display-block");
};

let closeDivBtn = document.querySelector(".close-delivery-btn");
closeDivBtn.onclick = function () {
  deliveryContainer.classList.remove("display-block");
};

let qucikPickBtn = document.querySelector(".quick-pick-btn");
qucikPickBtn.onclick = function () {
  window.location.href = "../pages/address-page.html";
};
let deliveryBtn = document.querySelector(".delivery-btn");
deliveryBtn.onclick = function () {
  window.location.href = "../pages/address-page.html";
};

// navbar cart
let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];

//cart total
function totalCartAmount() {
  let cartTotalArea = document.querySelector("#navbar-price");
  let totalCart;
  totalCart = cartData.reduce((acc, curr) => {
    let price = Number(curr.price.substring(1, curr.price.length));
    return (acc += price);
  }, 0);

  totalCart = totalCart.toFixed(2);

  cartTotalArea.innerHTML = "₹" + totalCart;
}

totalCartAmount();

setTimeout(cartCount,3000)
function cartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML = cartData.length;
}

// redirection to profile page
let navAccount = document.querySelector(".navbar-account");
// navAccount.onclick = function () {
//   // window.location.href = "../pages/"
// };

let cartBucket = document.querySelector("#navbar-cart-bucket");
cartBucket.onclick = function () {
  window.location.href = "../pages/cart.html";
};


// link 
// let navbarAbout = document.querySelector("#navbar-about");
// navbarAbout.onclick = function (){
//   window.location.href = ""
// }