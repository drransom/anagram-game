var NotificationArea = React.createClass({
  propTypes: {
    shouldBeVisible: React.PropTypes.bool,
    shouldBeHidden: React.PropTypes.bool,
    messageType: React.PropTypes.string,
    correctWord: React.PropTypes.string
  },

  render: function() {
    var hidden, message, className = "notification-text";
    className += this.props.shouldBeVisible ? '' : ' hidden-notification-text';
    message = this.getMessageType();
    return (
      <div className="row notification-text-area">
        <span hidden={this.props.shouldBeHidden} className={className}>
          {message}
        </span>
      </div>
    );
  },

  getDefaultProps: function() {
    return {
      shouldBeVisible: true,
      shouldBeHidden: false,
      type: 'NotificationArea',
      messageType: 'rules',
      correctWord: ''
    };
  },

  getMessageType: function() {
    switch(this.props.messageType) {
      case 'new':
        return 'Press any letter on the keyboard to guess. ' +
          'One point for each letter. Lose one point if you skip.'
      case 'win':
        return 'Good job! Press any key to get another word.'
      case 'skip':
        return 'Too bad, you lose one point for skipping. ' +
               'The answer was ' + this.props.correctWord + '.';
    }
  }

});
