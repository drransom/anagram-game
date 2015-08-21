var WordGameView = React.createClass({
  propTypes: {
    scrambledChars: React.PropTypes.string,
    currentGuess: React.PropTypes.string,
    won: React.PropTypes.bool,
    url: React.PropTypes.string,
    score: React.PropTypes.number,
    notificationMessage: React.PropTypes.string,
    words: React.PropTypes.array,
  },

  render: function() {
    var i, j, char, letters, notificationArea, lettersArea, buttonsArea;
    notificationArea = this.calculateNotificationArea();
    lettersArea = this.calculateLettersArea();
    buttonsArea = this.calculateButtonsArea();
    scoreArea = this.calculateScoreArea();

    return (
      <div className='row vertical-margin-row'>
        <div className='col-lg-12'>
          {[notificationArea, lettersArea, buttonsArea, scoreArea]}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    this.game = new ERWordGame.GameIntermediary(this, this.props.words);
    this.game.startRound();
  },

  getDefaultProps: function() {
    return {
            currentGuess: '',
            scrambledChars: '',
            url: '/',
            won: false,
            type: "WordGameView",
            score: 0,
            notificationMessage: 'new',
            notificationShouldBeHidden: false,
            notificationShouldBeVisible: true
    };
  },

  requestNewWords: function() {
    $.get(this.url, {new_words: true},
      function(data) {
        this.game.addMoreWords(data);
      }.bind(this)
    );
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
      <div className='row letters-row' key='letters-row'>
        <div className='letters-area'>{letters}</div>
      </div>
    );
  },

  calculateControlButtons: function() {
    return(
      <ControlButtons won={this.props.won}
        numCharsRemaining={this.props.scrambledChars.length}
        numChars={this.props.scrambledChars.length + this.props.currentGuess.length}
        game={this.game}/>
    );
  },

  calculateButtonsArea: function() {
    var controlButtons = this.calculateControlButtons();
    return(
      <div className='row buttons-row' key='control-buttons-row'>
        <div className='buttons-area'>
          {controlButtons}
        </div>
      </div>
    );
  },

  calculateNotificationArea: function() {
    return (
      <NotificationArea shouldBeVisible={this.props.notificationShouldBeVisible}
        shouldBeHidden={this.props.notificationShouldBeHidden}
        messageType={this.props.notificationMessage} key='notification-area'/>
    );
  },

  calculateScoreArea: function() {
    return (
      <div className='row score-row' key='score-row'>
        <ScoreArea score={this.props.score} />
      </div>
    );
  },

});
