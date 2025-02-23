
var userDataArr = JSON.parse(localStorage.getItem("userData")) || [];
let form = document.querySelector("#form-id");
let passwordMatch = false;

class UserData{
    constructor(userName, place, email, pass, confirmPass){
        this.userName = userName;
        this.place = place;
        this.email = email;
        this.pass = pass;
        this.confirmPass = confirmPass;
    }
}



form.addEventListener("submit", function (e){
    e.preventDefault()
    
    let userName = document.querySelector(".username").value;
    let place = document.querySelector(".place-input").value;
    let email = document.querySelector(".email-input").value;
    let pass = document.querySelector("#signin-password").value;
    let confirmPass = document.querySelector("#confirm-password").value;

    let userNameWarn = document.querySelector(".username-warning");
    let placeWarn = document.querySelector(".place-warning");
    let emailWarn = document.querySelector(".email-warning");
    let passWarn = document.querySelector(".pass-warning");
    let confirmPassWarn = document.querySelector(".confirm-warning");
   
    console.log(userName, place, email, pass, confirmPass)
    

    if (!userName){
        userNameWarn.classList.add("display-block");
    }else {
        userNameWarn.classList.remove("display-block");
    }

    if (!place){    
        placeWarn.classList.add("display-block");
    }else {
        placeWarn.classList.remove("display-block")
    }

    if (!email){
        emailWarn.classList.add("display-block");
    }else {
        emailWarn.classList.remove("display-block")
    }

    if (!pass){
        passWarn.classList.add("display-block");
    }else {
        passWarn.classList.remove("display-block");
    }

    if (userName, place, email, pass, confirmPass, passwordMatch){
        
        let user = new UserData (userName, place, email, pass, confirmPass)
        userDataArr.push(user);
        localStorage.setItem("userData",JSON.stringify(userDataArr));
        sendOtpToMail(user)

        setTimeout(changeLocation, 4000);
        function changeLocation() {
            window.location.href = "../pages/otp.html";

        }
    }
    
})

let pass = document.querySelector("#signin-password");

pass.addEventListener("input", typingPass);
function typingPass (){

    let pass = document.querySelector("#signin-password").value;
    let passWarn = document.querySelector(".pass-warning");
    if (pass.length < 6){
        passWarn.classList.add("display-block")
    }else {
        passwordMatch = true;
        passWarn.classList.remove("display-block")
    }
}




let confirmInput = document.querySelector("#confirm-password");
confirmInput.addEventListener("input", checkPass);

function checkPass (){

    let pass = document.querySelector("#signin-password").value;
    let confirmPassWarn = document.querySelector(".confirm-warning");
    let confirmPass = document.querySelector("#confirm-password").value;

    if (pass){

        if (pass != confirmPass){
            confirmPassWarn.classList.add("display-block");
        }else {
            confirmPassWarn.innerHTML = "Password match";
            confirmPassWarn.classList.add("password-match")
        }
    }
}

// sending otp 

let otpArr = JSON.parse(localStorage.getItem("otp")) || [];

// otp feature
function sendOtpToMail(userDataObj) {
    let name = userDataObj.userName;
    let mail = userDataObj.email;
  let otp = generateOTP();
  
  let otpObj = {
      name: name,
      mail: mail,
      otp: otp,
    };

  otpArr.push(otpObj);
  localStorage.setItem("otp", JSON.stringify(otpArr));

  const serviceId = "service_f3nv3am";
  const templateId = "template_xwrbdho";
  const apiKey = "8VnLYUKesp8CehjBF";


  emailjs
    .send(serviceId, templateId, { name, mail, otp }, apiKey)
    .then(() => {
        alert('otp send to mail')
        //  window.location.href = "../pages/otp.html";
    })
    .catch((error) => {
      console.error(error);
      alert("There was an error sending the email. Please try again later.");
    });
}

//generate 4 digits otp
function generateOTP() {
  var otp = Math.floor(Math.random() * 9000) + 1000;
  return otp;
}



 
