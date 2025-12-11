let player; // Snoowball
let platforms = []; // array of platforms

function setup() {
  // Create canvas
  createCanvas(400, 600);

  // Create player
  player = new Player(width / 2, height - 80);

  // Text setup
  textAlign(CENTER, CENTER);

  // Creates platforms
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

  // Update and draw snowball player
  player.update();
  player.draw();

  // Title text
  fill(0);
  textSize(24);
  text("Doodle Jump", width / 2, 50);

  // Instructions text
  textSize(14);
  text("LEFT and RIGHT arrow to move, SPACE to jump", width / 2, 80);
}

// Lets player jump when SPACE is pressed
function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
