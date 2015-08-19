;function() {
'use strict';

window.WordGame = window.WordGame || {};

WordGame.Game = function() {
  view: WordGame.GameView.new();
};

var Game = WordGame.Game;

Game.prototype.start = function() {
  React.render(this.view, $('#game-area'))


};

WordGame.GameView = React.createClass({
  render: function() {
    return {
      <h1>This is Text</h1>
    };
  }
})
})();
