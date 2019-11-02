let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

//
//
//

window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

let mouse = {
	x: undefined,
	y: undefined
};

let colorArray = ["#2D2A40", "#F29F8D", "#F2786D", "#8C5D5D"];
let maxRadius = 40;

function Circle(x, y, dx, dy, circleRadius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.circleRadius = circleRadius;
	this.minRadius = circleRadius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	};

	this.update = function() {
		if (
			this.x + this.circleRadius > innerWidth ||
			this.x - this.circleRadius < 0
		) {
			this.dx = -this.dx;
		}

		if (
			this.y + this.circleRadius > innerHeight ||
			this.y - this.circleRadius < 0
		) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// Interactivity
		if (
			mouse.x - this.x < 50 &&
			mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 &&
			mouse.y - this.y > -50
		) {
			if (this.circleRadius < maxRadius) {
				this.circleRadius += 1;
			}
		} else if (this.circleRadius > this.minRadius) {
			this.circleRadius -= 1;
		}

		this.draw();
	};
}

let circleArray = [];

function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

function init() {
	circleArray = [];

	for (i = 0; i < 700; i++) {
		let circleRadius = Math.random() * 7 + 1;

		let x = Math.random() * (innerWidth - circleRadius * 2) + circleRadius;
		let dx = (Math.random() - 0.5) * 3;
		let y = Math.random() * (innerHeight - circleRadius * 2) + circleRadius;
		let dy = (Math.random() - 0.5) * 3;

		circleArray.push(new Circle(x, y, dx, dy, circleRadius));
	}
}

init();
animate();
