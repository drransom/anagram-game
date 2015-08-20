ERWordGame.Game = function(view) {
  this.view = view;
  this.words = view.props.words.map(function(string) {
    return string.toLowerCase();
  });
};

var Game = ERWordGame.Game;

Game.prototype.startRound = function() {
  if (this.words.length >= 1) {
    this.correctWord = this.words.pop();
    this.unusedLetters = ECRWordGame.shuffle(this.correctWord.split('')).
      join('');
    this.currentGuess = '';
    this.resetView(false);
  }
  if (this.words.length === 0) {
    this.view.requestNewWords();
  }
};

Game.prototype.takeChar = function(char) {
  char = char.toLowerCase();
  var index = this.unusedLetters.indexOf(char);
  if (index >= 0) {
    this.updateGuess(index);
  }
};

//assumes valid index
Game.prototype.updateGuess = function(index) {
  this.currentGuess += this.unusedLetters[index];
  this.unusedLetters = this.unusedLetters.slice(0, index) +
                       this.unusedLetters.slice(index + 1);

  if (this.currentGuess.length === this.correctWord.length &&
      this.currentGuess !== this.correctWord) {
    this.unusedLetters = this.currentGuess;
    this.currentGuess = '';
  }

  this.resetView(this.currentGuess === this.correctWord);
};

Game.prototype.resetRound = function() {
  this.unusedLetters = this.currentGuess.concat(this.unusedLetters);
  this.currentGuess = '';
  this.resetView(false);
};

Game.prototype.resetView = function(isWon) {
  this.view.setProps({currentGuess: this.currentGuess,
                      scrambledChars: this.unusedLetters,
                      won: isWon });
};

Game.prototype.skipToNextWord = function() {
  this.startRound();
};
