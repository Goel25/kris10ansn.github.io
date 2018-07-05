class Mushroom {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.yv = 0;
		this.xv = 0.1;
	}

	draw() {
		this.update();

		ctx.fillStyle = '#ff2e2e';
		ctx.fillRect(this.x * scl, this.y * scl, scl, scl);

		ctx.fillStyle = 'white';
		ctx.fillRect(this.x * scl, this.y * scl, scl, scl/3);

	}

	update() {
		this.yv += player.grav;

		if(map[Math.round(this.y) + 1][Math.round(this.x)]
		&& map[Math.round(this.y) + 1][Math.round(this.x)] != 0) {

			this.yv = 0;
			this.y = Math.round(this.y);
		
		}

		if(this.x >= map.length-1 || this.x <= 0) {this.xv *= -1}
		
		this.y += this.yv;
		this.x += this.xv;

		this.yv *= 0.9;
	}

}