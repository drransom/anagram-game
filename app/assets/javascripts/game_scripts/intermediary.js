;(function() {
'use strict';

window.ERWordGame = window.ERWordGame || {};

ERWordGame.GameIntermediary = function(view, words) {
  this.view = view;
  this.game = new ERWordGame.Game(this, words);
  this.notificationShouldBeHidden = false;
  this.notificationShouldBeVisible = true;
  this.notificationType = 'new';
  this.hasPlayed = false;
};

var GameIntermediary = ERWordGame.GameIntermediary;

GameIntermediary.prototype.setProps = function(props) {
  this.updateHistory(props);
  this.addStateToProps(props);
  this.view.setProps(props);
};

GameIntermediary.prototype.takeChar = function(char) {
  this.game.takeChar(char);
};

GameIntermediary.prototype.updateHistory = function(props) {
  this.checkHideNotification(props);

  this.checkRoundEnd(props);
};

GameIntermediary.prototype.checkHideNotification = function(props) {
  if (this.hasPlayed !== props.hasPlayed) {
    this.hasPlayed = props.hasPlayed;
    props.updateNotificationMessage = true;
    this.hideNotification();
  }
};

GameIntermediary.prototype.hideNotification = function() {
  this.notificationShouldBeVisible = false;
  setTimeout(
   function() {
     this.notificationShouldBeHidden = true;
     this.view.setProps({notificationShouldBeHidden: true});
   }.bind(this),
   1000
  );
};

GameIntermediary.prototype.checkRoundEnd = function(props) {
  if (props.outcome === 'win' || props.outcome === 'skip') {
    props.notificationMessage = props.outcome;
    this.hasPlayed = false;
    this.unhideNotification();
  }
};

GameIntermediary.prototype.unhideNotification = function() {
  this.notificationShouldBeHidden = false;
  setTimeout(
    function() {
      this.notificationShouldBeVisible = true;
      this.view.setProps({notificationShouldBeVisible: true});
    }.bind(this),
    100
  );
};

GameIntermediary.prototype.addStateToProps = function(props) {
  props.notificationShouldBeHidden = this.notificationShouldBeHidden;
  props.notificationShouldBeVisible = this.notificationShouldBeVisible;
};

GameIntermediary.prototype.startRound = function() {
  $(window).keypress(this.handleKeypress.bind(this));
  this.game.startRound();
};

GameIntermediary.prototype.handleKeypress = function(event) {
  var keyCode = event.keyCode || event.which;
  this.game.takeChar(String.fromCharCode(keyCode));
};

GameIntermediary.prototype.addMoreWords = function(words) {
  this.game.addMoreWords(words);
};

GameIntermediary.prototype.resetRound = function() {
  this.game.resetRound();
};

GameIntermediary.prototype.skipToNextWord = function() {
  this.game.skipToNextWord();
};

GameIntermediary.prototype.requestNewWords = function() {
  this.view.requestNewWords();
}

})();
