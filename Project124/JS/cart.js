const CONVENIENCE_FEES = 99;
let bagItemObjects = [];
onLoad();
function onLoad(){
    
    bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');

    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    let finalPayment = 0;
    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += 0;
        finalPayment += bagItem.original_price;
    });
    if(finalPayment != 0) finalPayment += CONVENIENCE_FEES;



    bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹ ${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Delivery Charge</span>
            <span class="price-item-value">₹ 99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${finalPayment}</span>
        </div>
        </div>
        <a href="https://buy.stripe.com/test_28ocOW0bI5OIc9O8ww">
            <button class="btn-place-order" >
            <div class="css-xjhrni">PLACE ORDER</div>
        </button></a>
    </div>`
}



function loadBagItemObjects(){
    console.log("onload load bagItems working");
    bagItemObjects = [];
    for(let j = 0;j<bagItems.length;j++){
        for(let i = 0;i<item.length;i++){
            if(bagItems[j] == item[i].id){
                bagItemObjects.push(item[i]);
                break;
            }
        }
    }
}
console.log(bagItemObjects);
function displayBagItems(){    
    let containerElement = document.querySelector('.bag-items-container');
    let innerHtml = ``;
    bagItemObjects.forEach(Item=>{
        innerHtml += generateItem(Item);
    })
    containerElement.innerHTML = innerHtml;
}

function removeFromBag(itemId){
    let containerElement = document.querySelector('.bag-items-container');
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    console.log(bagItems);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    onLoad();
}

function generateItem(item){
    return `
    <div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="${item.image}">
        </div>
        <div class="item-right-part">
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
            <span class="original-price">₹ ${item.original_price}</span>
            </div>
            <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">10 PM</span>
            </div>
        </div>

        <div class="remove-from-cart" onClick="removeFromBag(${item.id});">X</div>
    </div>
`
}
