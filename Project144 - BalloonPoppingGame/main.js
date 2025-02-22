const balloonGallery = document.getElementById('balloon-gallery');
const yayMessage = document.getElementById('yay-no-balloons');
const totalBalloons = 24;

// Function to create and add balloons to the gallery
function createBalloons() {
    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = '🎈';
        
        // Add event listener to pop balloon on mouseover
        balloon.addEventListener('click', () => {
            balloon.style.display = 'none'; 
            checkAllBalloonsPopped();
        });

        balloonGallery.appendChild(balloon);
    }
}

// Function to check if all balloons are popped
function checkAllBalloonsPopped() {
    const balloons = document.querySelectorAll('#balloon-gallery .balloon');
    const poppedCount = Array.from(balloons).filter(balloon => balloon.style.display === 'none').length;

    if (poppedCount === totalBalloons) {
        yayMessage.style.display = 'block';
    }
}

createBalloons();
