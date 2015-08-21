var ScoreArea = React.createClass({
  propTypes: {
    score: React.PropTypes.number,
  },

  render: function() {
    return (
        <span className="score-text">Your Score:&nbsp;
          <span className="score-points">{this.props.score}</span>
        </span>
    );
  },

  getDefaultProps: function() {
    return {
      score: 0,
      type: 'ScoreArea'
    };
  },


});
