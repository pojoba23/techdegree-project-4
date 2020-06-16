  
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


let game;
 const startGameButton = document.querySelector('#btn__reset');
 const keyboardDiv = document.querySelector('#qwerty');
 const keysArray = document.querySelectorAll('.key');
 const overlayDiv = document.querySelector('#overlay');


 // Adds a click event listener to the 'Start Game' button, which creates a new instance of the game.
 startGameButton.addEventListener('click', () => {
    game = new Game();
    game.startGame();
 });

 // Adds click event listeners to each of the onscreen keyboard buttons.
 keyboardDiv.addEventListener('click', (e) => {
   if(e.target.className === 'key') {
      game.handleInteraction(e.target);
   };
 });


 // Adds event listeners to physical keyboard keys and START GAME button.
 document.addEventListener('keyup', (e) => {
   // Allows player to use physical computer keyboard to enter guesses.
   if (overlayDiv.style.display === 'none')
      keysArray.forEach(key => {
         if(key.textContent === e.key) {
            game.handleInteraction(key);
         };
      });
   
   // Allows the user to press 'Enter' on the keyboard to create a new instance of the game.   
   if (overlayDiv.style.display !== 'none') {
     if (e.keyCode === 13) {
         game = new Game();
         game.startGame();
      };
    };
 });