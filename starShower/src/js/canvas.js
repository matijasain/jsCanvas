import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners

addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// Objects
function Star(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.velocity = {
		x: 0,
		y: 3
	};
	this.friction = 0.8;
	this.gravity = 1;
}

Star.prototype.draw = function() {
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	c.fillStyle = this.color;
	c.fill();
	c.closePath();
};

Star.prototype.update = function() {
	this.draw();

	// When star hits bottom of the screen
	if (this.y + this.radius + this.velocity.y > canvas.height) {
		this.velocity.y = -this.velocity.y * this.friction;
	} else {
		this.velocity.y += this.gravity;
	}

	this.y += this.velocity.y;
};

// Implementation
let stars;
function init() {
	stars = [];

	for (let i = 0; i < 1; i++) {
		stars.push(new Star(canvas.width / 2, 30, 30, "blue"));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	stars.forEach(star => {
		star.update();
	});
}

init();
animate();
