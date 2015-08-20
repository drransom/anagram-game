var WordGameView = React.createClass({
  propTypes: {
    words: React.PropTypes.array,
    scrambledChars: React.PropTypes.string,
    currentGuess: React.PropTypes.string,
    won: React.PropTypes.bool,
    url: React.PropTypes.string,
  },

  render: function() {
    var i, j, char, letters;
    if (!this.props.words || this.props.words.length === 0) {
      this.requestNewWords();
    } else if (this.props.won) {
      return (
        <div>
          <div>You won! The current guess was {this.props.currentGuess})</div>
        </div>
      );
    } else {
      letters = this.calculateLetters();
      return (
        <div className='row vertical-center'>
          <div className='col-md-6 col-md-offset-4'>{letters}</div>
        </div>
        <div className='row'><GameButtons /></div>
      );
    }
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
            type: "WordGameView"
    };
  },

  requestNewWords: function() {
    $.get(this.url, {new_words: true},
      function(data) {
        this.setProps({words: data});
      }.bind(this)
    );
  },

  handleKeypress: function(event) {
    console.log('keypress recognized')
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

});
