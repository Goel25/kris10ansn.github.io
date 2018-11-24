const db = firebase.firestore(), settings = { timestampsInSnapshots: true };
db.settings(settings);

function loadData(id) {
	db.collection("games").doc(game.id).get().then(snapshot =>{
		const data = snapshot.data();
		board[0] = data.r0.slice(0);
		board[1] = data.r1.slice(0);
		board[2] = data.r2.slice(0);

		if(data.p1.id == players.self.id) {

			players.self.name = data.p1.name;
			players.opponent.char = data.p2.char;

			players.self.char = data.p1.char;
			players.opponent.name = data.p2.name;

		} else if(data.p2.id == players.self.id) {

			players.self.name = data.p2.name;
			players.opponent.char = data.p1.char;

			players.self.char = data.p2.char;
			players.opponent.name = data.p1.name;
		}

		moveNo = data.move;
		game.turn = data.turn;
		game.started = data.started;
		game.lastmove = data.lastmove;
	})
	.catch(error => {
		console.log("error: " + error);

		db.collection("lobbies").doc(game.id).delete().then(()=>{}).catch(error => { console.log("Failed to delete lobby: " + error) })

		alert("Game expired");
		location.reload();
	})
}

function updateData() {
	db.collection("games").doc(game.id).update({
		r0: board[0],
		r1: board[1],
		r2: board[2],
		turn: game.turn,
		move: moveNo,
		started: game.started,
		lastmove: game.lastmove
	})
	.then(()=>{
	})
	.catch(error => {
		console.error("Couldn't update because: \n\n" + error);
	})
}


function join(_id) {
	game.lastmove = Date.now();

	db.collection("games").doc(_id).update({
		players:2,
		started: true,
		lastmove: game.lastmove,
		p2: {
			name: players.self.name,
			id: players.self.id,
			char: "O",
		}
	})
	.then(()=>{
		game.id = _id;

		//Deleting lobby, so noone else can join the game
		db.collection("lobbies").doc(_id).delete()
		.then(() => {
			console.log("Succsessful deletion")
		})
		.catch((error)=>{
			console.error("error deleting  lobby: " + error);
		})
		//
		loadData(game.id);
		show("game");
	})
	.catch(error => {
		console.error(error);
	});


}

function create(_name) {
	players.self.char = "X";
	players.opponent.char = "O";

	db.collection("games").add({
		r0: board[0],
		r1: board[1],
		r2: board[2],
		name: _name,
		move: 0,
		turn: "X",
		started: game.started,
		players: 1,
		
		p1: {
			name: players.self.name,
			id: players.self.id,
			char: players.self.char,
		},

		p2: {
			name: null,
			char: players.opponent.char,
		}

	})
	.then(docRef => {
		game.id = docRef.id;

		db.collection("games").doc(docRef.id)
			.onSnapshot(doc => {
				loadData(game.id);
			}
		)
		loadLobbies();
		newlobby(players.self.name, game.id);
		show("game");

	})
	.catch(error => {
		console.error("Couldn't create game because: \n\n" + error);
		alert("Network error");
	});
}

function newlobby(name, id) {
	let lobby = name + '<br><span class="game-id">Game-id: ' + id + '</span><br><hr>';

	db.collection("lobbies").doc(id).set({
		lobby: lobby,
		game_id: id,
		created: Date.now(),
	});
	// document.getElementById("lobbies").appendChild(lobby);
}

var nolobbies = document.createElement("li");
nolobbies.innerHTML = "No lobbies? Create one!";
nolobbies.id = "nolobbies";

function loadLobbies() {
	let lobbyContainer = document.getElementById("lobbies");

	db.collection("lobbies").get().then(snapshot => {
		Array.from(lobbyContainer.getElementsByTagName("li")).forEach(tag => {
			tag.remove();
		});

		snapshot.forEach(doc => {

			if(Date.now() > doc.data().created + 100000) {
				db.collection("lobbies").doc(doc.id).delete()
				.then(() => {
					console.log("Succsessful deletion of expired lobby");
				})
				.catch(error => { console.error("Failed to delete expired lobby: \n" + error) })

				db.collection("games").doc(doc.id).delete()
				.then(() => {
					console.log("Succsessful deletion of expired game");
				})
				.catch(error => { console.error("Failed to delete expired game: \n" + error) })

				return;
			}

			let lobbystring = doc.data().lobby;
			let l = document.createElement('li');

			l.setAttribute("id", doc.data().game_id)
			l.innerHTML = lobbystring;
			l.onclick = function () { join(l.getAttribute("id")) };

			lobbyContainer.appendChild(l);
		})
	})
}