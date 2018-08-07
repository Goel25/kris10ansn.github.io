var keyImg, timer, current, rscore = 0, end = false, rhscore = 0, rtime = 15, completeEnd = false,
keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function setup_reactionclick() {

	if(localStorage._rhscore != null) {
		rhscore = localStorage._rhscore;
	} else {
		localStorage._rhscore = 0; rhscore = 0;
	}

	keyImg = new Image();
	keyImg.src = 'src/key.png';

	timer = new Timer(rtime);

	current = newKey();

	document.addEventListener('keydown', r_keyDown);

	window.requestAnimationFrame(r_draw);
}

function r_draw() {
	//Background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Timer
	timer.draw();

	//Instructions
	let instructions = "Click the key showed on screen!";
	ctx.fillStyle = 'white';
	ctx.font = '20px Arial';
	ctx.fillText(instructions, canvas.width/2 - ctx.measureText(instructions).width/2, 125);

	//Key image
	ctx.drawImage(keyImg, canvas.width/2 - keyImg.width/2, canvas.height/2 - keyImg.height/2);

	//Key character
	ctx.fillStyle = 'black';
	ctx.font = '80px Arial';
	ctx.fillText(current.toUpperCase(), canvas.width/2 -ctx.measureText(current.toUpperCase()).width/2, canvas.height/2 + 15);

	//Score text
	ctx.fillStyle = 'white';
	ctx.font = '30px Arial';
	ctx.fillText(rscore, canvas.width/2 - ctx.measureText(rscore).width/2, canvas.height - 50)

	if(!end) { window.requestAnimationFrame(r_draw); } else { r_end(); }
}

function r_keyDown(e) {
	if(e.key == current && !end) {
		rscore++;
		current = newKey(current);
	}
	else if(!end) {
		rscore--;
	} else if(completeEnd) {
		location.reload();
	}
}

function newKey(prev) {
	let new = keys[ Math.round( Math.random() * (keys.length-1) ) ];
	
	if(new == prev) {
		return newKey(prev);
	} else {
		return new;
	}
}

function r_end() {
	if(rscore > rhscore) {
		rhscore = rscore;

		localStorage._rhscore = rscore;

	}

	let i = 0;
	let tx = canvas.width/2 - ctx.measureText(rscore).width/2, 
	ty = canvas.height - 50;

	let intervl = setInterval(() => {

		i++;
		ty--;
		tx += (canvas.width/2 - tx - ctx.measureText(rscore).width)/100;

		//Background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//text
		ctx.fillStyle = 'white';
		ctx.font = i + 'px Arial';
		ctx.fillText(rscore, tx, ty);

		if(i > 200) { 
			//High score text
			ctx.fillStyle = 'white';
			ctx.font = '60px Arial';
			ctx.fillText("High Score: " + rhscore, canvas.width/2 - ctx.measureText("High Score: " + rhscore).width/2, ty + 125);

			//Keys per second text
			let kps = "You typed " + (rscore/rtime).toFixed(4) + " right keys per second!";

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
