var table, gameDiv, lobbyDiv, startDiv, messageP;

window.onload = function() {
	table = document.getElementById("board");
	gameDiv = document.querySelector(".game-container");
	lobbyDiv = document.querySelector(".lobby-container")
	startDiv = document.querySelector(".start-container");
	messageP = document.getElementById("message");

	setInterval(update, 1000/2);

	show('start');
}

function submitbtn() {
	db.collection("random-player-id's").add({
		thisisbad: "yes"
	}).then(docRef => {
		players.self.id = docRef.id;
	}).catch(error => { console.error(error); })

	let input = document.getElementById('player-name-tf'); 
	if(input.value !='') {
		players.self.name = input.value; 
		show('lobby');
	}
}

function show(div) {
	switch(div) {
		case "start":
			startDiv.style.display = "block";
			lobbyDiv.style.display = "none";
			gameDiv.style.display = "none";
			break;
		
		case "lobby":
			startDiv.style.display = "none";
			lobbyDiv.style.display = "block";
			gameDiv.style.display = "none";
			loadLobbies();
			break;

		case "game":
			startDiv.style.display = "none";
			lobbyDiv.style.display = "none";
			gameDiv.style.display = "block";
			break;
		default:
			console.error("No such div with the name of '" + div + "'");
	}
}