import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});

const addQuestion = question => ({
  type: ADD_QUESTION,
  question
});

export const handleAddQuestion = options => (dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());
  return saveQuestion({
    options,
    author: authedUser
  })
    .then(question => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      dispatch(hideLoading());
      console.warn("Error in handleAddQuestion: ", e);
      alert("The was an error adding a question. Try again.");
    });
};

const answerQuestion = question => ({
  type: ANSWER_QUESTION,
  question
});

export const handleAnswerQuestion = (answer, id) => (dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());
  const formattedAnswer = {
    authedUser,
    qid: id,
    answer
  };
  return saveQuestionAnswer(formattedAnswer)
    .then(() => dispatch(answerQuestion(formattedAnswer)))
    .then(() => dispatch(hideLoading()))
    .catch(e => {
      dispatch(hideLoading());
      console.warn("Error in handleAnswerQuestion: ", e);
      alert("The was an error answering a question. Try again.");
    });
};
