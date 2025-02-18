// Show Game Over Modal
function showGameOver() {
  const modal = document.getElementById('gameOverModal');
  const finalScore = document.getElementById('finalScore');
  finalScore.textContent = score;
  modal.style.display = 'flex';
}

// Hide Game Over Modal and restart the game
function restartGame() {
  const modal = document.getElementById('gameOverModal');
  modal.style.display = 'none';
  score = 0;
  document.getElementById('score').textContent = score;

  // Reset snake
  snake.forEach(segment => scene.remove(segment));
  snake = [];

  // Reset snake position
  const head = new THREE.Mesh(segmentGeometry, snakeMaterial);
  head.position.set(0, 0, 0);
  snake.push(head);
  scene.add(head);

  // Reset sphere position
  spherePosition.set(
    Math.floor(Math.random() * 20 - 10),
    Math.floor(Math.random() * 20 - 10),
    0
  );
  sphere.position.copy(spherePosition);

  gameStarted = false;
  startGame(speed); // Restart the game with previous speed setting
}

// Exit Game
function exitGame() {
  window.close(); // Close the game window (works on some browsers)
}

// Updated Game Loop (to trigger Game Over)
function animate() {
  if (!gameStarted) return;

  setTimeout(() => {
    requestAnimationFrame(animate);

    updateDirection();

    // Move snake
    const headPosition = snake[0].position.clone();
    headPosition.add(direction);

    // Check collisions
    if (headPosition.equals(spherePosition)) {
      // Increase score
      score += 10;
      document.getElementById("score").textContent = score;

      // Add new segment
      const newSegment = new THREE.Mesh(segmentGeometry, snakeMaterial);
      const tail = snake[snake.length - 1];
      newSegment.position.copy(tail.position);
      snake.push(newSegment);
      scene.add(newSegment);

      // Reposition sphere
      spherePosition.set(
        Math.floor(Math.random() * 20 - 10),
        Math.floor(Math.random() * 20 - 10),
        0
      );
      sphere.position.copy(spherePosition);
    }

    // Move segments
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].position.copy(snake[i - 1].position);
    }
    snake[0].position.copy(headPosition);

    // Check self-collision or boundary collision
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].position.equals(snake[i].position)) {
        showGameOver(); // Trigger Game Over Modal
        return;
      }
    }
    if (
      Math.abs(headPosition.x) > 25 ||
      Math.abs(headPosition.y) > 25 ||
      Math.abs(headPosition.z) > 25
    ) {
      showGameOver(); // Trigger Game Over Modal
      return;
    }

    // Render the scene
    renderer.render(scene, camera);
  }, speed);
}
