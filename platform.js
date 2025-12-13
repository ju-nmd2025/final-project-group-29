// Platform class
class Platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.type = type;

    // Moving platforms
    this.vx = type === "moving" ? 2 : 0;

    // Breaking platforms
    this.broken = false;
  }

  update() {
    if (this.type === "moving") {
      this.x += this.vx;

      // bounce off edges
      if (this.x < 0 || this.x + this.w > width) {
        this.vx *= -1;
      }
    }
  }

  break() {
    if (this.type === "breaking") {
      this.broken = true;
    }
  }

  draw() {
    if (this.broken) return; // don't draw if broken

    noStroke();

    // Simple color coding
    if (this.type === "normal") fill(210, 240, 255); // icy blue
    if (this.type === "moving") fill(180, 230, 255); // darker blue
    if (this.type === "breaking") fill(255, 210, 210); // pink-ish

    rect(this.x, this.y, this.w, this.h, 5);
  }
}
