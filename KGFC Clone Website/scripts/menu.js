// --------------ENDPOINTs-------------->
// let query = chizza;
// let url = `https://kfc-menu-api.onrender.com/${query}`;
// /chizza 4x
// /chicken-bucket 11x
// /new-launch 10x
// /biriyani-bucket 10x
// /box-meals 5x
// /burgers 10x
// /snacks 7x
// /beverages 5x
// --------------ENDPOINTs-------------->

// IMPORT_COMPONENTS_
import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();

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
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "../pages/cart.html";
};
document.querySelector(".cart-count").onclick = () => {
  location.href = "../pages/cart.html";
};

// window.onload
window.onload = () => {
  clearAllItems();
  fetch_All_Data();
};

// GLOBAL localStorage_
function clearAllItems() {
  let empty = [];
  localStorage.setItem("all-data", JSON.stringify(empty));
}
function addAllItems(ele) {
  let gd = JSON.parse(localStorage.getItem("all-data")) || [];
  gd.push(ele);
  localStorage.setItem("all-data", JSON.stringify(gd));
}

// Fetch & Display All Menu Data_
async function fetch_All_Data() {
  let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
  document.querySelector("#navbar-price").innerHTML = "₹" + cartTotal(cartData);
  document.querySelector(".cart-count").innerHTML = cartData.length;

  // chizza_
  let url_1 = `https://kfc-menu-api.onrender.com/chizza`;
  let res_1 = await fetch(url_1);
  let jd_1 = await res_1.json();
  let loc_1 = "#CHIZZA > div.card_container";
  display_All(jd_1, loc_1);

  // chicken-bucket_
  let url_2 = `https://kfc-menu-api.onrender.com/chicken-bucket`;
  let res_2 = await fetch(url_2);
  let jd_2 = await res_2.json();
  let loc_2 = "#CHICKEN > div.card_container";
  display_All(jd_2, loc_2);

  // new-launch_
  let url_3 = `https://kfc-menu-api.onrender.com/new-launch`;
  let res_3 = await fetch(url_3);
  let jd_3 = await res_3.json();
  let loc_3 = "#NEW > div.card_container";
  display_All(jd_3, loc_3);

  // biriyani-bucket_
  let url_4 = `https://kfc-menu-api.onrender.com/biriyani-bucket`;
  let res_4 = await fetch(url_4);
  let jd_4 = await res_4.json();
  let loc_4 = "#BIRYANI > div.card_container";
  display_All(jd_4, loc_4);

  // box-meals_
  let url_5 = `https://kfc-menu-api.onrender.com/box-meals`;
  let res_5 = await fetch(url_5);
  let jd_5 = await res_5.json();
  let loc_5 = "#BOX > div.card_container";
  display_All(jd_5, loc_5);

  // burgers_
  let url_6 = `https://kfc-menu-api.onrender.com/burgers`;
  let res_6 = await fetch(url_6);
  let jd_6 = await res_6.json();
  let loc_6 = "#BURGERS > div.card_container";
  display_All(jd_6, loc_6);

  // snacks_
  let url_7 = `https://kfc-menu-api.onrender.com/snacks`;
  let res_7 = await fetch(url_7);
  let jd_7 = await res_7.json();
  let loc_7 = "#SNACKS > div.card_container";
  display_All(jd_7, loc_7);

  // beverages_
  let url_8 = `https://kfc-menu-api.onrender.com/beverages`;
  let res_8 = await fetch(url_8);
  let jd_8 = await res_8.json();
  let loc_8 = "#BEVERAGES > div.card_container";
  display_All(jd_8, loc_8);
}
// Fetch & Display All Menu Data_
function display_All(dataArr, fetchLocation) {
  document.querySelector(fetchLocation).innerHTML = "";

  dataArr.forEach((ele) => {
    ele.qty = 1;
    // Common localStorage for all data_
    addAllItems(ele);

    // CARD_
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    // CARD IMAGE_
    let card_img = document.createElement("div");
    card_img.setAttribute("class", "card_img");
    let img = document.createElement("img");
    ele.Image =
      ele.Image ||
      "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K488.jpg?ver=25.08";
    img.src = ele.Image;
    card_img.onclick = function () {
      addToDetails(ele);
    };

    // CARD DETAILS_
    let card_details = document.createElement("div");
    card_details.setAttribute("class", "card_details");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "card_details_title");
    ele.title = ele.title || "Peri Peri 5 Leg Pc & 2 Dips";
    div1.textContent = ele.title;
    let div2 = document.createElement("div");
    let span1 = document.createElement("span");
    let span1_img = document.createElement("img");
    span1_img.src = `https://online.kfc.co.in/static/media/Non_veg_dot_Icon.d975d1f9.svg`;
    let span2 = document.createElement("span");
    span2.setAttribute("class", "dot");
    let span3 = document.createElement("span");
    span3.textContent = ele.veg;
    let div3 = document.createElement("div");
    let span_price = document.createElement("span");
    span_price.setAttribute("class", "price");
    let check = Number(ele.price.substring(1, ele.price.length));
    if (
      ele.price == "Non veg  Serves 3" ||
      ele.price == "Non veg Serves 2" ||
      ele.price == "old price"
    ) {
      ele.price = `₹370.00`;
    }

    span_price.textContent = ele.price;

    let div4 = document.createElement("div");
    div4.textContent = ele.description;

    // CARD BUTTON_
    let card_btn_div = document.createElement("div");
    card_btn_div.setAttribute("class", "card_btn_div");
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn_addtoCart");
    btn.textContent = "Add To Cart";
    let btn_img = document.createElement("img");
    btn_img.src = `https://online.kfc.co.in/static/media/Icon_Add_to_Cart.58b87a9b.svg`;
    btn.onclick = function () {
      AddToCart(ele);
    };

    // Append-All line by line_
    card_img.append(img);
    span1.append(span1_img);
    div2.append(span1, span2, span3);
    div3.append(span_price);
    card_details.append(div1, div2, div3, div4);
    btn.append(btn_img);
    card_btn_div.append(btn);
    card.append(card_img, card_details, card_btn_div);
    document.querySelector(fetchLocation).append(card);
  });
}

