let player;

function setup() {
  // Create canvas
  createCanvas(400, 600);

  // Create player
  player = new Player(width / 2, height - 80);

  // Text setup
  textAlign(CENTER, CENTER);
}

function draw() {
  // Background
  background(150, 150, 150);

  // Ground
  noStroke();
  fill(240);
  rect(0, height - 40, width, 40);

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
