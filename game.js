let player; // Snowball
let platforms = []; // array of platforms

function setup() {
  // Create canvas
  createCanvas(400, 600);

  // Create player
  player = new Player(width / 2, height - 80);

  // Text setup
  textAlign(CENTER, CENTER);

  // Create platforms
  platforms.push(new Platform(80, 450, 100, 15));
  platforms.push(new Platform(230, 380, 100, 15));
  platforms.push(new Platform(60, 310, 100, 15));
  platforms.push(new Platform(220, 240, 100, 15));
  platforms.push(new Platform(120, 170, 100, 15));
}

function draw() {
  // Background
  background(150, 150, 150);

  // Ground
  noStroke();
  fill(240);
  rect(0, height - 40, width, 40);

  // ----- Draw platforms -----
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  // Update snowball position
  player.update();

  // Handle collisions with platforms and ground
  handleCollisions();

  // Draw snowball
  player.draw();

  // Title text
  fill(0);
  textSize(24);
  text("Doodle Jump", width / 2, 50);

  // Instructions text
  textSize(14);
  text("LEFT and RIGHT arrow to move, SPACE to jump", width / 2, 80);
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
  // Check collision with ground
  const groundTop = height - 40 - player.radius; // top of the ground
  if (player.y > groundTop) {
    player.y = groundTop;
    player.vy = 0;
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

// Lets player jump when SPACE is pressed
function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
