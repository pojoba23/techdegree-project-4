/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }
// Separate letters and spaces into individual <li> elements.
    addPhraseToDisplay() {
        const li = document.createElement('LI');
        const array = [...this.phrase];
        array.forEach(character => {
            const li = document.createElement('LI');
            if (character == " ") {
                li.className = 'hide space';
            } else {
                li.className = 'hide letter';
            }
            li.textContent = character;
            phraseDiv.appendChild(li);
        })
    };
// Determines if guessed letter is found in the activePhrase.
    checkLetter(letter) {
        const array = [...this.phrase];
        let occurs = 0;
        array.forEach(character => {
            if (letter === character) {
                occurs += 1;
            }
        })
        if (occurs > 0) {
            return true
        } 	else {
                return false
            }
    };
// Reveals letter(s) on the screen.
    showMatchedLetter(letter) {
        for (let i = 0; i < phraseDivUl.length; i++) {
            if (letter == phraseDivUl[i].textContent) {
                phraseDivUl[i].className = 'show letter animate__animated animate__flipInY';
                phraseDivUl[i].style.setProperty('--animate-duration', '0.7s');
            }
        }
    };
}