// Menu Items After (SORTED)_
let allSort = document.querySelector("#sortby-price");
allSort.addEventListener("change", fetch_All_Data_Sorted);
async function fetch_All_Data_Sorted() {
  // SORT VALUE_
  let value = document.querySelector("#sortby-price").value;

  // chizza_
  let url_1 = `https://kfc-menu-api.onrender.com/chizza`;
  let res_1 = await fetch(url_1);
  let jd_1 = await res_1.json();
  let loc_1 = "#CHIZZA > div.card_container";
  let arr_1 = sortBy(jd_1, value);
  display_All(arr_1, loc_1);

  // chicken-bucket_
  let url_2 = `https://kfc-menu-api.onrender.com/chicken-bucket`;
  let res_2 = await fetch(url_2);
  let jd_2 = await res_2.json();
  let loc_2 = "#CHICKEN > div.card_container";
  let arr_2 = sortBy(jd_2, value);
  display_All(arr_2, loc_2);

  // new-launch_
  let url_3 = `https://kfc-menu-api.onrender.com/new-launch`;
  let res_3 = await fetch(url_3);
  let jd_3 = await res_3.json();
  let loc_3 = "#NEW > div.card_container";
  let arr_3 = sortBy(jd_3, value);
  display_All(arr_3, loc_3);

  // biriyani-bucket_
  let url_4 = `https://kfc-menu-api.onrender.com/biriyani-bucket`;
  let res_4 = await fetch(url_4);
  let jd_4 = await res_4.json();
  let loc_4 = "#BIRYANI > div.card_container";
  let arr_4 = sortBy(jd_4, value);
  display_All(arr_4, loc_4);

  // box-meals_
  let url_5 = `https://kfc-menu-api.onrender.com/box-meals`;
  let res_5 = await fetch(url_5);
  let jd_5 = await res_5.json();
  let loc_5 = "#BOX > div.card_container";
  let arr_5 = sortBy(jd_5, value);
  display_All(arr_5, loc_5);

  // burgers_
  let url_6 = `https://kfc-menu-api.onrender.com/burgers`;
  let res_6 = await fetch(url_6);
  let jd_6 = await res_6.json();
  let loc_6 = "#BURGERS > div.card_container";
  let arr_6 = sortBy(jd_6, value);
  display_All(arr_6, loc_6);

  // snacks_
  let url_7 = `https://kfc-menu-api.onrender.com/snacks`;
  let res_7 = await fetch(url_7);
  let jd_7 = await res_7.json();
  let loc_7 = "#SNACKS > div.card_container";
  let arr_7 = sortBy(jd_7, value);
  display_All(arr_7, loc_7);

  // beverages_
  let url_8 = `https://kfc-menu-api.onrender.com/beverages`;
  let res_8 = await fetch(url_8);
  let jd_8 = await res_8.json();
  let loc_8 = "#BEVERAGES > div.card_container";
  let arr_8 = sortBy(jd_8, value);
  display_All(arr_8, loc_8);
}

