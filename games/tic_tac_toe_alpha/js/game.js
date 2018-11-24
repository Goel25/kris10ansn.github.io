const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], characters = ["X", "O"];
var moveNo = 0,

game = {
	turn: "X",
	id: null,
	started: false,
	end: false,
	winner: null,
	lastmove: null,
},

players = {
	self: {
		name: null,
		char: null,
		id: null,
	},
	opponent: {
		name: null,
		char: null,
		id: null,
	}
};

function update() {
	if(game.started) { loadData(game.id); }

	//Loading lobbies
	if(lobbyDiv.style.display == "block") {
		loadLobbies();
	}
	//

	//Win, draw, and message stuff
	let msg = "";

	if(checkWin(board, "X")) {
	
		game.end = true;
		game.winner = "X";
		msg = game.winner == players.self.char ? "You won the game!" : "Your opponent won the game!";
	
	} else if(checkWin(board, "O")) {

		game.end = true;
		game.winner = "O";
		msg = game.winner == players.self.char ? "You won the game!" : "Your opponent won the game!";
	
	} else if(checkDraw(board)) {

		msg = "It's a draw!";
		game.end = true;
	
	} else if(game.started && Date.now() - game.lastmove > 75000) {
	
		game.end = true;
		game.winner = game.turn == "X" ? "O" : "X";
		msg = game.winner == players.self.char ? "Your opponent lost on time!" : "You lost on time!";
	
	} else if(game.started) {
		
		msg = game.turn == players.self.char ? "Your turn!" : "Your opponent's turn!";
	
	} else if(!game.end && !game.started) {
		msg = "Waiting for someone to join the game...";
	}

	messageP.innerHTML = msg
	//


	//Displaying board values on html table
	for(let y = 0; y < board.length; y++) {
		for(let x = 0; x < board[y].length; x++) {
			let square = document.querySelectorAll('[row="' + y + '"][column="' + x + '"]')[0];
			if(board[y][x] !== 0) square.innerHTML = board[y][x];
		}
	}
	//
}

function move(square) {
	loadData(game.id);
	
	if(!game.started || game.end) return;


	let x = square.getAttribute("column");
	let y = square.getAttribute("row");

	if(board[y][x] == 0 && game.turn == players.self.char) {
		square.innerHTML = board[y][x] = players.self.char;
		
		
		moveNo++;
		game.turn = characters[moveNo % 2];
		game.lastmove = Date.now();

		updateData();
		
		if(checkWin(board, game.turn)) {
			game.started = false;
		}

		updateData();
	}
}

function checkWin(_board, player) {

	for(let i = 0; i < _board.length; i++) {
		let row = 0;
		let col = 0;
		let diag1 = 0;

		for(let j = 0; j < _board[i].length; j++) {
			if(_board[i][j] == player) row++;
			if(_board[j][i] == player) col++;
			if(_board[j][j] == player) diag1++;
		}
		
		if(row == _board.length || col == _board.length || diag1 == _board.length || (_board[0][2] == _board[1][1] && _board[1][1] == _board[2][0] && _board[2][0] == player) ) return true;
	}

	return false;
}

function checkDraw(_board) {
	if(checkWin(_board, "X") || checkWin(_board, "O")) return false;

	for(let i = 0; i < _board.length; i++) {
		for(let j = 0; j < board[i].length; j++) {
			if(_board[i][j] === 0) return false;
		}
	}
	return true;
}