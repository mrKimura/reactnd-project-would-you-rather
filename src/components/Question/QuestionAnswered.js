import React, { Fragment } from "react";
import PropTypes from "prop-types";

const calculateVotesPercents = (allVotes, currentVotes) => {
  if (currentVotes === 0) return `0%`;
  return `${Math.round((currentVotes / allVotes) * 100)}%`;
};

const QuestionAnswered = props => {
  const { options, authedUser } = props;
  const allVotes = options.reduce((acc, val) => acc + val.votes.length, 0);
  return (
    <Fragment>
      <div className="question__big-title">Results:</div>
      <div className="question__results">
        {options.map((option, index) => (
          <div
            className={`question__result container result ${
              option.votes.includes(authedUser) ? "result--me" : ""
            }`}
            key={`option${index + 1}`}
          >
            <div
              className={`result__value ${
                option.votes.includes(authedUser) ? "result__value--me" : ""
              }`}
            >
              Would you rather {option.text}
            </div>
            <div className="result__bar-container">
              <div
                className="result__bar"
                data-result={`${calculateVotesPercents(
                  allVotes,
                  option.votes.length
                )}`}
                style={{
                  width: calculateVotesPercents(allVotes, option.votes.length)
                }}
              />
            </div>
            <div className="result__votes">
              {option.votes.length} out of {allVotes} votes
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

QuestionAnswered.propTypes= {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  authedUser: PropTypes.string.isRequired
};

export default QuestionAnswered;
