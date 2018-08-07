var blocks = [], green = 'rgb(50, 255, 50)', color = green;

class Snake {
	constructor(length) {
		this.x = tilecount/2 - length - 1;
		this.y = tilecount/2;

		this.xv = 0;
		this.yv = 0;

		for(let i = length-1; i >= 0; i--) {
			blocks.push(new Block(this.x + i, this.y));
		}
	}

	draw() {
		for(let i = 0; i < blocks.length; i++) {
			if(i == 0) {
				blocks[0].drawHead();
				continue;
			}

			blocks[i].draw();
		}
	}

	update() {
		if(this.xv == 0 && this.yv == 0) { return; }

		let newX = blocks[0].x + this.xv, 
			newY = blocks[0].y + this.yv;

		for(let i = 0; i < blocks.length; i++) {
			let prevX = blocks[i].x, 
				prevY = blocks[i].y;

			blocks[i].x = newX;
			blocks[i].y = newY;

			blocks[i].xv = newX - prevX;
			blocks[i].yv = newY - prevY;

			newX = prevX;
			newY = prevY;
		}

		this.x = blocks[0].x;
		this.y = blocks[0].y;
	}

	eat() {
		let l = blocks.length-1;
		blocks.push( new Block( blocks[l].x + blocks[l].xv , blocks[l].y + blocks[l].yv ) );
	}

	hitsTail() {
		for(let i = 2; i < blocks.length; i++) {
			if(blocks[0].x == blocks[i].x && blocks[0].y == blocks[i].y) {
				return true;
			}
		}
		return false;
	}

	die() {
		color = 'red';
		this.draw();

		setTimeout(() => { color = green; this.draw(); blocks[0].drawHead(); setTimeout(() => { color = 'red'; this.draw(); blocks[0].drawHead(); }, 200) }, 200)
	}

	up() {
		if(this.yv !== 0) { return; }
		yc = true;

		this.yv = -1;
		this.xv = 0;
	}

	down() {
		if(this.yv !== 0) { return; }
		yc = true;

		this.yv = 1;
		this.xv = 0;
	}

	left() {
		if(this.xv !== 0) { return; }
		xc = true;

		this.yv = 0;
		this.xv = -1;
	}

	right() {
		if(this.xv !== 0) { return; }
		xc = true;

		this.yv = 0;
		this.xv = 1;
	}
}

class Block {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.xv = 0;
		this.yv = 0;

		this.color = green;

		this.head = new Image();
		this.head.src = 'images/head.png';
	}

	draw() {
		ctx.fillStyle = color;
		ctx.fillRect(this.x*scl, this.y*scl, scl, scl);
		// ctx.strokeStyle = 'black';
		// ctx.strokeRect(this.x*scl, this.y*scl, scl, scl);
	}

	drawHead() {
		if(color == green) {
			this.head.src = 'images/head.png'
		} else {
			this.head.src = 'images/redHead.png'
		}
		ctx.drawImage(this.head, this.x * scl, this.y * scl, scl, scl);

		// ctx.strokeStyle = 'black';
		// ctx.strokeRect(this.x*scl, this.y*scl, scl, scl);
	}
}