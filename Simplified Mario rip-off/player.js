class Player {

	constructor(x, y) {

		this.x = x;
		this.y = y;

		this.xv = 0;
		this.yv = 0;

		this.speed = 0.1;
		
		this.grav = 0.1;
		this.jh = 0.8;

		this.color = 'red';

		this.height = 2;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x*scl, this.y*scl - scl * Math.round(this.height/2), scl, scl*this.height);
	}

	update() {

		this.y += this.yv;

		if(this.collide()) {
			let old = {
				y: this.y,
				yv: this.yv,
				x: this.x
			};

			this.y = Math.round(this.y);
			this.y--;
			this.yv = 0;

			if(this.collide()) {
				this.y = old.y;
				this.yv = old.yv;

				this.y = Math.floor(this.y);
				this.y++;
				this.yv = this.grav;

				if(this.collide()) {
					this.y = old.y;
					this.yv = old.yv;

					this.x = Math.ceil(this.x);
					this.x--;

					if(this.collide()) {
						this.x = old.x;

						this.x = Math.floor(this.x);
						this.x++;

						if(this.collide()) {
							console.log("collision error");
						}
					}
				}
			}
		}

		//Check if player out of bounds
		if(Math.floor(this.x) < 0) { this.x = 0; this.xv = 0; }
		if(Math.ceil(this.x) > map[0].length - 1) { this.x = map[0].length - 1; this.xv = 0;}

		//friction
		this.xv *= 0.9;
		this.yv *= 0.9;

		//Moving stuff

		this.x += this.xv;

		if(this.yv !== 0) {
			this.yv += this.grav;
		}

		//
	
	}

	collide() {

		for(let i = 0; i < this.height; i++) {
			if(map[Math.floor(this.y) - i][Math.floor(this.x)] !== 0 || map[Math.floor(this.y) - i][Math.ceil(this.x)] !== 0) {
				return true;
			}
		}

		if(map[Math.floor(this.y)-Math.round(this.height/2)][Math.round(this.x)] 
		&& map[Math.floor(this.y)-Math.round(this.height/2)][Math.round(this.x)] !== 0) {
			return true;
		} else {
			return false
		}
	}

	touchMush() {
		for(let i = 0; i < this.height; i++) {
			if(Math.round(this.y) + i == Math.round(mushroom.y) && Math.round(this.x) == Math.round(mushroom.x)) {
				return true;
			}
		}
		return false;
	}

	right() {
		if(this.xv < this.speed*3) { this.xv += this.speed; }
	}

	left() {
		if(this.xv > 0 - (this.speed*3)) { this.xv -= this.speed; }
	}

	jump() {
		if(this.yv === 0) { this.yv = this.jh * -1; }
	}

}

function coin() {
	map[3][4] == 3;
}
