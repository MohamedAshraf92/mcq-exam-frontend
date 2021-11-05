import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswer,
  getScore,
  increaseIndex,
  resetAnswers,
  resetIndex,
} from "../../store/actions/questionsActions";
import { useHistory } from "react-router";
import Radio from "antd/lib/radio";
import message from "antd/lib/message";
import Space from "antd/lib/space";
import axios from "axios";
import Modal from "antd/lib/modal";

import "./question.css";

const Question = () => {
  const [answer, setAnswer] = useState("");
  const [renderedQuestion, setRenderedQuestion] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const questions = useSelector((state) => state.questions.questions);
  const index = useSelector((state) => state.questions.index);
  const answers = useSelector((state) => state.questions.answers);
  const score = useSelector((state) => state.questions.score);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setRenderedQuestion(questions[0]);
  }, []);

  useEffect(() => {
    setRenderedQuestion(questions[index]);
  }, [questions, index]);

  const onChange = (selection) => {
    setAnswer(selection);
  };

  const nextHandler = () => {
    if (answer === "") {
      message.warn("Please, Select an answer");
    } else {
      dispatch(increaseIndex());
      dispatch(addAnswer({ question: renderedQuestion._id, answer: answer }));
    }
  };

  const submitHandler = () => {
    dispatch(addAnswer({ question: renderedQuestion._id, answer: answer }));
    axios
      .post("http://localhost:8080/questions/", { answers })
      .then((res) => {
        dispatch(getScore(res.data.score));
        showModal();
      })
      .catch((err) => console.log(err));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(resetIndex());
    dispatch(resetAnswers());
    history.push("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(resetIndex());
    dispatch(resetAnswers());
    history.push("/");
  };

  return (
    <div className="question">
      <h1>
        {index + 1}- {renderedQuestion.question}:
      </h1>
      <Radio.Group onChange={(e) => onChange(e.target.value)}>
        <Space direction="vertical">
          {renderedQuestion.answers
            ? renderedQuestion.answers.map((el) => {
                return (
                  <Radio key={el._id} value={el._id}>
                    {el.title}
                  </Radio>
                );
              })
            : ""}
        </Space>
      </Radio.Group>
      {index === 4 ? (
        <button className="btn btnPrimary next" onClick={() => submitHandler()}>
          Submit Results
        </button>
      ) : (
        <button className="btn btnPrimary next" onClick={() => nextHandler()}>
          Next
        </button>
      )}
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1>Your Score = {score}</h1>
      </Modal>
    </div>
  );
};

export default Question;
