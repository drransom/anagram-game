var Letter = React.createClass({
  propTypes: {
    char: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  render: function() {
    var className = "game-letter";
    className += this.props.active ? '' : " game-letter-active";
    return (
      <div className={className}>
        <span className={className}>{this.props.char}</span>
      </div>
    );
  },
});
