// import navbar
import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();

// import footer
import { footer } from "../components/footer/footer.js";
document.querySelector(".footer-div").innerHTML = footer();

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
document.querySelector(".checkout-btn").onclick = () => {
  location.href = "../pages/address-page.html";
};
document.querySelector(".cart-count").onclick = () => {
  location.href = "../pages/cart.html";
};

// quantity change
let qtyCount = 1;
let qtyCountAreas = document.querySelectorAll(".qty-count");
let qtyIncrementBtns = document.querySelectorAll(".qty-increment");

for (let i = 0; i < qtyIncrementBtns.length; i++) {
  qtyIncrementBtns[i].onclick = function () {
    qtyCount = qtyCountAreas[i].innerHTML;
    qtyCountAreas[i].innerHTML = ++qtyCount;
  };
}

let qtyDecrementBtns = document.querySelectorAll(".qty-decrement");

for (let i = 0; i < qtyDecrementBtns.length; i++) {
  qtyDecrementBtns[i].onclick = function () {
    qtyCount = qtyCountAreas[i].innerHTML;
    if (qtyCount > 1) {
      qtyCountAreas[i].innerHTML = --qtyCount;
    }
  };
}

let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];

function displayCartData(cartData) {
  let cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  cartData.forEach((elem, idx) => {
    let card = document.createElement("div");
    card.setAttribute("class", "cart-item");
    let itemImg = document.createElement("img");
    itemImg.src = elem.Image;
    itemImg.onclick = () => {
      addToDetails(elem);
    };

    let rightSideDiv = document.createElement("div");
    rightSideDiv.setAttribute("class", "right-side");

    let titleDiv = document.createElement("div");
    let title = document.createElement("h3");
    title.textContent = elem.title;
    let desc = document.createElement("p");
    desc.setAttribute("class", "item-des");
    desc.textContent = elem.description;

    titleDiv.append(title, desc);

    let priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "price-div");

    if (elem.price == NaN) {
      elem.price = `₹370 .00`;
    }
    priceDiv.textContent = elem.price;

    let qtyDiv = document.createElement("div");
    qtyDiv.setAttribute("class", "qty-div");

    let spanInc = document.createElement("span");
    spanInc.innerHTML = `<span class="material-symbols-outlined qty-increment">
        add_circle
      </span>`;

    let spanQty = document.createElement("span");
    spanQty.innerHTML = elem.qty;
    spanQty.setAttribute("class", "qty-count");

    let spanDec = document.createElement("span");
    spanDec.innerHTML =
      ' <i id="circle-min" class="fa fa-circle-minus qty-decrement"></i>';

    spanInc.onclick = function () {
      //change price;
      let price = elem.price;
      price = Number(price.substring(1, price.length));

      let currentQty = elem.qty;
      spanQty.innerHTML = ++currentQty;
      currentQty = Number(currentQty);

      //change price total for particular Item_;
      //   totalCartAmount(price, "+");
      let pd1 = price * currentQty;
      priceDiv.textContent = "₹" + pd1.toFixed(2);
      qtyplus(elem);
      totalCartAmount();
      changeAll();
    };

    spanDec.onclick = function () {
      //change price;
      let price = elem.price;
      price = Number(price.substring(1, price.length));
      let currentQty = elem.qty;
      if (currentQty > 1) {
        spanQty.innerHTML = --currentQty;
      }
      currentQty = Number(currentQty);

      //change price total for particular Item_;
      //   totalCartAmount(price, "-");
      let pd2 = price * currentQty;
      priceDiv.textContent = "₹" + pd2.toFixed(2);
      qtymin(elem);
      totalCartAmount();
      changeAll();
    };

    qtyDiv.append(spanInc, spanQty, spanDec);

    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = `Remove`;

    removeBtn.onclick = function () {
      removeItem(idx);
    };

    rightSideDiv.append(titleDiv, priceDiv, qtyDiv, removeBtn);
    card.append(itemImg, rightSideDiv);

    cartContainer.append(card);
  });
}

displayCartData(cartData);

//navbar linking
let navMenu = document.querySelector("#navbar-menu");
navMenu.onclick = function () {
  window.location.href = "../pages/menu.html";
};

let kfcLogo = document.querySelector("#navbar-kfc-logo");
kfcLogo.onclick = function () {
  window.location.href = "../index.html";
};

// remove item
function removeItem(idx) {
  cartData.splice(idx, 1);
  displayCartData(cartData);
  localStorage.setItem("cart-data", JSON.stringify(cartData));
  totalCartAmount();
  cartCount();
  checkCart();
}

