const words = ["Ocean", "Planet", "Listen", "Window", "Careful", "Distant", "Wonder", "Jungle", "Bicycle", "Sunset"];
let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
let wordArray = word.split('');
let guessedLetters = [];
let incorrectGuesses = [];
let remainingGuesses = 6;

document.getElementById('remaining').innerText = remainingGuesses;

// Create word blocks
const wordBlocks = document.getElementById('word-blocks');
for (let i = 0; i < wordArray.length; i++) {
  let input = document.createElement('input');
  input.type = 'text';
  input.disabled = true;
  wordBlocks.appendChild(input);
}

// Add a container to display incorrect guesses
const incorrectGuessesContainer = document.createElement('div');
incorrectGuessesContainer.id = 'incorrect-guesses';
document.getElementById('game-box').appendChild(incorrectGuessesContainer);

// Add event listener to guess button
document.getElementById('guess-button').addEventListener('click', function() {
  let guessInput = document.getElementById('guess-input');
  let guess = guessInput.value.toUpperCase();
  guessInput.value = '';

  // Check if the guess is valid
  if (guess && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    let correctGuess = false;

    // Check if the guessed letter is in the word
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === guess) {
        wordBlocks.children[i].value = guess;
        correctGuess = true;
      }
    }

    // Check if the guess is incorrect
    if (!correctGuess) {
      remainingGuesses--;
      incorrectGuesses.push(guess);
      document.getElementById('remaining').innerText = remainingGuesses;
      incorrectGuessesContainer.innerText = `Incorrect Guesses: ${incorrectGuesses.join(', ')}`;
    }
    checkGameStatus();
  }
});

// Check game status
function checkGameStatus() {
  let wordGuessed = true;
  for (let i = 0; i < wordArray.length; i++) {
    if (wordBlocks.children[i].value !== wordArray[i]) {
      wordGuessed = false;
      break;
    }
  }

  let message = document.getElementById('message');

  // Check if the game is won or lost
  if (wordGuessed) {
    message.innerText = "Congratulations! You've guessed the word!";
    endGame();
  } else if (remainingGuesses <= 0) {
    message.innerText = `Game Over! The word was ${word}.`;
    endGame();
  }
}

// End the game
function endGame() {
  document.getElementById('guess-button').disabled = true;
  document.getElementById('guess-input').disabled = true;
}