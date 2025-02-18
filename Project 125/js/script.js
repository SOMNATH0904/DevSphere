

let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');
let section = document.querySelector('section');
// let section = document.getElementsByTagName('*');


menuToggle.onclick = function () {
    header.classList.toggle('active')
    section.classList.toggle('active')
}

const slides = document.querySelectorAll('.slide');

// console.log(slides)

let counter = 0;
// console.log(i)



slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`

});

const goPrev = () => {
    counter--
    slideImg()
}
const goNext = () => {
    counter++ 
    slideImg()
}


const slideImg = () => {
    for (let i = 0; i < slides.length; i++) {
        if (counter >= slides.length) {
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${counter * 0}%)`
            });
        } else {
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${counter * 100}%)`
            });
        }
    }
}
// const slideImg = () => {
//     for (let i = 0; i < slides.length; i++) {
//         if (counter >= slides.length) {
//             slides.forEach(slide => {
//                 slide.style.transform = `translateX(-${counter * 0}%)`
//             });
//         } else {
//             slides.forEach(slide => {
//                 slide.style.transform = `translateX(-${counter * 100}%)`
//             });
//         }
//     }
// }


// setInterval(() => {
    // if (counter < 2) {
    //     console.log(counter++)
    //     slides.forEach((slide, index) => {
    //         slide.style.left = `${index * 100}%`
    //         slide.style.transform = `translateX(-${counter * 100}%)`
    //     });
    // } 
    
    // else {
    //     console.log(counter--)
    //     slides.forEach((slide, index) => {
    //         slide.style.left = `${index * 100}%`
    //         slide.style.transform = `translateX(-${counter * 100}%)`
    //     }); 
    // }
// }, 2000);

