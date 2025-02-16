import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

let scene, camera, renderer;
let snake = [], food;
let direction = new THREE.Vector3(1, 0, 0);
let score = 0, speed = 0.1;
const snakeSize = 1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Create snake head
    let geometry = new THREE.BoxGeometry(snakeSize, snakeSize, snakeSize);
    let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    let head = new THREE.Mesh(geometry, material);
    scene.add(head);
    snake.push(head);

    // Create food
    food = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    placeFood();
    scene.add(food);

    camera.position.z = 10;
    animate();
}

function placeFood() {
    food.position.set(
        (Math.random() * 10 - 5) * snakeSize,
        (Math.random() * 10 - 5) * snakeSize,
        0
    );
}

function moveSnake() {
    let newHeadPosition = snake[0].position.clone().add(direction);
    if (newHeadPosition.equals(food.position)) {
        score++;
        placeFood();
        let newSegment = new THREE.Mesh(
            new THREE.BoxGeometry(snakeSize, snakeSize, snakeSize),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        snake.push(newSegment);
        scene.add(newSegment);
    }
    
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].position.copy(snake[i - 1].position);
    }
    snake[0].position.copy(newHeadPosition);
}

function animate() {
    requestAnimationFrame(animate);
    moveSnake();
    renderer.render(scene, camera);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") direction.set(0, 1, 0);
    if (event.key === "ArrowDown") direction.set(0, -1, 0);
    if (event.key === "ArrowLeft") direction.set(-1, 0, 0);
    if (event.key === "ArrowRight") direction.set(1, 0, 0);
});

init();
