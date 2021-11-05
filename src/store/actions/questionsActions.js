import {
  GET_QUESTIONS,
  INCREASE_INDEX,
  RESET_INDEX,
  ADD_ANSWER,
  RESET_ANSWER,
  GET_SCORE,
} from "./actionTypes";

export const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    questions,
  };
};

export const increaseIndex = () => {
  return {
    type: INCREASE_INDEX,
  };
};

export const resetIndex = () => {
  return {
    type: RESET_INDEX,
  };
};

export const addAnswer = (answer) => {
  return {
    type: ADD_ANSWER,
    answer,
  };
};

export const resetAnswers = () => {
  return {
    type: RESET_ANSWER,
  };
};

export const getScore = (score) => {
  return {
    type: GET_SCORE,
    score,
  };
};
