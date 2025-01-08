function loading(){
    var tl = gsap.timeline()

tl.to("#yellow1",{
    top: "-100%",
    delay: 0.5,
    duration: 0.7,
    ease: "expo.out"
});

tl.from("#yellow2",{
    top: "100%",
    delay: 0.6,
    duration: 0.5,
    ease: "expo.out"
},"syn");

tl.to("#loader h1",{
    color: "black",
    duration: 0.7,
    delay: 0.6
},"syn");

tl.to("#loader",{
    opacity: 0
});

tl.to("#loader",{
    display: "none"
});
}


loading()



function loco(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
    document.querySelector("#footer h2").addEventListener("click", ()=>{
        scroll.scrollTo(0)
    })
    var ele = document.querySelectorAll(".parts")
    var p2 = document.querySelector("#page2")
    ele.forEach(function(el){
        el.addEventListener("mouseenter", function(){
            var bgImg = el.getAttribute("data-img")
            p2.style.backgroundImage = `url(${bgImg})`
        })
    });
}

loco();