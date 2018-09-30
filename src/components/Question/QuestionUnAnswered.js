import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {OPTIONS} from '../../utils/CONST'

class QuestionUnAnswered extends Component {
  state = {
    selectedOption: OPTIONS[0]
  };

  handleCheck = e => {
    const currentValue = e.target.value;
    this.setState(() => ({
      selectedOption: currentValue
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuestionAnswer(this.state.selectedOption, this.props.id);
  };

  render() {
    const { selectedOption } = this.state;
    const { options } = this.props;
    return (
      <Fragment>
        <div className="question__big-title">Would You Rather:</div>
        <form className="question__form form" onSubmit={this.handleSubmit}>
          {options.map((option, index) => (
            <div className="form__radio-item" key={`${OPTIONS[index]}`}>
              <input
                className="form__radio"
                type="radio"
                name="radio"
                id={`${OPTIONS[index]}`}
                value={`${OPTIONS[index]}`}
                checked={selectedOption === `${OPTIONS[index]}`}
                onChange={this.handleCheck}
              />
            <label className="form__label" htmlFor={`${OPTIONS[index]}`}>
              <span className='form__textlabel'>{options[index].text}</span>
            </label>
            </div>
          ))}
          <button className="form__btn btn btn--filled">Submit</button>
        </form>
      </Fragment>
    );
  }
}

QuestionUnAnswered.propTypes= {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionUnAnswered;
