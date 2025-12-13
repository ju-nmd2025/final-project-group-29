let player; // Snowball
let platforms = []; // array of platforms
let gameState = "start";

// Score
let score = 0;

// Platform settings
const PLATFORM_W = 100;
const PLATFORM_H = 15;
const NUM_PLATFORMS = 8;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);

  resetGame();
}

function resetGame() {
  // Create the player in the middle, near the bottom
  player = new Player(width / 2, height - 80);

  // Reset score
  score = 0;

  // Create a fresh set of platforms
  platforms = [];

  // A platform near the bottom so you don't instantly fall
  platforms.push(
    new Platform(
      width / 2 - PLATFORM_W / 2,
      height - 120,
      PLATFORM_W,
      PLATFORM_H
    )
  );

  // Add the rest above it
  for (let i = 1; i < NUM_PLATFORMS; i++) {
    const y = height - 120 - i * 80; // spacing between platforms
    platforms.push(makeRandomPlatform(y));
  }

  // Start screen
  gameState = "start";
}

function draw() {
  // Background
  background(150, 150, 150);

  // Draw platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  if (gameState === "playing") {
    player.update();
    handleCollisions();
    scrollWorldIfNeeded(); // moves platforms down + increases score
    recyclePlatforms(); // remove old + create new
    checkGameOver();
  }

  // Draw player
  player.draw();

  // UI
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

  // Display score
  text("Score: " + score, width / 2, 130);
}

// Text in gameover state
function drawGameOverScreen() {
  textSize(26);
  text("Game Over!", width / 2, 120);

  textSize(14);
  text("Press R to restart", width / 2, 190);

  text("Final score: " + score, width / 2, 220);
}

// Collision handling
function handleCollisions() {
  // Only land on platforms when falling
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

function isOnPlatform(player, platform) {
  const bottom = player.y + player.radius;

  const inVerticalBand =
    bottom > platform.y && bottom < platform.y + platform.h;
  const withinX = player.x > platform.x && player.x < platform.x + platform.w;

  return inVerticalBand && withinX;
}

// Scroll down when player moves up
function scrollWorldIfNeeded() {
  // When player goes above this height, scroll down
  const scrollThreshold = height / 3;

  // Only scroll when moving upward
  if (player.y < scrollThreshold && player.vy < 0) {
    // How much we need to move things down
    const dy = scrollThreshold - player.y;

    // Keep player at the threshold
    player.y = scrollThreshold;

    // Move all platforms down
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].y += dy;
    }

    // Increase score based on how much we scrolled
    score += Math.floor(dy);
  }
}

function recyclePlatforms() {
  // Find the highest platform y (smallest y value)
  let highestY = platforms[0].y;
  for (let i = 1; i < platforms.length; i++) {
    if (platforms[i].y < highestY) highestY = platforms[i].y;
  }

  // Remove platforms that fell below the screen and replace them above the highest one
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > height + 50) {
      platforms.splice(i, 1);

      // Create a new platform above the current highest
      const newY = highestY - random(60, 100);
      platforms.push(makeRandomPlatform(newY));

      // Update highestY so the next one stacks above it
      highestY = newY;
    }
  }
}

function makeRandomPlatform(y) {
  const x = random(20, width - 20 - PLATFORM_W);
  return new Platform(x, y, PLATFORM_W, PLATFORM_H);
}

// Check if player fell below screen
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

  // Jump
  if (gameState === "playing" && keyCode === 32) {
    player.jump();
  }

  // Restart game
  if ((key === "r" || key === "R") && gameState === "gameover") {
    resetGame();
  }
}
