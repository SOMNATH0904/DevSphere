// import Navbar
import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();

// import footer
// import {footer} from "../components/footer/footer.js";
// document.querySelector(".footer-div").innerHTML = footer();

// let sideArr = [
//   {
//     Image:
//       "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K754.jpg?ver=25.08",
//     description:
//       "Crunchy chicken topped with cheese, spicy sauce, veggies & herbs. All-chicken-no-crust pizza!",
//     price: "₹299.05",
//     title: "Chizza",
//     veg: "Non veg ",
//   },
//   {
//     Image:
//       "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K754.jpg?ver=25.08",
//     description:
//       "Crunchy chicken topped with cheese, spicy sauce, veggies & herbs. All-chicken-no-crust pizza!",
//     price: "₹299.05",
//     title: "Chizza",
//     veg: "Non veg ",
//   },
//   {
//     Image:
//       "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K754.jpg?ver=25.08",
//     description:
//       "Crunchy chicken topped with cheese, spicy sauce, veggies & herbs. All-chicken-no-crust pizza!",
//     price: "₹299.05",
//     title: "Chizza",
//     veg: "Non veg ",
//   },
//   {
//     Image:
//       "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K754.jpg?ver=25.08",
//     description:
//       "Crunchy chicken topped with cheese, spicy sauce, veggies & herbs. All-chicken-no-crust pizza!",
//     price: "₹299.05",
//     title: "Chizza",
//     veg: "Non veg ",
//   },
// ];
// function getOrderHistory(){
//     return  (Order_Container.innerHTML=  `<div class="inner-container">
//     <img src="https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/D-K754.jpg?ver=25.08" alt="error">
//      <h3>"Chizza</h3>
//      <p>Crunchy chicken topped with cheese, spicy sauce, veggies & herbs. All-chicken-no-crust pizza!</p>
//      <h4>₹299.05</h4>
//      <h5>Non veg</h5>
//     </div>`)
// }
// getOrderHistory();

let Order_Container = document.querySelector(".Order-container");
//  console.log(Order_Container);
// if(Order_Container === null){
//     // let Order_Container = document.getElementById("Order-container");
//     Order_Container.innerHTML="No order have been placed in the past 12 months";
// }else{
//     getOrderHistory();
// }

// function getOrderHistory(){
// //    let Order_Container = document.getElementById("Order-container");
//    Order_Container.innerHTML = sideArr.map((element)=>{
//      let {Image,description,price,title,veg} = element;
//     return `
//         <div class="inner-container">
//         <img src=${Image} alt="error">
//          <h3>${title}</h3>
//          <p>${description}</p>
//          <h4>${price}</h4>
//          <h5>${veg}</h5>
//         </div>`

//   });

// }
// let x= getOrderHistory();

let sideArr = JSON.parse(localStorage.getItem("cart-data")) || [];

function display(arr) {
  arr.forEach((e) => {
    let struc = `
    <div class="inner-container">
    <img src=${e.Image} alt="error">
     <h3>${e.title}</h3>
     <h5>${e.veg}</h5>
     <p>${e.description}</p>
     <h4>${e.price}</h4>
    </div>`;

    Order_Container.innerHTML += struc;
  });
}

display(sideArr);

// .join("")

var minute = 29;
var second = 60;

setInterval(function () {
  if (minute == 0 && second == 1) {
    document.querySelector(".counter").innerHTML = "00:00";
  } else {
    second--;
    if (second == 0) {
      minute--;
      second = 60;
      if (minute == 0) {
        minute = minute;
      }
    }
    document.querySelector(".counter").innerHTML = minute + ":" + second;
  }
}, 1000);

// PAGELINKING_
let kfcLogo = document.querySelector("#navbar-kfc-logo");
kfcLogo.onclick = function () {
  location.href = "../index.html";
};
document.querySelector("#navbar-menu").onclick = () => {
  location.href = "../pages/menu.html";
};
document.querySelector("#navbar-man-icon").onclick = () => {
  location.href = "../pages/login.html";
};
document.querySelector("#navbar-account").onclick = () => {
  location.href = "../pages/profile.html";
};
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "../pages/cart.html";
};
