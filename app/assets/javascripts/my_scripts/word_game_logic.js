;(function() {
window.ERWordGame = window.ERWordGame || {};

ERWordGame.Game = function(view) {
  this.view = view;
  this.words = view.props.words.map(function(string) {
    return string.toLowerCase();
  });
};

var Game = ERWordGame.Game;

Game.prototype.startRound = function() {
  if (this.words.length > 0) {
    this.correctWord = this.words.pop();
    this.scrambledWord = this.correctWord.split('').
      sort(function(){return 0.5-Math.random()}).join('');
    this.unusedLetters = this.scrambledWord;
    this.currentGuess = "";
    this.view.setProps({
      scrambledChars: this.scrambledWord,
      currentGuess: this.currentGuess,
      won: false
    });
  } else {
    this.view.requestNewWords();
  }
};

Game.protype.takeChar = function(char) {
  char = char.toLowerCase();
  var index = this.unusedLetters.indexOf(char);
  if (index >= 0 && this.unusedLetters.length > 1) {
    this.currentGuess += char;
    this.unusedLetters = this.unusedLetters.slice(0, i) + this.unusedLetters.slice(i+1);
    view.setProps({currentGuess: this.currentGuess,
                   scrambledChars: this.unusedLetters,
                   won: false });
  } else if (index >= 0) {
    this.currentGuess = "";
    this.unusedLetters = this.scrambledWord;
    view.setProps({currentGuess: this.currentGuess,
                   scrambledChars: this.unusedLetters,
                   won: this.correctWord === this.currentGuess });
  }

};

})();
