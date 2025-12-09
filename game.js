function setup() {
  // Create canvas
  createCanvas(400, 700);

  // Text setup
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  // Background
  background(150, 150, 150);

  // Ground
  noStroke();
  fill(240);
  rect(0, height - 100, width, 100);

  // Title text
  fill(0);
  text("Doodle Jump", width / 2, height / 2 - 300);
}
