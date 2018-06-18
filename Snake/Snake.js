var blocks = [];
var head = new Image();

function Snake(length) {
	this.x = canvas.width/2 - length*scl;
	this.y = canvas.height/2;

	this.xv = scl;
	this.yv = 0;

	this.setup = function() {
		head.src = './head.png';

		for(let i = 0; i < length; i++) {
			blocks.push(new Block(this.x - scl*i, this.y));
		}
	}

	this.update = function() {

		//Moving body
		this.newX = blocks[0].x + this.xv;
		this.newY = blocks[0].y + this.yv;

		for(let i = 0; i < blocks.length; i++) {
			this.thisX = blocks[i].x;
			this.thisY = blocks[i].y;

			blocks[i].x = this.newX;
			blocks[i].y = this.newY;

			blocks[i].xv = this.newX - this.thisX;
			blocks[i].yv = this.newY - this.thisY;

			this.newX = this.thisX;
			this.newY = this.thisY;
		}
		//

		//Setting x and y to head's x and y
		this.x = blocks[0].x;
		this.y = blocks[0].y;
		//

	}

	this.show = function() {

		blocks[0].showHead();

		for(let i = 1; i < blocks.length; i++) {
			blocks[i].show();
		}
	}

	this.eat = function(x) {

		let l = blocks.length - 1;

		for(let i = 0; i < x; i++) {
			blocks.push(new Block( (blocks[l].x + blocks[l].xv) , (blocks[l].y + blocks[l].yv) ));
		}
	}

	this.dir = function(x, y) {

		this.xv = scl*x;
		this.yv = scl*y;
	}

	this.isTaken = function(x, y) {

		if (blocks[0].x + scl * x == blocks[1].x) {
			return true;
		} else if (blocks[0].y + scl * y == blocks[1].y) {
			return true;
		}

		return false;
	}

	this.hitsTail = function() {

		for(let i = 1; i < blocks.length; i++) {

			if(blocks[0].x == blocks[i].x && blocks[0].y == blocks[i].y) {
				return true;
			}

		}

		return false;

	}

	this.shouldDie = function() {
		if(blocks[0].x >= canvas.width || blocks[0].x < 0 || blocks[0].y >= canvas.height || blocks[0].y < 0 || this.hitsTail()) {
			return true;
		} else {
			return false;
		}
	}

	this.showDead = function() {
		for(let i = 1; i < blocks.length; i++) {
			blocks[i].showDead();
		}
	}

}

function Block(x, y) {
	this.x = x;
	this.y = y;

	this.xv = 0;
	this.yv = 0;

	this.showHead = function() {
		context.drawImage(head, this.x, this.y, scl, scl);
	}

	this.show = function() {
		context.fillStyle = 'rgb(50, 255, 50)';
		context.fillRect(this.x, this.y, scl, scl);
	}

	this.showDead = function() {
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y, scl, scl);	
	}
}