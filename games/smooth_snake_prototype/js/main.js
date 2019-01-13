const tileCount = 13

// Type for vscode to understand
/** @type {HTMLCanvasElement} */
let canvas

// Type for vscode to understand
/** @type {CanvasRenderingContext2D} */
let ctx

let scl

let speed = 4.5

let snake

let apple

let pause = false

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
		apple.generateNew()
		snake.appendNew()
	}
	
	// Debug
	// if(keys['p'])
	// 	ctx = null
}

// Init function will get called when the site is fully loaded
window.onload = init

// Useful function
Array.prototype.last = function() {
	return this[this.length-1]
}