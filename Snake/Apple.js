function Apple() {

	this.x = canvas.width - scl * 3;
	this.y = canvas.height/2;

	this.show = function() {
		context.fillStyle = 'rgb(255, 50, 50)';
		context.fillRect(this.x, this.y, scl, scl)
	}

	this.newLoc = function() {
		this.x = Math.round((Math.random()*(canvas.width/scl - 2)) + 1) * scl;
		this.y = Math.round((Math.random()*(canvas.height/scl - 2)) + 1) * scl;
		
		for(let i = 0; i < blocks.length; i++) {
			if(this.x == blocks[i].x && this.y == blocks[i].y) {
				this.newLoc();
			}
		}
	}
}
