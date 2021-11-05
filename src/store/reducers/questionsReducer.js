import {
  GET_QUESTIONS,
  INCREASE_INDEX,
  RESET_INDEX,
  ADD_ANSWER,
  RESET_ANSWER,
  GET_SCORE,
} from "../actions/actionTypes";

const initialState = {
  questions: [],
  index: 0,
  answers: [],
  score: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };

    case INCREASE_INDEX:
      return {
        ...state,
        index: state.index + 1,
      };

    case RESET_INDEX:
      return {
        ...state,
        index: 0,
      };

    case ADD_ANSWER:
      return {
        ...state,
        answers: state.answers.concat(action.answer),
      };

    case RESET_ANSWER:
      return {
        ...state,
        answers: [],
      };

    case GET_SCORE:
      return {
        ...state,
        score: action.score,
      };

    default:
      return state;
  }
};

export default reducer;
