/*

ALL END VARIABLES ARE DEFINED IN reactionclick.js! DONT BE CONFUSED

*/

var pscore = 0, phscore, p_timer, particles = [];

function setup_pureclick() {
	p_timer = new Timer(15);

	if(localStorage._phscore != null) {
		phscore = localStorage._phscore;
	} else {
		localStorage._phscore = 0;
		phscore = 0;
	}

	document.addEventListener('mousedown', p_mousePressed);
	document.addEventListener('keydown', p_keyPressed);

	window.requestAnimationFrame(p_draw);
}

function p_draw() {


	//Background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Timer
	p_timer.draw();

	//Particles
	for(let i = 0; i < particles.length; i++) {
		particles[i].update();
	}

	//Score
	ctx.fillStyle = 'white';
	ctx.font = '30px Arial';
	ctx.fillText(pscore, canvas.width/2 - ctx.measureText(pscore).width/2, canvas.height - 50);

	if(!end) { window.requestAnimationFrame(p_draw); } else { p_end(); }
}

function p_mousePressed() {
	if(!end) {
		pscore++;
		particles.push(new Pluspt());
	} else if(completeEnd) {

	}
}

function p_keyPressed() {
	if(completeEnd) {
		location.reload();
	}
}

function p_end() {
	if(pscore > phscore) {
		phscore = pscore;

		localStorage._phscore = pscore;

	}

	let i = 0;
	let tx = canvas.width/2 - ctx.measureText(pscore).width/2, 
	ty = canvas.height - 50;

	let intervl = setInterval(() => {

		i++;
		ty--;
		tx += (canvas.width/2 - tx - ctx.measureText(pscore).width)/100;

		//Background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//text
		ctx.fillStyle = 'white';
		ctx.font = i + 'px Arial';
		ctx.fillText(pscore, tx, ty);

		if(i > 200) { 
			//High score text
			ctx.fillStyle = 'white';
			ctx.font = '60px Arial';
			ctx.fillText("High Score: " + phscore, canvas.width/2 - ctx.measureText("High Score: " + phscore).width/2, ty + 125);

			//Keys per second text
			let kps = "You typed " + (pscore/rtime).toFixed(4) + " right keys per second!";

			ctx.fillStyle = 'white';
			ctx.font = '20px Arial';
			ctx.fillText(kps, canvas.width/2 - ctx.measureText(kps).width/2, ty - 200);

			//Press any key to restart text
			let msg = "Press any key to restart!";

			ctx.fillStyle = 'red';
			ctx.font = '20px Arial';
			ctx.fillText(msg, canvas.width/2 - ctx.measureText(msg).width/2, 75);


			completeEnd = true;

			//Ends interval
			clearInterval(intervl);
		}

	}, 10);
}

class Pluspt {
	constructor() {
		this.x = mouse.x - 60;
		this.y = mouse.y - 60;
		this.speed = 10;
		this.lifetime = 0;
		this.dead = false;
	}

	update() {

		if(!this.dead) {

			this.x += Math.random()*this.speed - this.speed/2;
			this.y += Math.random()*this.speed - this.speed/2;

			//Lifetime
			this.lifetime++;

			if(this.lifetime > 30) {
				this.dead = true;
			}

			//Draw
			ctx.fillStyle = 'white';
			ctx.font = '30px Arial';
			ctx.fillText("+1", this.x, this.y);

		}
	}
}