let player; // Snowball
let platforms = []; // array of platforms
let gameOver = false;

function setup() {
  createCanvas(400, 600);

  textAlign(CENTER, CENTER);

  resetGame();
}

function resetGame() {
  // Create the player in the middle, near the bottom
  player = new Player(width / 2, height - 80);

  // Clear and recreate platforms
  platforms = [];
  platforms.push(new Platform(80, 450, 100, 15));
  platforms.push(new Platform(230, 380, 100, 15));
  platforms.push(new Platform(60, 310, 100, 15));
  platforms.push(new Platform(220, 240, 100, 15));
  platforms.push(new Platform(120, 170, 100, 15));

  gameOver = false;
}

function draw() {
  // Background
  background(150, 150, 150);

  // ----- Draw platforms -----
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  if (!gameOver) {
    // Update snowball position
    player.update();

    // Handle collisions with platforms
    handleCollisions();

    // Check if the player has fallen off the bottom
    checkGameOver();
  }

  // Draw snowball
  player.draw();

  // Title text
  fill(0);
  textSize(24);
  text("Doodle Jump", width / 2, 50);

  // Instructions text
  textSize(14);
  if (!gameOver) {
    text("LEFT and RIGHT arrow to move, SPACE to jump", width / 2, 95);
  } else {
    text("Game Over! Press R to restart", width / 2, 70);
  }
}

// Collision handling
function handleCollisions() {
  // Check collision with platforms when falling down
  if (player.vy > 0) {
    for (let i = 0; i < platforms.length; i++) {
      let p = platforms[i];

      if (isOnPlatform(player, p)) {
        // Place the player on top of the platform
        player.y = p.y - player.radius;
        player.vy = 0;
      }
    }
  }
}

// Check if the player is standing on a platform
function isOnPlatform(player, platform) {
  // Player bottom
  const bottom = player.y + player.radius;

  // Is the player above the top of the platform?
  const aboveTop = bottom > platform.y;
  const belowTop = bottom < platform.y + platform.h;

  // Is the player horizontally within the platform?
  const withinX = player.x > platform.x && player.x < platform.x + platform.w;

  // Require that the player is moving downwards (vy > 0)
  return aboveTop && belowTop && withinX;
}

// Check if player fell below bottom of screen
function checkGameOver() {
  if (player.y - player.radius > height) {
    gameOver = true;
  }
}

// Key controls
function keyPressed() {
  // Jump (only if not game over and player is not already flying upwards)
  if (key === " " && !gameOver) {
    if (player.vy === 0) {
      player.jump();
    }
  }

  // Restart the game when game over
  if ((key === "r" || key === "R") && gameOver) {
    resetGame();
  }
}
