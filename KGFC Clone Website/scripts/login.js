


let loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener ("click", function (){


    let userEmail = document.querySelector(".email-input").value;
let userPass = document.querySelector("#signin-password").value;

    if (!userPass || !userEmail){
        alert ('Please enter your credentials')
    }

    if (userPass == "123456"){
        alert ('Please check your password')
    }

    if (userEmail == "chintuthecoder@gmail.com" && userPass == "938220"){
        alert ('Login Successful');
        window.location.href = "../index.html";
    }
    
})

