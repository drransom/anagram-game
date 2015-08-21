var RulesArea = React.createClass({
  propTypes: {
    shouldBeVisible: React.PropTypes.bool,
    shouldBeHidden: React.PropTypes.bool,
    messageType: React.PropTypes.string,
  },

  render: function() {
    debugger
    var hidden, message, className = "notification-text";
    className += this.props.shouldBeVisible ? '' : ' hidden-notification-text';
    hidden = this.props.shouldBeHidden ? 'hidden' : '';
    message = this.getMessageType();
    return (
      <div className="row notification-text-area">
        <span hidden={hidden} className={className}>
          {message}
        </span>
      </div>
    );
  },

  getDefaultProps: function() {
    return {
      shouldBeVisible: true,
      shouldBeHidden: false,
      type: 'RulesArea',
      messageType: 'rules',
    };
  },

  getMessageType: function() {
    switch(this.props.messageType) {
      case "rules":
        return "Press any letter on the keyboard to guess. " +
          "One point for each letter. Lose one point if you skip."
      case "win":
        return "Congratulations! You win!"
      case "skip":
        return "Too bad, you lose one point for skipping."
    }
  }

});
