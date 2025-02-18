window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('.nav-bar ul').style.backgroundColor = '#333'; 
  } else {
    document.querySelector('.nav-bar ul').style.backgroundColor = '#24232346'; 
  }
}

document.getElementById("my-svg").addEventListener("click", function() {
  var currentColor = this.style.fill;
  if (currentColor === "white") {
    this.style.fill = "orange";
  } else {
    this.style.fill = "white";
  }
});


