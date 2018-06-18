
const fps = 8, scl = 30;
var end = false, canvas, context, snake, apple, score = 0, highScore = 0;

var deadHead = new Image();

window.onload = function() {

	deadHead.src = './redHead.png';

	window.addEventListener("keydown", keyPressed, false);

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d')

	canvas.width = scl*18;
	canvas.height = scl*18;
	
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
				
				setTimeout(function() {
					snake.showDead();
					context.drawImage(deadHead, snake.x, snake.y, scl, scl);

					context.font = "50px Arial";
					context.fillStyle = 'rgb(255, 100, 100)';
					context.fillText("Refresh Page", canvas.width/2 - 150, canvas.height/2 - 50);
					context.fillText("(F5)", canvas.width/2 - 45, canvas.height/2);

				}, 200)
			}, 200)

			context.font = "50px Arial";
			context.fillStyle = 'white';
			context.fillText("" + score, canvas.width/2 - 17, scl*2);
		}

		if(score > highScore) {
			highScore = score;
		}

		context.font = "50px Arial";
		context.fillStyle = 'white';
		context.fillText("" + score, canvas.width/2 - 20, scl*2);

	}


}

function keyPressed(key) {

	this.keyCode = key.keyCode;

	switch(this.keyCode) {
		case 38: //up
			if(snake.yv == 0 && !snake.isTaken(0, -1)) {
				snake.dir(0, -1);
			}
			break;
		
		case 37: //left
			
			if(snake.xv == 0 && !snake.isTaken(-1, 0)) {
				snake.dir(-1, 0);
			}

			break;

		case 40: //down
			
			if(snake.yv == 0 && !snake.isTaken(0, 1)) {
				snake.dir(0, 1);
			}

			break;

		case 39: //right
			if(snake.xv == 0 && !snake.isTaken(1, 0)) {
				snake.dir(1, 0);
			}
			break;
	}

}