// Utility Functions_1
function AddToCart(ele) {
  let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
  cartData.push(ele);
  localStorage.setItem("cart-data", JSON.stringify(cartData));
  let total = cartTotal(cartData);
  document.querySelector("#navbar-price").innerHTML = "₹" + total;
  document.querySelector(".cart-count").innerHTML = cartData.length;
  alert("Item Added To Cart");
}

function addToDetails(ele) {
  let prd_Details = [];
  prd_Details.push(ele);
  localStorage.setItem("product-details", JSON.stringify(prd_Details));
  location.href = "details-page.html";
}

// Utility Functions_2
function sortBy(arr, value) {
  if (value == "null") {
    return arr;
  }

  if (value == "l2h") {
    let sortedArr = arr.sort(function (a, b) {
      let ap = Number(a.price.substring(1, a.price.length));
      let bp = Number(b.price.substring(1, b.price.length));
      if (ap > bp) return 1;
      if (ap < bp) return -1;
      return 0;
    });

    return sortedArr;
  }

  if (value == "h2l") {
    let sortedArr = arr.sort(function (a, b) {
      let ap = Number(a.price.substring(1, a.price.length));
      let bp = Number(b.price.substring(1, b.price.length));
      if (ap > bp) return -1;
      if (ap < bp) return 1;
      return 0;
    });

    return sortedArr;
  }
}

// Utility Functions_3
document.querySelector("#clear-search").addEventListener("click", clearSearch);
function clearSearch() {
  location.href = "menu.html";
}

// Utility Functions_4

// Utility Functions_5
function cartTotal(dataArr) {
  let total = dataArr.reduce((acc, ele) => {
    let price = Number(ele.price.substring(1, ele.price.length));
    return (acc += price) * ele.qty;
  }, 0);

  return total.toFixed(2);
}

// Utility Functions_6
function filterBy(arr, selected) {
  if (selected == "null") {
    return arr;
  } else {
    if (selected == "veg") {
      var filteredList = [...arr].filter(function (ele) {
        return ele.veg == "Veg  ";
      });

      // console.log(filteredList);
      return filteredList;
    }

    if (selected == "nonveg") {
      var filteredList = [...arr].filter(function (ele) {
        return ele.veg != "Veg  ";
      });

      // console.log(filteredList);
      return filteredList;
    }
  }
}

// Fetch & Display For Searched Data_
document.querySelector("#btn-search").addEventListener("click", onlyQueryData);
function onlyQueryData() {
  let sort = document.querySelector("#sortby-price");
  sort.addEventListener("change", fetch_query_data_with_sort);

  fetch_query_data();
  async function fetch_query_data() {
    let query = document.querySelector("#search-value").value;
    let url = `https://kfc-menu-api.onrender.com/${query}`;
    let res = await fetch(url);
    let jsonData = await res.json();
    display_Query(jsonData, query);
  }

  async function fetch_query_data_with_sort() {
    let value = document.querySelector("#sortby-price").value;
    let query = document.querySelector("#search-value").value;
    let url = `https://kfc-menu-api.onrender.com/${query}`;
    let res = await fetch(url);
    let jsonData = await res.json();
    let jsonData_sorted = sortBy(jsonData, value);
    display_Query(jsonData_sorted, query);
  }
}

