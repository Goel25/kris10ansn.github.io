const fps = 7, scl = 80;
var canvas, ctx, tilecount = 18, snake, xc, yc, end = false, ared = 'rgb(255, 50, 50)', score = 0, hscore = 0,
	apple = {
		x: tilecount - Math.round(tilecount/4),
		y: tilecount/2,
		color: ared,
		new: function() {
			this.x = Math.round(Math.random()*(tilecount - 1));
			this.y = Math.round(Math.random()*(tilecount - 1));

			for(let i = 0; i < blocks.length; i++) {
				if(this.x == blocks[i].x && this.y == blocks[i].y) {
					this.new();
				}
			}
		},
		draw() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x * scl, this.y * scl, scl, scl);
		}
	};

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = canvas.height = scl * tilecount;

	snake = new Snake(Math.round(tilecount/3));

	if(localStorage._hscore == null) { 
		if(hscore == null) {
			hscore = localStorage._hscore = 0;
		} else {
			localStorage._hscore = hscore;
		}
	} else { hscore = localStorage._hscore; }

	document.addEventListener('keydown', keyPressed);
	setInterval(game, 1000/fps);
}


function game() {
	if(end) { return; }

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	xc=yc=false;

	apple.draw();

	snake.update();
	snake.draw();

	drawScore();

	if(snake.x >= tilecount 
		|| snake.x < 0 
		|| snake.y >= tilecount 
		|| snake.y < 0
		|| snake.hitsTail()) { 

		snake.die();
		end = true;

		return;
	}

	if(snake.x == apple.x && snake.y == apple.y) {
		snake.eat();
		apple.new();
		score++;
	}

}

function drawScore() {
	if(score > hscore) { hscore = score; localStorage._hscore = hscore; }
	if(hscore > localStorage._hscore) { localStorage._hscore = hscore; }

	ctx.font = scl*2 + 'px Arial';
	ctx.fillStyle = '#fff';
	ctx.fillText(score, canvas.width/2 - ctx.measureText(score).width/2, scl*2.5);

	ctx.font = scl*0.5 + 'px Arial';
	ctx.fillStyle = '#fff';
	ctx.fillText('High score: ' + hscore, canvas.width/2 - ctx.measureText('High score: ' + hscore).width/2, scl*3.5);
}

function keyPressed(event) {
	if(end) { location.reload(); }

	let code = event.keyCode;

	switch (code) {

		//left
		case 37:
			if(yc || (snake.xv == 0 && snake.yv == 0)) { return; }

			snake.left();
			break;
		case 65:
			if(yc || (snake.xv == 0 && snake.yv == 0)) { return; }

			snake.left();
			break;
		
		//up
		case 38:
			if(xc) { return; }

			snake.up();
			break;
		case 87:
			if(xc) { return; }

			snake.up();
			break;

		//right
		case 39:
			if(yc) { return; }

			snake.right();
			break;
		case 68:
			if(yc) { return; }

			snake.right();
			break;

		//down
		case 40:
			if(xc) { return; }

			snake.down();
			break;
		case 83:
			if(xc) { return; }

			snake.down();
			break;

	}
}
