const ts = 100;

class Timer {

	constructor(secs) {
		this.time = secs;
		this.size = ts;

		this.interval = setInterval(() => {
			this.time--;

			if(this.time <= 0) {
				end = true;
				clearInterval(this.interval);
			}

			this.size = ts;

		}, 1000);
	}

	draw() {

		ctx.fillStyle = 'white';
		ctx.font = this.size + 'px Arial';
		ctx.fillText(this.time, canvas.width/2 - ctx.measureText(this.time).width/2, 100);

		this.size--;
	}

}