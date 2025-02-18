let valueDisplay=document.querySelectorAll(".num");
let interval=10000;

valueDisplay.forEach((valueDisplay)=>{
let startValue=0;
let endValue=parseInt(valueDisplay.getAttribute("data-val"));
console.log(endValue);

let duration=Math.floor(interval/endValue);
let counter=setInterval(function(){
    startValue+=1;
    valueDisplay.textContent=startValue;
    if(startValue==endValue)
    clearInterval(counter);

},duration);

}); 




// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     document.querySelector('.nav-bar ul').style.backgroundColor = '#333'; 
//   } else {
//     document.querySelector('.nav-bar ul').style.backgroundColor = '#24232346'; 
//   }
// }


