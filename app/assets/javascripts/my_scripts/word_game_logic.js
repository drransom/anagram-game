;(function() {
'use strict';

window.ERWordGame = window.ERWordGame || {};

ERWordGame.Game = function(view, words) {
  this.view = view;
  this.hasPlayed = false;
  this.score = 0;
  this.words = words;
};

var Game = ERWordGame.Game;

Game.prototype.startRound = function(outcome) {
  this.hasPlayed = false;
  outcome = outcome || 'new';
  if (this.words.length >= 1) {
    this.correctWord = this.words.pop().toLowerCase();

    this.unusedLetters = ECRWordGame.shuffle(this.correctWord.split('')).
      join('');
    this.currentGuess = '';
    this.resetView(outcome);
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
  this.hasPlayed = true;
  this.currentGuess += this.unusedLetters[index];
  this.unusedLetters = this.unusedLetters.slice(0, index) +
                       this.unusedLetters.slice(index + 1);

  if (this.currentGuess.length === this.correctWord.length &&
      this.currentGuess !== this.correctWord) {
    this.unusedLetters = this.currentGuess;
    this.currentGuess = '';
  }

  this.resetView(this.checkOutcome());
};

Game.prototype.resetRound = function() {
  this.unusedLetters = this.currentGuess.concat(this.unusedLetters);
  this.currentGuess = '';
  this.resetView("other");
};

Game.prototype.resetView = function(outcome) {
  this.view.setProps({currentGuess: this.currentGuess,
                      scrambledChars: this.unusedLetters,
                      outcome: outcome,
                      hasPlayed: this.hasPlayed,
                      score: this.score,
                    });
};

Game.prototype.checkOutcome = function() {
  if (this.currentGuess === this.correctWord) {
    this.score += this.currentGuess.length;
    return "win";
  } else {
    return "play";
  }
};

Game.prototype.skipToNextWord = function() {
  this.score -= 1;
  this.startRound("skip");
};

Game.prototype.addMoreWords = function(newWords) {
  this.words = this.words.concat(newWords);
};
})();
