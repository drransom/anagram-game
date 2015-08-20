var WordGameView = React.createClass({
  propTypes: {
    words: React.PropTypes.array,
    currentWord: React.PropTypes.string,
    currentGuess: React.PropTypes.string
  },

  render: function() {
    if (!this.props.words || this.props.words.length === 0) {
      this.updateGame();
    } else {
      return (
        <div>
          <div>Words: {this.props.words}</div>
          <div>Current Word: {this.props.currentWord}</div>
          <div>Current Guess: {this.props.currentGuess}</div>
        </div>
      );
    }
  },

  updateGame: function() {
  },

  componentDidMount: function() {
    this.game = new ERWordGame.Game(this);
  }
});
