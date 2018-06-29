var canvas, ctx, start,
colors = ['white', 'black'],
mouse = {
	x: 0,
	y: 0,
};

var btn1 = {
	txt: "Pure Clicking!",
	clr: 0,
},
btn2 = {
	txt: "Reaction clicker!",
	clr: 1,
};

window.onload = function() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	start = false;

	canvas.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX - canvas.offsetLeft;
		mouse.y = e.clientY - canvas.offsetTop;
	});

	canvas.addEventListener('mousedown', (e) => {
		if(!start) {
			
			start = true;

			if(btn1.clr == 0) {
				setup_pureclick();
			}
			else if(btn2.clr == 0) {
				setup_reactionclick();
			}

		}
	})

	window.requestAnimationFrame(drawButtons);
}

function drawButtons() {
	//Background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Buttons
	ctx.fillStyle = colors[btn1.clr];
	ctx.fillRect(0, 0, canvas.width/2, canvas.height);

	ctx.fillStyle = colors[btn2.clr];
	ctx.fillRect(canvas.width/2, 0, canvas.width, canvas.height);

	//Button text
	ctx.fillStyle = colors[1 - btn1.clr];
	ctx.font = '40px Arial';
	ctx.fillText(btn1.txt, canvas.width/4 - ctx.measureText(btn1.txt).width/2, canvas.height/2);

	ctx.fillStyle = colors[1 - btn2.clr];
	ctx.font = '40px Arial';
	ctx.fillText(btn2.txt, ((canvas.width/4) * 3) - ctx.measureText(btn2.txt).width/2, canvas.height/2);

	if(mouse.x - 50 /* -50 because x is inaccurate */ < canvas.width/2) {
	
		btn1.clr = 0;
		btn2.clr = 1;
	
	} else {

		btn1.clr = 1;
		btn2.clr = 0;

	}

	if(!start) { window.requestAnimationFrame(drawButtons); }
}