function display_Query(dataArr, query) {
  document.querySelector("#clear-search").style.display = "inline-block";

  // SEARCH-HEADING_
  let h3 = document.createElement("h2");
  h3.style.marginBottom = "50px";
  document.querySelector(".query-results").innerHTML = "";
  if (dataArr.length != undefined) {
    h3.innerHTML = `WE FOUND ` + dataArr.length + ` "${query}"`;
  } else {
    h3.innerHTML = `Sorry, Item Not Available!`;
  }

  document.querySelector(".query-results").append(h3);

  // SEARCHED-ITEMS_
  document.querySelector("#query-div").innerHTML = "";
  document.querySelector("#query-div").setAttribute("class", "card_container");

  dataArr.forEach((ele) => {
    // CARD_
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    // CARD IMAGE_
    let card_img = document.createElement("div");
    card_img.setAttribute("class", "card_img");
    let img = document.createElement("img");
    ele.Image =
      ele.Image ||
      "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K488.jpg?ver=25.08";
    img.src = ele.Image;
    card_img.onclick = function () {
      addToDetails(ele);
    };

    // CARD DETAILS_
    let card_details = document.createElement("div");
    card_details.setAttribute("class", "card_details");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "card_details_title");
    div1.textContent = ele.title;
    let div2 = document.createElement("div");
    let span1 = document.createElement("span");
    let span1_img = document.createElement("img");
    span1_img.src = `https://online.kfc.co.in/static/media/Non_veg_dot_Icon.d975d1f9.svg`;
    let span2 = document.createElement("span");
    span2.setAttribute("class", "dot");
    let span3 = document.createElement("span");
    span3.textContent = ele.veg;
    let div3 = document.createElement("div");
    let span_price = document.createElement("span");
    span_price.setAttribute("class", "price");
    span_price.textContent = ele.price;
    let div4 = document.createElement("div");
    div4.textContent = ele.description;

    // CARD BUTTON_
    let card_btn_div = document.createElement("div");
    card_btn_div.setAttribute("class", "card_btn_div");
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn_addtoCart");
    btn.textContent = "Add To Cart";
    let btn_img = document.createElement("img");
    btn_img.src = `https://online.kfc.co.in/static/media/Icon_Add_to_Cart.58b87a9b.svg`;
    btn.onclick = function () {
      AddToCart(ele);
    };

    // Append-All line by line_
    card_img.append(img);
    span1.append(span1_img);
    div2.append(span1, span2, span3);
    div3.append(span_price);
    card_details.append(div1, div2, div3, div4);
    btn.append(btn_img);
    card_btn_div.append(btn);
    card.append(card_img, card_details, card_btn_div);
    document.querySelector("#query-div").append(card);
  });
}

// Menu Items After (FILTERED)_
document.querySelector("#filterby-veg").addEventListener("change", filterFunc);
function filterFunc() {
  let query = document.querySelector("#filterby-veg").value;
  let totalData = JSON.parse(localStorage.getItem("all-data")) || [];
  let fd = filterBy(totalData, query);

  if (query == "null") {
    clearSearch();
  }

  if (query == "veg") {
    let value = "Veg Items";
    display_Query_filtered(fd, value);
  } else {
    let value = "Non-veg Items";
    display_Query_filtered(fd, value);
  }
}

function display_Query_filtered(dataArr, query) {
  // document.querySelector("#clear-search").style.display = "inline-block";

  // SEARCH-HEADING_
  document.querySelector(".query-results").innerHTML = "";
  let h3 = document.createElement("h2");
  h3.innerHTML = ` All ${query}`;
  h3.style.marginBottom = "50px";
  document.querySelector(".query-results").append(h3);

  // SEARCHED-ITEMS_
  document.querySelector("#query-div").innerHTML = "";
  document.querySelector("#query-div").setAttribute("class", "card_container");

  dataArr.forEach((ele) => {
    // CARD_
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let cardUpPart = document.createElement("div");
    let cardDownPart = document.createElement("div");

    // CARD IMAGE_
    let card_img = document.createElement("div");
    card_img.setAttribute("class", "card_img");
    let img = document.createElement("img");
    ele.Image =
      ele.Image ||
      "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K488.jpg?ver=25.08";
    img.src = ele.Image;
    card_img.onclick = function () {
      addToDetails(ele);
    };

    // CARD DETAILS_
    let card_details = document.createElement("div");
    card_details.setAttribute("class", "card_details");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "card_details_title");
    div1.textContent = ele.title;
    let div2 = document.createElement("div");
    let span1 = document.createElement("span");
    let span1_img = document.createElement("img");
    if (ele.veg === "Veg  ") {
      span1_img.src = `https://online.kfc.co.in/static/media/Veg_dot_Icon.d1a3902d.svg`;
    } else {
      span1_img.src = `https://online.kfc.co.in/static/media/Non_veg_dot_Icon.d975d1f9.svg`;
    }

    let span2 = document.createElement("span");
    span2.setAttribute("class", "dot");
    let span3 = document.createElement("span");
    span3.textContent = ele.veg;
    let div3 = document.createElement("div");
    let span_price = document.createElement("span");
    span_price.setAttribute("class", "price");
    if (ele.price == NaN || ele.price == typeof "string") {
      ele.price = `₹370 .00`;
    }
    span_price.textContent = ele.price;
    let div4 = document.createElement("div");
    div4.textContent = ele.description;

    // CARD BUTTON_
    let card_btn_div = document.createElement("div");
    card_btn_div.setAttribute("class", "card_btn_div");
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn_addtoCart");
    btn.textContent = "Add To Cart";
    let btn_img = document.createElement("img");
    btn_img.src = `https://online.kfc.co.in/static/media/Icon_Add_to_Cart.58b87a9b.svg`;
    btn.onclick = function () {
      AddToCart(ele);
    };

    // Append-All line by line_
    card_img.append(img);
    span1.append(span1_img);
    div2.append(span1, span2, span3);
    div3.append(span_price);
    card_details.append(div1, div2, div3, div4);
    btn.append(btn_img);
    card_btn_div.append(btn);
    cardUpPart.append(card_img, card_details);
    cardDownPart.append(card_btn_div);
    card.append(cardUpPart, cardDownPart);
    document.querySelector("#query-div").append(card);
  });
}

