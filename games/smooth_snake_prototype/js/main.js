
// Types are for vscode to understand

/** @type {HTMLCanvasElement} */
let canvas

/** @type {CanvasRenderingContext2D} */
let ctx

/** @type {Snake} */
let snake

/** @type {Apple} */
let apple

let scl

let speed = 5.25

let pause = false

const tileCount = 13

function init() {
	canvas = document.querySelector("#canvas")
	ctx = canvas.getContext("2d")

	scl = canvas.width/tileCount

	apple = new Apple(9, Math.floor(tileCount/2), 5)

	snake = new Snake(4, Math.floor(tileCount/2), 3, "rgb(50, 255, 50)")

	setInterval(loop, 1000/90)
}

function loop() {
	if (pause) return

	// Background
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	apple.draw()
	
	snake.update()
	snake.draw()

	if(snake.head.collides(apple)) {
		// Generates new position for the apple and
		// appends new bodypart to tail if the head hits/eats the apple
		apple.generateNew()
		snake.appendNew()
	}
}

// Init function will get called when the site is fully loaded
window.onload = init