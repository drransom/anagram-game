window.ERWordGame = window.ERWordGame || {};

ERWordGame.NullGame = function() {};
var NullGame = ERWordGame.NullGame;

NullGame.prototype.skipToNextWord = function() {};
NullGame.prototype.resetRound = function() {};

var ControlButtons = React.createClass({
  propTypes: {
    won: React.PropTypes.bool,
    numChars: React.PropTypes.number,
    numCharsRemaining: React.PropTypes.number,
    game: React.PropTypes.object,
  },

  render: function() {
    var buttons = [this.generateResetButton(), this.generateSkipButton()];
    return (
      <div className='btn-group btn-group-lg'>
        {buttons}
      </div>
    );
  },

  generateResetButton: function() {
    var disabled = (this.props.won || this.gameStart() ||
                    !this.props.numCharsRemaining) ? 'disabled' : '';

    return (
      <a href="#" type='button' className='btn btn-primary'
        onClick={this.props.game.resetRound.bind(this.props.game)}
        disabled={disabled} key='reset-button'>Reset</a>
    );
  },

  generateSkipButton: function() {
    var disabled = (this.allowSkip()) ? '' : 'disabled';
    return (
      <a href="#" type='button' className='btn btn-primary'
        onClick={this.props.game.skipToNextWord.bind(this.props.game)}
        disabled={disabled} key='skip-button'>Skip
      </a>
    );
  },

  gameStart: function() {
    return this.props.numChars === this.props.numCharsRemaining;
  },

  allowSkip: function() {
    return !this.props.won && this.props.numCharsRemaining;
  },

  getDefaultProps: function() {
    return {
            won: false,
            numChars: 0,
            numCharsRemaining: 0,
            type: 'ControlButtons',
            game: new ERWordGame.NullGame(),
    };
  },

});
