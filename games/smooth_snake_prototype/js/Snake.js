class BodyPart {
	constructor(x, y, dir) {
		this.x = x
		this.y = y
		this.dir = dir
	}

	collides(it) {
		return (this.xx == it.xx) && (this.yy == it.yy)
	}

	get xx() { return Math.round(this.x/scl) }
	get yy() { return Math.round(this.y/scl) }
}

class Snake {
	constructor(x, y, length, color) {
		this.x = x
		this.y = y
		this.color = color
		
		this.timer = 0
		this.body = []

		this.dir = { x: 0, y:0 }
		this.newDir = { x: 0, y:0 }

		this.face = new Image()
		this.face.src = "images/head.png"
		
		for (var i = 0; i < length; i++) {
			this.body.push(
				new BodyPart((this.x-i) * scl, this.y*scl, { x: 1, y: 0 })
			)
		}
	}

	update() {
		
		if((keys['w'] || keys['ArrowUp']) && this.dir.y == 0) {
			this.newDir.y = -1
			this.newDir.x = 0
		}
		if((keys['a'] || keys['ArrowLeft']) && this.dir.x == 0) {
			this.newDir.x = -1
			this.newDir.y = 0
		}
		if((keys['s'] || keys['ArrowDown']) && this.dir.y == 0) {
			this.newDir.y = 1
			this.newDir.x = 0
		}
		if((keys['d'] || keys['ArrowRight']) && this.dir.x == 0) {
			this.newDir.x = 1
			this.newDir.y = 0
		}

		if(this.dir.x == 0 && this.dir.y == 0 && this.newDir.x == 0 && this.newDir.y == 0)
			return;
		
		this.timer++
		if((this.head.x / scl).toFixed(1).substr(-1) == 0 && (this.head.y / scl).toFixed(1).substr(-1) == 0) {
			this.dir.x = this.newDir.x
			this.dir.y = this.newDir.y

			this.head.dir.x = this.dir.x
			this.head.dir.y = this.dir.y

			for(let i = 1; i < this.length; i++) {
				if(this.head.collides(this.body[i])) {
					console.log("IMPROVE THIS. TEST PURPOSE ONLY.")
					pause = true
				}
			}

			for(let i = this.length-1; i > 0; i--) {
				this.body[i].dir.x = (this.body[i-1].x - this.body[i].x)/scl
				this.body[i].dir.y = (this.body[i-1].y - this.body[i].y)/scl
			}
		}

		this.body.forEach (it => {
			it.x += it.dir.x * speed
			it.y += it.dir.y * speed
		})

	}
	
	draw() {
		this.body.forEach(it => {
			ctx.fillStyle = this.color
			ctx.fillRect(it.x, it.y, scl, scl)

			// Draw Hitbox
			if(keys['Shift']) {
				ctx.strokeStyle = "red"
				ctx.strokeRect(it.xx*scl, it.yy*scl, scl, scl)
			}
		});

		ctx.drawImage(this.face, this.head.x, this.head.y, scl, scl)
	}

	appendNew() {
		let last = this.tail
		this.body.push(
			new BodyPart(last.x + last.dir.x, last.y + last.dir.y, {
				x: last.x - (last.x + last.dir.x), 
				y: last.y - (last.y + last.dir.y)
			})
		)
	}

	get length() { return this.body.length }
	get head() { return this.body[0] }
	get tail() { return this.body[this.body.length-1] }
	get xx() { return this.head.xx }
	get yy() { return this.head.yy }
}