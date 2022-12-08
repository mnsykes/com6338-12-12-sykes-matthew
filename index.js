let remainingGuesses = document.getElementById("remaining-guesses");
let incorrectLetters = document.getElementById("incorrect-letters");
let wordToGuess = document.getElementById("word-to-guess");

const words = [
	"bananas",
	"grapes",
	"carousel",
	"milkshake",
	"javascript",
	"limousine",
	"chocolate",
	"programming",
	"meatloaf",
	"ukulele",
	"mango"
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
	constructor(word) {
		this.word = word;
		this.displayWord = word.replaceAll(/[\w]/g, "_");
		this.remainingGuesses = 10;
		this.incorrectLetters = [];
		this.correctLetters = [];
	}

	// implement the guessLetter function:
	guessLetter(letter) {
		let currWord = this.word.split("");
		let blanks = this.displayWord.split("");
		let letterIndex = this.word.indexOf(letter);

		if (letterIndex >= 0) {
			currWord.map((char, key) => {
				if (letter === char && !blanks[key].includes(letter)) {
					blanks[key] = letter;
					this.correctLetters.push(letter);
					this.displayWord = blanks.join("");
				}
			});
		} else if (!this.incorrectLetters.includes(letter)) {
			this.incorrectLetters.push(letter);
			this.remainingGuesses--;
		}
	}

	// implement the updateScreen function:
	updateScreen() {
		remainingGuesses.textContent = this.remainingGuesses;
		incorrectLetters.textContent = this.incorrectLetters;
		wordToGuess.textContent = this.displayWord;
	}

	// implement the isGameOver function:
	isGameOver() {
		if (this.remainingGuesses <= 0 || this.word === this.displayWord) {
			return true;
		} else {
			return false;
		}
	}

	// implement the getWinOrLoss function:
	getWinOrLoss() {
		if (this.word === this.displayWord && this.remainingGuesses > 0) {
			return "win";
		} else if (this.remainingGuesses <= 0 && this.word !== this.displayWord) {
			return "loss";
		} else {
			return null;
		}
	}
}

function newGame() {
	const randomWord = words[Math.floor(Math.random() * words.length)];
	currentWord = new Word(randomWord);
	currentWord.updateScreen();
}

document.onkeyup = function (e) {
	const pressedKey = e.key.toLowerCase();
	// early exit for non-letter key presses
	if (!/^[a-z]{1}$/g.test(pressedKey)) return;

	// pass in guessed letter to word obj
	currentWord.guessLetter(pressedKey);
	// allow word obj to update screen
	currentWord.updateScreen();

	// check if game is over
	const gameOver = currentWord.isGameOver();

	// if game is over, update wins/losses and start new game
	if (gameOver) {
		const previousWord = document.getElementById("previous-word");
		const winDisplay = document.getElementById("wins");
		const lossDisplay = document.getElementById("losses");
		previousWord.textContent = currentWord.word;
		const result = currentWord.getWinOrLoss();
		if (result === "win") {
			wins++;
			winDisplay.textContent = wins;
		} else if (result === "loss") {
			losses++;
			lossDisplay.textContent = losses;
		}
		newGame();
	}
};

newGame();
