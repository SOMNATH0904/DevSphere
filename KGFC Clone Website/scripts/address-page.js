// find user current location 
window.onload = function () {
    findUserLocation();
  };
  

  
  // current location
  function findUserLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
  
    function error(errorMsg) {
      console.warn(`Location Error(${errorMsg.code}): ${errorMsg.message}`);
    }
  
    function findLocation(pos) {
      const crd = pos.coords;
      let latitude = crd.latitude;
      let longitude = crd.longitude;
      let accuracy = crd.accuracy;
  
      let userCurrentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c8ad3128f981928e8934de5e0264b44`;
  
      async function findPlace() {
        let res = await fetch(userCurrentPosition);
        if (res.status == 200) {
          let jsonFormat = await res.json();
          let location = jsonFormat.name;
         
          changeMap(location);
        }
      }
  
      findPlace();
    }
  
    navigator.geolocation.getCurrentPosition(findLocation, error, options);
}

let submitBtn = document.querySelector("#submit-btn");
submitBtn.onclick = function (){
    
    
    let cityName = document.querySelector("#city-name").value;
    let deliveryAddress = document.querySelector("#delivery-address").value;
    let phonenumber = document.querySelector("#phonenumber").value;
    let zipCode = document.querySelector("#zip-code").value;

    let cityWarn = document.querySelector(".city-warn");
    let addressWarn = document.querySelector(".address-warn");
    let phonenumberWarn = document.querySelector(".phonenumber-warn");
    let zipWarn = document.querySelector(".zip-warn");

    if (!cityName){
        cityWarn.classList.add("display-block");
    }else {
        cityWarn.classList.remove("display-block");
    }

    if (!deliveryAddress){
        addressWarn.classList.add("display-block");
    }else {
        addressWarn.classList.remove("display-block")
    }

    if (!phonenumber){
        phonenumberWarn.classList.add("display-block");
    }else {
        phonenumberWarn.classList.remove("display-block");
    }

    if (!zipCode){
        zipWarn.classList.add("display-block");
    }else {
        zipWarn.classList.remove("display-block");
    }


    if (cityName && deliveryAddress && phonenumber && zipCode){
        let userAddressData = new AddressConstructor (cityName, deliveryAddress, phonenumber, zipCode)
        localStorage.setItem("addressData", JSON.stringify(userAddressData));

        window.location.href = "../pages/payment.html"
        
       
    }
    
}

document.getElementById("city-name").addEventListener("keydown", function (event){

  if (event.key === "Enter"){
    let city = document.querySelector("#city-name").value
    changeMap(city);
    
  }
})



function changeMap(location) {
    let mapCanvas = document.querySelector("#gmap_canvas");
    mapCanvas.src =
      "https://maps.google.com/maps?q=" +
      location +
      "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  }


  function AddressConstructor (cityName, deliveryAddress, phonenumber, zipCode){
    this.cityName = cityName;
    this.deliveryAddress = deliveryAddress;
    this.phonenumber = phonenumber;
    this.zipCode = zipCode;
  }



let submit2 = document.querySelector("#submit-btn");

