document.addEventListener('DOMContentLoaded', () => {

	const colors = ['red', 'blue', 'green', 'yellow'];
	let gameSequence = [];
	let userSequence = [];
	let score = 0;

	const startButton = document.getElementById('start-btn');
	const buttons = document.querySelectorAll('.button');
	const scoreDisplay = document.getElementById('score');

	startButton.addEventListener('click', startGame);

	function startGame() {
		score = 0;
		gameSequence = [];
		userSequence = [];
		scoreDisplay.textContent = `Score: ${score}`;
		generateSequence();
		playSequence();
	}

	function generateSequence() {
		const randomIndex = Math.floor(Math.random() * 4);
		gameSequence.push(colors[randomIndex]);
	}

	function playSequence() {
		let i = 0;
		const interval = setInterval(() => {
			if (i >= gameSequence.length) {
				clearInterval(interval);
				enableButtons();
				return;
			}
			flashButton(gameSequence[i]);
			i++;
		}, 1000);
	}

	function flashButton(color) {
		const button = document.getElementById(color);
		button.classList.add('active');
		setTimeout(() => {
			button.classList.remove('active');
		}, 500);
	}

	function enableButtons() {
		buttons.forEach(button => {
			button.addEventListener('click', handleButtonClick);
		});
	}

	function disableButtons() {
		buttons.forEach(button => {
			button.removeEventListener('click', handleButtonClick);
		});
	}

	function handleButtonClick(event) {
		const clickedColor = event.target.id;
		flashButton(clickedColor);
		userSequence.push(clickedColor);
		checkSequence();
	}

	function checkSequence() {
		for (let i = 0; i < userSequence.length; i++) {
			if (userSequence[i] !== gameSequence[i]) {
				endGame();
				return;
			}
		}
		if (userSequence.length === gameSequence.length) {
			score++;
			scoreDisplay.textContent = `Score: ${score}`;
			userSequence = [];
			setTimeout(() => {
				generateSequence();
				playSequence();
			}, 1000);
		}
	}

	function endGame() {
		alert(`Game Over! Your score is ${score}.`);
		disableButtons();
	}

});