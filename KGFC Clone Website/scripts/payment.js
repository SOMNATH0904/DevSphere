var inp=document.querySelector(".card-number-input");
var year=document.querySelector(".year-input")
var cvv=document.querySelector(".cvv-input")
var month=document.querySelector(".month-input")

  document.querySelector(".card-number-input").oninput = () => {   
    document.querySelector(".card-number-box").innerText =
      document.querySelector(".card-number-input").value;
  };

  document.querySelector(".card-holder-input").oninput = () => {
    document.querySelector(".card-holder-name").innerText =
      document.querySelector(".card-holder-input").value;
  };

  document.querySelector(".month-input").oninput = () => {
    document.querySelector(".exp-month").innerText =
      document.querySelector(".month-input").value;
  };

  document.querySelector(".year-input").oninput = () => {
    document.querySelector(".exp-year").innerText =
      document.querySelector(".year-input").value;
  };

  document.querySelector(".cvv-input").onmouseenter = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(-180deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(0deg)";
  };

  document.querySelector(".cvv-input").onmouseleave = () => {
    document.querySelector(".front").style.transform =
      "perspective(1000px) rotateY(0deg)";
    document.querySelector(".back").style.transform =
      "perspective(1000px) rotateY(180deg)";
  };

  document.querySelector(".cvv-input").oninput = () => {
    document.querySelector(".cvv-box").innerText =
      document.querySelector(".cvv-input").value;
  };

  var submitbtn=document.querySelector(".submit-btn")
  submitbtn.addEventListener("click",()=>{
    event.preventDefault()
    if(inp.value.length < 16){
        var msg1=document.querySelector("#warning1")
        msg1.textContent="Enter 16-digit card number on the card"
    }
    if(year.value==2021 || year.value==2022){
        var msg2=document.querySelector("#warning2")
        msg2.textContent="Your card has been expired"
    }
    if(cvv.value.length<3){
        var msg3=document.querySelector("#warning3")
        msg3.textContent="Enter 3-digit CVV"
    }
    if(inp.value.length >= 12 && year.value!=2021 && year.value!=2022 && cvv.value.length ==3 && month.value!=null){
        location.href = "./pages/profile.html";
    }
  })


  let submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", function (){
    window.location.href = "../pages/profile.html"
  })

  