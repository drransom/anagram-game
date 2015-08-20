var WordGameView = React.createClass({
  propTypes: {
    words: React.PropTypes.array,
    scrambledChars: React.PropTypes.string,
    currentGuess: React.PropTypes.string,
    won: React.PropTypes.bool,
  },

  render: function() {
    if (!this.props.words || this.props.words.length === 0) {
      this.requestNewWords();
    } else {
      return (
        <div>
          <div>Words: {this.props.words}</div>
          <div>Scrambled Chars: {this.props.scrambledChars}</div>
          <div>Current Guess: {this.props.currentGuess}</div>
        </div>
      );
    }
  },


  componentDidMount: function() {
    this.game = new ERWordGame.Game(this);
    this.game.startRound();
  },

  requestNewWords: function() {
  },

});
