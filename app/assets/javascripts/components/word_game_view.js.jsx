var WordGameView = React.createClass({
  propTypes: {
    words: React.PropTypes.array,
    scrambledChars: React.PropTypes.string,
    currentGuess: React.PropTypes.string,
    won: React.PropTypes.bool,
    url: React.PropTypes.string,
    hasPlayed: React.PropTypes.bool,
    score: React.PropTypes.number
  },

  render: function() {
    var i, j, char, letters, rulesArea, lettersArea, buttonsArea;
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

  componentWillMount: function() {
    this.notificationShouldBeVisible = true;
    this.notificationShouldBeHidden = false;
  },

  componentDidMount: function() {
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
            score: 0
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

  calculateNotificationArea: function() {
    return (
      <RulesArea shouldBeVisible={this.notificationShouldBeVisible}
        shouldBeHidden={this.notificationShouldBeHidden}
        messageType={this.notificationMessage} />
    );
  },

  calculateScoreArea: function() {
    return (
      <div className='row score-row'>
        <ScoreArea score={this.score} />
      </div>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.props.words || this.props.words.length === 0) {
      this.requestNewWords();
    }

    if (nextProps.outcome === 'win' || nextProps.outcome === 'skip') {
      this.unhideNotification(nextProps.outcome);
    } else if (nextProps.outcome === 'play') {
      this.hideNotification();
    }
  },

  updateNotificationMessage: function (outcome) {
    this.notificationMessage = outcome;
  },

  hideNotification: function() {
    if (this.notificationShouldBeVisible) {
      this.notificationShouldBeVisible = false;
      this.setNotificationHiddenTimeout();
    }
  },

  setNotificationHiddenTimeout: function() {
    var gameView = this;
    setTimeout(
      function() {
        gameView.notificationShouldBeHidden = true
        gameView.render();
      },
      1000
    );
  },

  unhideNotification: function(outcome) {
    if (this.notificationShouldBeHidden) {
      this.updateNotificationMessage(outcome);
      this.notificationShouldBeHidden = false;
      this.setNotificationUnhiddenTimeout();
    }
  },

  setNotificationUnhiddenTimeout: function() {
    var gameView = this;
    setTimeout(
      function() {
        gameView.notificationShouldBeVisible = true;
        gameView.render();
      },
      100
    );
  },

});
