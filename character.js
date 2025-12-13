// Player class (snowball)
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = 20; // size of snowball
    this.vx = 0; // speed left/right
    this.vy = 0; // speed up/down

    this.speed = 4; // how fast player moves left/right
    this.gravity = 0.5; // how fast player falls down
    this.jumpPower = -10; // how strong the jump is
  }

  update() {
    // --- Horizontal movement ---
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;

    // --- Vertical movement ---
    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;
  }

  jump() {
    this.vy = this.jumpPower;
  }

  draw() {
    // Draw snowball
    noStroke();
    fill(255);
    circle(this.x, this.y, this.radius * 2);
  }
}
