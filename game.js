let player; // Snowball
let platforms = []; // array of platforms
let gameState = "start";

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

  // After reset go back to start screen
  gameState = "start";
}

function draw() {
  // Background
  background(150, 150, 150);

  // ----- Draw platforms -----
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  // Update player movement only when playing
  if (gameState === "playing") {
    player.update();
    handleCollisions();
    checkGameOver();
  }

  // Draw snowball
  player.draw();

  // UI text
  fill(0);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawPlayingUI();
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  }
}

// Text in start state
function drawStartScreen() {
  textSize(26);
  text("Doodle Jump", width / 2, 120);

  textSize(14);
  text("Press ENTER to start", width / 2, 190);

  text("← → move, SPACE jump", width / 2, 230);
}

// Text in playing state
function drawPlayingUI() {
  textSize(24);
  text("Doodle Jump", width / 2, 40);

  textSize(14);
  text("← → move, SPACE jump", width / 2, 95);
}

// Text in gameover state
function drawGameOverScreen() {
  textSize(26);
  text("Game Over!", width / 2, 120);

  textSize(14);
  text("Press R to restart", width / 2, 190);
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
    gameState = "gameover";
  }
}

// Key controls
function keyPressed() {
  // Start the game
  if (
    gameState === "start" &&
    (key === "Enter" || key === "Return" || keyCode === 13)
  ) {
    gameState = "playing";
  }

  // Jump (only when playing )
  if (gameState === "playing" && keyCode === 32) {
    player.jump();
  }

  // Restart the game when game over
  if ((key === "r" || key === "R") && gameState === "gameover") {
    resetGame();
  }
}
