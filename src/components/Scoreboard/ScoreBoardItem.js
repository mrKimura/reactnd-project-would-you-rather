import React from "react";
import PropTypes from "prop-types";

const ScoreBoardItem = props => {
  const { name, answers, questions, avatarURL, place } = props.user;
  return (
    <div className="scoreboard__item score-item container">
      <div className="score-item__header">
        <div className="score-item__place">{place}</div>
        <div className="score-item__user-name">{name}</div>
      </div>
      <div className="score-item__content">
        <div
          className="score-item__avatar avatar"
          style={{ backgroundImage: `url(${avatarURL})` }}
        />
        <div className="score-item__count-block">
          <div className="score-item__info score-info">
            <div className="score-info__field-name">Answered questions</div>
            <div className="score-info__field-score">{answers}</div>
          </div>
          <div className="score-item__info score-info">
            <div className="score-info__field-name">Created questions</div>
            <div className="score-info__field-score">{questions}</div>
          </div>
        </div>
        <div className="score-item__score-block score-all">
          <div className="score-all__name">Score</div>
          <div className="score-all__summ">{answers + questions}</div>
        </div>
      </div>
    </div>
  );
};

ScoreBoardItem.propTypes= {
  user: PropTypes.object.isRequired,
};

export default ScoreBoardItem;
