/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    };

    // Creates phrases for use in the game
    // @return {array} - array of phrases that could be used in the game
    createPhrases() {
        const phraseStrings = [
            'A fish out of water',
            'Silence is golden',
            'Two peas in a pod',
            'Cool as a cucumber',
            'All bark and no bite'
        ];

        const phrasesArray = phraseStrings.map(string => new Phrase(string));
 		return phrasesArray;
    };

    // Randomly selects a phrase from the phrases array.
    // @return {object} - phrase object chosen
    getRandomPhrase() {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }; 

    // Begins game by selecting a random phrase and displaying it to the player.
    startGame() {
        const overlayDiv = document.querySelector('#overlay');
        overlayDiv.style.display = 'none';

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }; 

    // Checks to see if the button clicked by the player matches a letter in the phrase, 
    // and then directs the game based on a correct or incorrect guess.
    // @param {HTMLButtonElement} button - the clicked button element
    handleInteraction(button) {
        let letter = button.innerText;

        if(this.activePhrase.checkLetter(letter)) {
            button.disabled = true;
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            
            if(this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            button.classList.add('wrong');
            if(button.disabled !== true) {
                button.disabled = true;
                this.removeLife();
            };
        };
    };

    // Increases the value of the missed property, and removes a life from the scoreboard. 
    removeLife() {
        const hearts = document.querySelectorAll('.tries img');
        hearts[this.missed].src = 'images/lostHeart.png';
        
        // Also ends game once player is out of lives.
        this.missed += 1; 
        if(this.missed >= 5) {
            this.gameOver(false);
        };
    };

    // Checks for winning move by seeing if the player has revealed all of the letters in the active phrase.
    // @return {boolean} - true if game was won / false if game was lost
    checkForWin() {
        const hiddenLetters = document.querySelectorAll('li.hide');
        return hiddenLetters.length === 0;
    };

    // Displays game over message and resets gameboard between games.
    // param {boolean} gameWon - whether or not the player won
    gameOver(gameWon) {
        const overlayDiv = document.querySelector('#overlay');
        overlayDiv.style.display = '';
        
        const gameOverMsg = document.querySelector('#game-over-message');
        if(gameWon) {
            gameOverMsg.textContent = 'Congrats - you did it! Try another one?';
            overlayDiv.classList.remove('start');
            overlayDiv.classList.remove('lose');
            overlayDiv.classList.add('win');
        } else {
            gameOverMsg.textContent = 'Sorry - you ran out of lives. Try again next time!';
            overlayDiv.classList.remove('start');
            overlayDiv.classList.remove('win');
            overlayDiv.classList.add('lose');
        };

        const phraseLis = document.querySelectorAll('#phrase li');
        phraseLis.forEach(li => {
            li.remove();
        });

        const keyboardButtons = document.querySelectorAll('#qwerty button');
        keyboardButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('chosen');
            button.classList.remove('wrong');
            button.classList.add('key');
        });

        const hearts = document.querySelectorAll('.tries img');
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });
    };
 };