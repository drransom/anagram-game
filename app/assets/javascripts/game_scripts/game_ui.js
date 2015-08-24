;(function() {
'use strict';

window.ERWordGame = window.ERWordGame || {};

ERWordGame.GameUI = function(view, words) {
  this.view = view;
  this.url = this.view.props.url;
  this.game = new ERWordGame.Game(this, words);
  this.notificationShouldBeHidden = false;
  this.notificationShouldBeVisible = true;
  this.notificationType = 'new';
  this.hasPlayed = false;
};

var GameUI = ERWordGame.GameUI;

GameUI.prototype.setProps = function(props) {
  this.updateHistory(props);
  this.addStateToProps(props);
  this.view.setProps(props);
};

GameUI.prototype.takeChar = function(char) {

  this.game.takeChar(char);
};

GameUI.prototype.updateHistory = function(props) {
  this.checkHideNotification(props);

  this.checkRoundEnd(props);
};

GameUI.prototype.checkHideNotification = function(props) {
  if (this.hasPlayed !== props.hasPlayed) {
    this.hasPlayed = props.hasPlayed;
    props.updateNotificationMessage = true;
    this.hideNotification();
  }
};

GameUI.prototype.hideNotification = function() {
  this.notificationShouldBeVisible = false;
  setTimeout(
   function() {
     this.notificationShouldBeHidden = true;
     this.view.setProps({notificationShouldBeHidden: true});
   }.bind(this),
   1000
  );
};

GameUI.prototype.checkRoundEnd = function(props) {
  if (props.outcome === 'win' || props.outcome === 'skip') {
    props.notificationMessage = props.outcome;
    this.hasPlayed = false;
    this.unhideNotification();
  }
};

GameUI.prototype.unhideNotification = function() {
  this.notificationShouldBeHidden = false;
  setTimeout(
    function() {
      this.notificationShouldBeVisible = true;
      this.view.setProps({notificationShouldBeVisible: true});
    }.bind(this),
    100
  );
};

GameUI.prototype.addStateToProps = function(props) {
  props.notificationShouldBeHidden = this.notificationShouldBeHidden;
  props.notificationShouldBeVisible = this.notificationShouldBeVisible;
};

GameUI.prototype.startRound = function() {
  $(window).keypress(this.handleKeypress.bind(this));
  this.game.startRound();
};

GameUI.prototype.handleKeypress = function(event) {
  if (this.game.isWon()) {
    this.hideNotification();
    this.game.startRound();
  } else {
    var keyCode = event.keyCode || event.which;
    this.game.takeChar(String.fromCharCode(keyCode));
  }
};

GameUI.prototype.addMoreWords = function(words) {
  this.game.addMoreWords(words);
};

GameUI.prototype.resetRound = function() {
  this.game.resetRound();
};

GameUI.prototype.skipToNextWord = function() {
  this.game.skipToNextWord();
};

GameUI.prototype.requestNewWords = function() {
  $.get(this.url, {new_words: true},
    function(data) {
      this.game.addMoreWords(data);
    }.bind(this)
  );
};


})();
