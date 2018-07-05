const fps = 30, tiles = ['#dbbc7d', 'green', 'brown', '#ffffff', 'orange', '#b85000'];
var ctx, canvas, scl, player, mushroom,
map = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 3, 5, 3, 3, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

window.onload = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	window.addEventListener('keydown', keyPressed);
	window.addEventListener('keyup', keyPressed);

	scl = canvas.width/map.length

	player = new Player(2, 7);

	setInterval(draw, 1000 / fps);
}

function draw() {
	//Background
	ctx.fillStyle = '#6bbaff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if(Math.round(player.x) == 4 && Math.floor(player.y) - player.height/2 == 5 && mushroom == null) {
		map[3][4] = 6;
		mushroom = new Mushroom(4, 2);
	}

	drawBoard();

	if(mushroom != null) {
		mushroom.draw();
		if(player.touchMush()) {
			mushroom = null;
			player.height = 3;
		}
	}
	
	player.update();
	player.draw();

}

function drawBoard() {
	for(let y = 0; y < map.length; y++) {
		for(let x = 0; x < map[y].length; x++) {
			if(map[y][x] > 0) {
				ctx.fillStyle = tiles[map[y][x] - 1];
				ctx.fillRect(x * scl, y*scl, scl, scl);
			}
		}
	}
}

function keyPressed(e) {

	if(!(e.type == "keydown") ? true:false) {return;}

	let code = e.keyCode;

	if(code == 38) {
		player.jump();
	}

	switch(code) {
		case 87:
		case 38: 
			player.jump();
			break;
		case 65:
		case 37:
			player.left();
			break;
		case 68:
		case 39:
			player.right();
			break;
	}

}
