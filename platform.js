// Platform class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    noStroke();
    fill(255, 255, 255);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}
