
const fps = 8, scl = 30;
var end = false, canvas, context, snake, apple, score = 0, highScore = 0, size = 18;
var deadHead = new Image();

window.onload = function() {

	loadScore();

	deadHead.src = './redHead.png';

	window.addEventListener("keydown", keyPressed, false);

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d')

	canvas.width = scl*size;
	canvas.height = scl*size;
	
	snake = new Snake(4);
	snake.setup();

	apple = new Apple();

	setInterval(draw, 1000/fps);

}

function draw() {

	if(!end) {
		//Background
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		apple.show();

		snake.update();
		snake.show();

		if(snake.x == apple.x && snake.y == apple.y) {
			apple.newLoc();
			snake.eat(1);
			score++;
		}

		if(snake.shouldDie()) {
			end = true;

			snake.showDead();
			context.drawImage(deadHead, snake.x, snake.y, scl, scl);

			setTimeout(function() {

				snake.show();
				context.drawImage(head, snake.x, snake.y, scl, scl);
				
				setTimeout(() => {
					snake.showDead();
					context.drawImage(deadHead, snake.x, snake.y, scl, scl);

					displayDeath();

					saveScore();
				}, 200)
			}, 200)

			context.font = "50px Arial";
			context.fillStyle = 'white';
			context.fillText("" + score, canvas.width/2 - context.measureText(score).width/2, scl*2);
		}

		if(score > highScore) {
			highScore = score;
			saveScore();
		}

		context.font = "50px Arial";
		context.fillStyle = 'white';
		context.fillText("" + score, canvas.width/2 - context.measureText(score).width/2, scl*2);

		context.font = "25px Arial";
		context.fillText("High score: " + highScore, canvas.width/2 - context.measureText("High score: " + highScore).width/2, scl*3);

	}


}

function displayDeath() {

	let txt = "YOU DIED";

	context.font = "bold 30px Arial";
	context.fillStyle = "black";
	context.fillText(txt, canvas.width/2 - context.measureText(txt).width/2 + 2, canvas.height/2 + 2);

	context.fillStyle = "red";
	context.fillText(txt, canvas.width/2 - context.measureText(txt).width/2, canvas.height/2);

	let msg = "Press any key to restart";

	context.fillStyle = "black";
	context.font = "bold 30px Arial";
	context.fillText(msg, canvas.width/2 - context.measureText(msg).width/2 + 2, canvas.height/2 + 32);

	context.fillStyle = "red";
	context.fillText(msg, canvas.width/2 - context.measureText(msg).width/2, canvas.height/2 + 30);

}

function saveScore() {
	if(localStorage._hscore == null) { localStorage._hscore = 0; } else if(highScore == null) {highScore = 0;}
	if(score > localStorage._hscore) { localStorage._hscore = score; console.log("test");}
}

function loadScore() {
	if(localStorage._hscore == null) { highScore = 0; return;}
	highScore = localStorage._hscore;
}

function keyPressed(key) {

	this.keyCode = key.keyCode;

	if(end) { location.reload(); }

	switch(this.keyCode) {
		case 87: //w
			if(snake.yv == 0 && !snake.isTaken(0, -1)) {
				snake.dir(0, -1);
			}
			break;
		case 38: //up
			if(snake.yv == 0 && !snake.isTaken(0, -1)) {
				snake.dir(0, -1);
			}
			break;
		case 65: //a
			
			if(snake.xv == 0 && !snake.isTaken(-1, 0)) {
				snake.dir(-1, 0);
			}

			break;
			
		case 37: //left
			
			if(snake.xv == 0 && !snake.isTaken(-1, 0)) {
				snake.dir(-1, 0);
			}

			break;
			
		case 83: //s
			
			if(snake.yv == 0 && !snake.isTaken(0, 1)) {
				snake.dir(0, 1);
			}

			break;
		case 40: //down
			
			if(snake.yv == 0 && !snake.isTaken(0, 1)) {
				snake.dir(0, 1);
			}

			break;
		case 68: //d
			if(snake.xv == 0 && !snake.isTaken(1, 0)) {
				snake.dir(1, 0);
			}
			break;
		case 39: //right
			if(snake.xv == 0 && !snake.isTaken(1, 0)) {
				snake.dir(1, 0);
			}
			break;
	}

}
