// Player class (snowball)
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = 20; // size
    this.vx = 0;
    this.vy = 0;

    this.speed = 4; // speed movement left/right
    this.gravity = 0.5; // speed falling down
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
    // Apply gravity
    this.vy += this.gravity; // fall down
    this.y += this.vy;

    const groundY = height - 40 - this.radius;

    if (this.y > groundY) {
      this.y = groundY;
      this.vy = 0; // stop falling when on the ground
    }
  }

  jump() {
    const groundY = height - 40 - this.radius;
    if (this.y >= groundY) {
      this.vy = this.jumpPower;
    }
  }

  draw() {
    // Draw snowball
    noStroke();
    fill(255);
    circle(this.x, this.y, this.radius * 2);
  }
}