document
  .querySelector("#btn-Addtocart")
  .addEventListener("click", exclusiveItems_Add2Cart);
document
  .querySelector("#exc-img")
  .addEventListener("click", exclusiveItems_Add2Details);

const excItem = {
  Image:
    "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-PR00002228.jpg?ver=25.08",
  description:
    "Try Allus fav-1 Hot & Crispy Chicken,1 Smoky Red, Reg Popcorn,Spicy Fries & 1 Dip 20gm",
  price: "₹448.57",
  title: "The Allu Arjun Combo",
  veg: "Non veg  ",
  strikeoff_price: "₹523.00",
};

function exclusiveItems_Add2Cart() {
  excItem.qty = 1;
  AddToCart(excItem);
  alert("Item Added to Cart");
}
function exclusiveItems_Add2Details() {
  addToDetails(excItem);
}

// OTHER FUNCTIONS IF NEEDED_

// async function fetch_All_Data_Filtered() {
//   // FILTER VALUE_
//   var value = document.querySelector("#filterby-veg").value;

//   // chizza_
//   let url_1 = `https://kfc-menu-api.onrender.com/chizza`;
//   let res_1 = await fetch(url_1);
//   let jd_1 = await res_1.json();
//   let loc_1 = "#CHIZZA > div.card_container";
//   let arr_1 = filterBy(jd_1, value);
//   display_All(arr_1, loc_1);

//   // chicken-bucket_
//   let url_2 = `https://kfc-menu-api.onrender.com/chicken-bucket`;
//   let res_2 = await fetch(url_2);
//   let jd_2 = await res_2.json();
//   let loc_2 = "#CHICKEN > div.card_container";
//   let arr_2 = filterBy(jd_2, value);
//   display_All(arr_2, loc_2);

//   // new-launch_
//   let url_3 = `https://kfc-menu-api.onrender.com/new-launch`;
//   let res_3 = await fetch(url_3);
//   let jd_3 = await res_3.json();
//   let loc_3 = "#NEW > div.card_container";
//   let arr_3 = filterBy(jd_3, value);
//   display_All(arr_3, loc_3);

//   // biriyani-bucket_
//   let url_4 = `https://kfc-menu-api.onrender.com/biriyani-bucket`;
//   let res_4 = await fetch(url_4);
//   let jd_4 = await res_4.json();
//   let loc_4 = "#BIRYANI > div.card_container";
//   let arr_4 = filterBy(jd_4, value);
//   display_All(arr_4, loc_4);

//   // box-meals_
//   let url_5 = `https://kfc-menu-api.onrender.com/box-meals`;
//   let res_5 = await fetch(url_5);
//   let jd_5 = await res_5.json();
//   let loc_5 = "#BOX > div.card_container";
//   let arr_5 = filterBy(jd_5, value);
//   display_All(arr_5, loc_5);

//   // burgers_
//   let url_6 = `https://kfc-menu-api.onrender.com/burgers`;
//   let res_6 = await fetch(url_6);
//   let jd_6 = await res_6.json();
//   let loc_6 = "#BURGERS > div.card_container";
//   let arr_6 = filterBy(jd_6, value);
//   display_All(arr_6, loc_6);

//   // snacks_
//   let url_7 = `https://kfc-menu-api.onrender.com/snacks`;
//   let res_7 = await fetch(url_7);
//   let jd_7 = await res_7.json();
//   let loc_7 = "#SNACKS > div.card_container";
//   let arr_7 = filterBy(jd_7, value);
//   display_All(arr_7, loc_7);

//   // beverages_
//   let url_8 = `https://kfc-menu-api.onrender.com/beverages`;
//   let res_8 = await fetch(url_8);
//   let jd_8 = await res_8.json();
//   let loc_8 = "#BEVERAGES > div.card_container";
//   let arr_8 = filterBy(jd_8, value);
//   display_All(arr_8, loc_8);
// }

// Utility Functions_#

// function separateRupee(dataArr) {
//   dataArr.forEach((ele) => {
//     let price = ele.price;
//     price = price.substring(1, price.length);
//     console.log(Number(price));
//   });
// }
