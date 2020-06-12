/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            "crazy like a fox",
            "dental plan",
            "okely dokely",
            "excellent",
            "ay caramba"
        ];
        this.activePhrase = null;
    }
// Add a new phrase to phrase array.
    createPhrases(phrase) {
        this.phrases.push(phrase)
    }
// Random phrase added to Phrase.
    getRandomPhrase() {
        const random = Math.floor(Math.random() * 5);
        const randomPhrase = game.phrases[random];
        return new Phrase(randomPhrase);
    }
// Hides the start screen overlay, and will reset settings from previous game.
    startGame() {
        overlay.style.display = 'none';
        phrase = this.getRandomPhrase();
        phrase.addPhraseToDisplay();
        this.activePhrase = phrase;
        for (let i = 0; i < qwertyKeys.length; i++) {
            qwertyKeys[i].className = 'key';
            qwertyKeys[i].disabled = false;
        }
        for (let i = 0; i < goodHeart.length; i++) {
            goodHeart[i].firstElementChild.src = 'images/liveHeart.png';
            goodHeart[i].firstElementChild.className = '';
        }
    }
// Determines if entire phrase has been revealed, if true the gameOver().
    checkForWin() {
        let missingLetters = 0;
            for (let i = 0; i < phraseDivUl.length; i++) {
                if (phraseDivUl[i].className == "hide letter") {
                    missingLetters += 1;
                }
            }
            if (missingLetters === 0) {
                this.gameOver(true);
                return true
            } else {
                return false
            }
    }
// Removes heart; 5 wrong guesses and its gameOver().
    removeLife() {
        goodHeart[this.missed ].firstElementChild.src='images/lostHeart.png';
        goodHeart[this.missed].firstElementChild.className= 'animate__animated animate__jello';
        if (this.missed === 4) {
            this.gameOver(false);
        }
        this.missed += 1;
    }
/*	Displays green 'win' screen or red 'lose' screen.
To get the boolean parameter to work:
https://stackoverflow.com/questions/58442670/javascript-how-to-check-if-a-false-boolean-parameter-is-passed-in-a-function
*/
    gameOver(gameWon) {
        if (gameWon !== undefined && !gameWon) {
            overlay.querySelector('h1').style.color = 'firebrick';
            overlay.querySelector('h1').textContent = 'Doh! 😖';
            overlay.className = 'lose';
            overlay.style.display = '';
            btn.disabled = false;
        }
        if (gameWon) {
            overlay.querySelector('h1').textContent = '🥳 Woo Hoo!'
            overlay.querySelector('h1').style.color = 'blueviolet'
            overlay.className = 'win';
            overlay.style.display = '';
            btn.disabled = false;
        }
    }
// Pushes letter to checkLetter()
    handleInteraction(button) {
        let isChecked = phrase.checkLetter(button);
        if (isChecked !== undefined && !isChecked) {
            this.removeLife();
            for (let i = 0; i < qwertyKeys.length; i++) {
                if (button === qwertyKeys[i].textContent) {
                    qwertyKeys[i].className = 'wrong animate__animated animate__headShake';
                    qwertyKeys[i].disabled = true
                }
            }
        } else {
            phrase.showMatchedLetter(button);
            this.checkForWin();
            for (let i = 0; i < qwertyKeys.length; i++) {
                if (button === qwertyKeys[i].textContent) {
                    qwertyKeys[i].className = 'chosen animate__animated animate__headShake';
                    qwertyKeys[i].disabled = true;
                }
            }
        }
    }

}