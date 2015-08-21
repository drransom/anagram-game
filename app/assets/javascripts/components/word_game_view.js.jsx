var WordGameView = React.createClass({
  propTypes: {
    words: React.PropTypes.array,
    scrambledChars: React.PropTypes.string,
    currentGuess: React.PropTypes.string,
    won: React.PropTypes.bool,
    url: React.PropTypes.string,
    hasPlayed: React.PropTypes.bool,
    rulesHidden: React.PropTypes.bool,
    rulesStartedHiding: React.PropTypes.bool
  },

  render: function() {
    var i, j, char, letters, rulesArea, lettersArea, buttonsArea;

    if (this.props.won) {
        return (
          <div>
            <div>You won! The current guess was {this.props.currentGuess})</div>
          </div>
        );
    } else {
      rulesArea = this.calculateRulesArea();
      lettersArea = this.calculateLettersArea();
      buttonsArea = this.calculateButtonsArea();

      return (
        <div className='row vertical-margin-row'>
          <div className='col-lg-12'>
            {[rulesArea, lettersArea, buttonsArea]}
          </div>
        </div>
      );
    }
  },

  componentDidMount: function() {
    this.rulesStartedHiding = false;
    this.game = new ERWordGame.Game(this);
    this.game.startRound();
    $(window).keypress(this.handleKeypress);
  },

  getDefaultProps: function() {
    return {
            currentGuess: '',
            scrambledChars: '',
            url: '/',
            words: [],
            won: false,
            type: "WordGameView",
            hasPlayed: false,
            rulesStartedHiding: false,
            rulesHidden: false
    };
  },

  requestNewWords: function() {
    $.get(this.url, {new_words: true},
      function(data) {
        var newWords = this.props.words.concat(data);
        this.game.words = newWords;
        this.setProps({words: newWords});
      }.bind(this)
    );
  },

  handleKeypress: function(event) {
    var keyCode = event.keyCode || event.which;
    this.game.takeChar(String.fromCharCode(keyCode));
  },

  calculateLetters: function() {
    var letters = [];
    for (i = 0; i < this.props.currentGuess.length; i++) {
      char = this.props.currentGuess[i];
      letters.push(<WordGameLetter char={char} active={true}
                    key={'letter-' + i}/>);
    }
    for (j = 0; j < this.props.scrambledChars.length; j++) {
      char = this.props.scrambledChars[j];
      letters.push(<WordGameLetter char={char} active={false}
                    key={'letter-' + i + j}/>);
    }
    return letters;
  },

  calculateLettersArea: function() {
    var letters = this.calculateLetters();
    return (
      <div className='row letters-row'>
        <div className='letters-area'>{letters}</div>
      </div>
    );
  },

  calculateControlButtons: function() {
    return(
      <ControlButtons won={this.props.won}
        numCharsRemaining={this.props.scrambledChars.length}
        numChars={this.props.scrambledChars.length + this.props.currentGuess.length}
        game={this.game} />
    );
  },

  calculateButtonsArea: function() {
    var controlButtons = this.calculateControlButtons();
    return(
      <div className='row buttons-row'>
        <div className='buttons-area'>
          {controlButtons}
        </div>
      </div>
    );
  },

  calculateRulesArea: function() {
    return <RulesArea shouldRender={!this.rulesStartedHiding}
            shouldBeHidden={this.props.rulesHidden} />;
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.words || this.props.words.length === 0) {
      this.requestNewWords();
    }

    if (nextProps.hasPlayed && !this.rulesStartedHiding) {
      this.setRulesHiddenTimeout();
    }
  },

  setRulesHiddenTimeout: function() {
    var gameView = this;
    this.rulesStartedHiding = true;
    setTimeout(
      function() {
        gameView.setProps({rulesHidden: true})
      },
      1000
    );
  }

});
