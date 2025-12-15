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

    // Color coding
    if (this.type === "normal") fill(235, 245, 255); // White
    if (this.type === "moving") fill(160, 205, 235); // Blue
    if (this.type === "breaking") fill(90, 140, 190); // Dark blue

    rect(this.x, this.y, this.w, this.h, 7);
    fill(255, 240);
    rect(this.x, this.y, this.w, 4, 7);
  }
}
