var scenes = [
    { quote: "Once upon a time, there was a young dreamer who wanted to explore the world.", backgroundClass: "scene-1" },
    { quote: "They set out on a journey, leaving behind the comfort of the familiar.", backgroundClass: "scene-2" },
    { quote: "The road ahead was uncertain, but the dreamer embraced each step with hope.", backgroundClass: "scene-3" },
    { quote: "Along the way, they encountered challenges that tested their strength.", backgroundClass: "scene-4" },
    { quote: "But with every challenge, they grew stronger, learning more about themselves.", backgroundClass: "scene-5" },
    { quote: "As they ventured farther, they met kindred souls who shared their dreams.", backgroundClass: "scene-6" },
    { quote: "Together, they discovered that the greatest journeys are those shared with others.", backgroundClass: "scene-7" },
    { quote: "With new friendships and lessons learned, the dreamer pressed on with renewed courage.", backgroundClass: "scene-8" },
    { quote: "Finally, after many miles, they reached a place they could call home.", backgroundClass: "scene-9" },
    { quote: "And in that moment, they realized the journey itself was the true destination.", backgroundClass: "scene-10" }
];
var currentSceneIndex = 0;
var audioStarted = false;
window.addEventListener("DOMContentLoaded", function () {
    var quoteText = document.getElementById("quote-text");
    var nextButton = document.getElementById("next-btn");
    var gameContainer = document.querySelector(".game-container");
    var audioElement = new Audio('sounds/1.mp3');
    audioElement.loop = true;
    nextButton.addEventListener("click", function () {
        if (!audioStarted) {
            audioElement.play();
            audioStarted = true;
        }
        quoteText.classList.add("hidden");
        setTimeout(function () {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
            quoteText.textContent = scenes[currentSceneIndex].quote;
            gameContainer.className = "game-container ".concat(scenes[currentSceneIndex].backgroundClass);
            quoteText.classList.remove("hidden");
        }, 1000);
    });
});
