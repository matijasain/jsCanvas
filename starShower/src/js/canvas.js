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
	this.friction = 0.7;
	this.gravity = 3.1;
}

Star.prototype.draw = function() {
	c.save();
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	c.fillStyle = this.color;
	c.shadowColor = "#e3eaef";
	c.shadowBlur = 20;
	c.fill();
	c.closePath();
	c.restore();
};

Star.prototype.update = function() {
	this.draw();

	// When star hits bottom of the screen
	if (this.y + this.radius + this.velocity.y > canvas.height) {
		this.velocity.y = -this.velocity.y * this.friction;
		this.shatter();
	} else {
		this.velocity.y += this.gravity;
	}

	this.y += this.velocity.y;
};

Star.prototype.shatter = function() {
	this.radius -= 3;
	for (let i = 0; i < 7; i++) {
		miniStars.push(new MiniStar(this.x, this.y, 2));
	}
};

function MiniStar(x, y, radius, color) {
	Star.call(this, x, y, radius, color);

	this.velocity = {
		x: utils.randomIntFromRange(-5, 5),
		y: utils.randomIntFromRange(-15, 15)
	};
	this.friction = 0.8;
	this.gravity = 0.2;
	this.timeTolive = 320;
	this.opacity = 1;
}

MiniStar.prototype.draw = function() {
	c.save();
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
	c.shadowColor = "#e3eaef";
	c.shadowBlur = 20;
	c.fill();
	c.closePath();
	c.restore();
};

MiniStar.prototype.update = function() {
	this.draw();

	// When star hits bottom of the screen
	if (this.y + this.radius + this.velocity.y > canvas.height) {
		this.velocity.y = -this.velocity.y * this.friction;
	} else {
		this.velocity.y += this.gravity;
	}

	this.x += this.velocity.x;
	this.y += this.velocity.y;
	this.timeTolive -= 1;
	this.opacity -= 1 / this.timeTolive;
};

function createMountainRange(mountainAmount, height, color) {
	for (let i = 0; i < mountainAmount; i++) {
		const mountainWidth = canvas.width / mountainAmount;

		c.beginPath();
		c.moveTo(i * mountainWidth, canvas.height);
		c.lineTo(i * mountainWidth + mountainWidth + 490, canvas.height);
		c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
		c.lineTo(i * mountainWidth - 490, canvas.height);
		c.fillStyle = color;
		c.fill();
		c.closePath();
	}
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");

let stars;
let miniStars;
let backgroundStars;
function init() {
	stars = [];
	miniStars = [];
	backgroundStars = [];

	for (let i = 0; i < 1; i++) {
		stars.push(new Star(canvas.width / 2, 30, 30, "#e3eaef"));
	}

	for (let i = 0; i < 150; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		const radius = Math.random() * 3;

		backgroundStars.push(new Star(x, y, radius, "white"));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = backgroundGradient;
	c.fillRect(0, 0, canvas.width, canvas.height);

	backgroundStars.forEach(backgroundStar => {
		backgroundStar.draw();
	});

	createMountainRange(1, canvas.height - 60, "#384551");
	createMountainRange(2, canvas.height - 110, "#2b3843");
	createMountainRange(3, canvas.height - 520, "#26333e");

	stars.forEach((star, index) => {
		star.update();
		if (star.radius == 0) {
			stars.splice(index, 1);
		}
	});

	miniStars.forEach((miniStar, index) => {
		miniStar.update();
		if (miniStar.timeTolive == 0) {
			miniStars.splice(index, 1);
		}
	});
}

init();
animate();
