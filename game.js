let player; // Snowball
let platforms = []; // array of platforms
let gameState = "start";

// Score
let score = 0;

// Platform settings
const PLATFORM_W = 100;
const PLATFORM_H = 15;
const NUM_PLATFORMS = 12;
const MAX_GAP = 55; // never allow platforms farther apart than this (vertically)

//Snowflakes
let snowflakes = [];
const NUM_SNOWFLAKES = 120;

function randomGap() {
  return random(MAX_GAP - 10, MAX_GAP);
}

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
  resetSnow();
  resetGame();
}

window.setup = setup;

function resetGame() {
  // Create the player in the middle, near the bottom
  player = new Player(width / 2, height - 150);

  // Reset score
  score = 0;

  // Create a fresh set of platforms
  platforms = [];

  // Starter platform (normal)
  platforms.push(
    new Platform(
      player.x - PLATFORM_W / 2,
      height - 120,
      PLATFORM_W,
      PLATFORM_H,
      "normal"
    )
  );

  // Add the rest above it
  let y = height - 120;

  for (let i = 1; i < NUM_PLATFORMS; i++) {
    y -= randomGap();
    platforms.push(makeRandomPlatform(y));
  }

  // Start screen
  gameState = "start";
}

function draw() {
  // Background
  drawWinterBackground();
  drawSnow();

  // Update + draw platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].update();
    platforms[i].draw();
  }

  if (gameState === "playing") {
    player.update();
    handleCollisionsAndAutoJump();
    scrollWorldIfNeeded(); // moves platforms down + increases score
    recyclePlatforms(); // remove old + create new
    checkGameOver();
  }

  function drawWinterBackground() {
    // Gradient sky
    for (let y = 0; y < height; y++) {
      const t = y / height;

      const r = lerp(120, 200, t);
      const g = lerp(160, 225, t);
      const b = lerp(210, 255, t);

      stroke(r, g, b);
      line(0, y, width, y);
    }

    noStroke();

    // Snow at the bottom
    fill(235, 245, 255);
    ellipse(width * 0.3, height + 40, 400, 200);
    ellipse(width * 0.8, height + 60, 500, 240);
  }

  function drawSnow() {
    noStroke();
    fill(255, 230);

    for (let i = 0; i < snowflakes.length; i++) {
      const s = snowflakes[i];

      circle(s.x, s.y, s.r);

      // Move snow
      s.y += s.speed;
      s.x += s.drift;

      // Wrap around
      if (s.y > height + 10) {
        s.y = -10;
        s.x = random(width);
      }

      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;
    }
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
  fill(40, 70, 110);
  text("Snowy Doodle Jump", width / 2, 120);

  textSize(14);
  text("Press ENTER to start", width / 2, 250);
  text("← → to move", width / 2, 300);

  textSize(12);
  text("White = normal, Blue = moving, Dark blue = breaking", width / 2, 520);
}

// Text in playing state
function drawPlayingUI() {
  textSize(24);
  fill(40, 70, 110);
  text("Snowy Doodle Jump", width / 2, 40);

  textSize(14);
  text("← → to move", width / 2, 95);

  // Display score
  text("Score: " + score, width / 2, 130);
}

// Text in gameover state
function drawGameOverScreen() {
  textSize(26);
  fill(40, 70, 110);
  text("Game Over!", width / 2, 120);

  textSize(14);
  text("Press R to restart", width / 2, 190);
  text("Final score: " + score, width / 2, 220);
}

// Collision handling
function handleCollisionsAndAutoJump() {
  // Only land on platforms when falling
  if (player.vy > 0) {
    for (let i = 0; i < platforms.length; i++) {
      const p = platforms[i];

      // broken platforms don't collide
      if (p.broken) continue;

      if (isOnPlatform(player, p)) {
        // Place player on platform
        player.y = p.y - player.radius;

        // Auto-jump
        player.jump();

        // If it is a breaking platform, break it after landing
        p.break();

        // Stop after first platform hit this frame
        // (prevents double jumps if platforms overlap)
        break;
      }
    }
  }
}

function isOnPlatform(player, platform) {
  const playerBottomNow = player.y + player.radius;
  const playerBottomBefore = player.prevY + player.radius;

  const platformTop = platform.y;

  const crossedTop =
    playerBottomBefore <= platformTop && playerBottomNow >= platformTop;

  // Snowball overlaps platform
  const withinX =
    player.x + player.radius > platform.x &&
    player.x - player.radius < platform.x + platform.w;

  return crossedTop && withinX;
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
      const newY = highestY - randomGap();
      platforms.push(makeRandomPlatform(newY));

      // Update highestY so the next one stacks above it
      highestY = newY;
    }
  }
}

function makeRandomPlatform(y) {
  const x = random(20, width - 20 - PLATFORM_W);

  // Choose a type
  const r = random(1);
  let type = "normal";
  if (r < 0.12) type = "moving"; // 12%
  else if (r < 0.2) type = "breaking"; // 8%

  return new Platform(x, y, PLATFORM_W, PLATFORM_H, type);
}

// Check if player fell below screen
function checkGameOver() {
  if (player.y - player.radius > height) {
    gameState = "gameover";
  }
}

function resetSnow() {
  snowflakes = [];
  for (let i = 0; i < NUM_SNOWFLAKES; i++) {
    snowflakes.push({
      x: random(width),
      y: random(height),
      r: random(1, 4),
      speed: random(0.5, 2),
      drift: random(-0.3, 0.3),
    });
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

  // Restart game
  if ((key === "r" || key === "R") && gameState === "gameover") {
    resetGame();
  }
}