//cart total
totalCartAmount();

function totalCartAmount() {
  let cartTotalArea = document.querySelector("#navbar-price");
  let totalCart = cartData.reduce((acc, curr) => {
    let price = Number(curr.price.substring(1, curr.price.length));
    return (acc += price * curr.qty);
  }, 0);

  //   if (plusMin == "-") {
  //     console.log(plusMin + currPrice);
  //     totalCart = totalCart - currPrice;
  //   } else if (plusMin == "+") {
  //     console.log(plusMin + currPrice);
  //     totalCart = totalCart + currPrice;
  //   }

  totalCart = totalCart.toFixed(2);
  console.log(totalCart);
  cartTotalArea.innerHTML = "₹" + totalCart;
  return Number(totalCart);
}

// DEB Functionalities -------------------------------------------------------------------------------------------------------------------->
// Empty Cart Display Functionality -
checkCart();
function checkCart() {
  if (cartData.length === 0) {
    cartCount();
    let container = document.querySelector(".cart-container");
    container.innerHTML = `<h1>Cart is Empty. Add products to cart !</h1>`;
  } else {
    cartCount();
    displayCartData(cartData);
    totalCartAmount();
  }
}

// Cart Count Functionality -
cartCount();
function cartCount() {
  let cart_count = document.querySelector(".cart-count");
  cart_count.textContent = cartData.length;
}

// Quantity Increament functionality -
function qtyplus(e) {
  e.qty++;
  localStorage.setItem("cart-data", JSON.stringify(cartData));
}

// Quantity Decreament functionality -
function qtymin(e) {
  if (e.qty > 1) {
    e.qty--;
  }
  localStorage.setItem("cart-data", JSON.stringify(cartData));
}

function totalWithGST() {
  let val = Number(document.getElementById("gst-div-percent").innerText);
  let total = totalCartAmount();
  let finaltotal = total + total * (val / 100);
  return finaltotal.toFixed(2);
}

changeAll();
function changeAll() {
  document.getElementById("item-count-num").innerHTML = cartData.length;
  document.getElementById("gst-div-total").innerHTML = totalCartAmount();
  document.getElementById("gst-div-subtotal").innerHTML = totalWithGST();
}

function addToDetails(ele) {
  let prd_Details = [];
  prd_Details.push(ele);
  localStorage.setItem("product-details", JSON.stringify(prd_Details));
  location.href = "details-page.html";
}

document.querySelector("#btn-coupon").addEventListener("click", display_2);

function display_2() {
  document.querySelector("#btn-coupon-div").style.display = "none";
  document.querySelector("#btn-coupon-apply-div").style.display = "inline";
}

document
  .querySelector("#btn-coupon-apply")
  .addEventListener("click", display_4);
document
  .querySelector("#btn-coupon-try")
  .addEventListener("click", display_4_again);

function display_4_again() {
  document.querySelector("#btn-coupon-try-div").style.display = "none";
  document.querySelector("#btn-coupon-apply-div").style.display = "inline";
}

function display_4() {
  let val = document.querySelector(
    "#btn-coupon-apply-div > #get-coupon-value"
  ).value;

  // console.log(val);
  let promocode = val;
  if (promocode == "masai30") {
    let total = cartData.reduce((acc, curr) => {
      let price = Number(curr.price.substring(1, curr.price.length));
      return (acc += price * curr.qty);
    }, 0);

    let discount = total - total * 0.3;
    document.querySelector("#gst-div-discount").textContent = 30;
    document.querySelector("#navbar-price").textContent = discount.toFixed(2);
    document.querySelector("#gst-div-subtotal").textContent =
      Math.floor(discount);

    document.querySelector("#btn-coupon-apply-div").style.display = "none";
    document.querySelector("#success-coupon").style.display = "inline";
  } else {
    document.querySelector("#btn-coupon-apply-div").style.display = "none";
    document.querySelector("#btn-coupon-try-div").style.display = "inline";
  }
}

// Discount Functionality -
// document.querySelector("#btn-coupon").addEventListener("click", display_2);
// function checkPromo(promocode) {
//   if (promocode == "masai30") {
//     var total = cart.reduce((acc, curr) => {
//       return (acc + curr.price) * curr.qty;
//     }, 0);

//     discount = total - total * 0.3;
//     document.querySelector("#subtotal-price").textContent =
//       "₹" + Math.floor(discount);
//     return true;
//   } else {
//     return false;
//   }
// }
