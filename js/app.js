/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const phraseDivUl = document.getElementById('phrase').firstElementChild.children;
	const phraseDiv = document.getElementById('phrase').firstElementChild;
	const qwertyKeys = document.querySelectorAll('.key');
	const btn = document.getElementById('btn__reset');
	const goodHeart = document.querySelectorAll('.tries');
	const goMessage = document.querySelector('#game-over-message');
	var phrase;
	var game;

// // Intial setup.
	overlay.style.zIndex = 1000;
	goMessage.classList.add('animate__animated', 'animate__tada');
	goMessage.style.setProperty('--animate-duration', '1.0s');
// Creates new game to start.
	btn.addEventListener('click', () => {
		phraseDiv.innerHTML = '';
		game = new Game();
		game.startGame();
		btn.disabled = true;
	});
// Listens for inputs from  onscreen keyboard.
	for (let i = 0; i < qwertyKeys.length; i++) {
		qwertyKeys[i].addEventListener('click', (e) => {
			let button = e.target;
			game.handleInteraction(button.textContent);
		})
	}

/* 	Accepts physical keyboard letter inputs for gameplay; ignores repeat inputs.
 	Use 'return' or 'spacebar' to start game.
	To get characters from keycodes:
 	https://stackoverflow.com/questions/48254843/converting-javascript-key-code-to-char-and-vice-versa
*/
	document.addEventListener("keydown", (k) => {
		let keyValue = k.keyCode;
		let keyChar = String.fromCharCode(k.keyCode).toLowerCase();
		for (let i = 0; i < qwertyKeys.length; i++) {
			if (keyChar === qwertyKeys[i].textContent) {
				if (qwertyKeys[i].className === 'key') {
					game.handleInteraction(keyChar);
				}
			}
		}
		if (keyValue === 13 || keyValue === 32) {
        		btn.click();
		}
	});