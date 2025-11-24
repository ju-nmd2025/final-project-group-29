function setup() {
    createCanvas(400, 400);
}

let character = {
    x: 50,
    y: 50,
    w: 50,
    h: 50,
    draw() {
        rect(this.x, this.y, this.w, this.h);
    },
};

let platform = {
    x: 250,
    y: 250,
    w: 80,
    h: 20,

    draw() {
		push();
        fill("blue");
        rect(this.x, this.y, this.w, this.h);
		pop();
    },
};

// Obstacle / Spike / Death
function drawObstacle() {
    push();
    fill("red");
    triangle(180, 300, 210, 240, 240, 300);
    pop();
}

let x = 100;
let y = 100;

function draw() {
    background(100, 100, 100);

    character.draw();
	platform.draw();

    // drawPlatform(x, y + 150);

    // drawObstacle();

    // Floor
    line(0, 300, 400, 300);
}
