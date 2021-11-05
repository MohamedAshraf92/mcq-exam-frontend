import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import message from "antd/lib/message";
import axios from "axios";

import "./home.css";
import "antd/dist/antd.css";
import { getQuestions } from "../../store/actions/questionsActions";

const Home = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const startHandler = async () => {
    name === ""
      ? message.warn("Please, Enter Your Name")
      : code === ""
      ? message.warn("Please, Enter Your Code")
      : axios
          .get("http://localhost:8080/questions/")
          .then((res) => {
            dispatch(getQuestions(res.data));
            history.push("/questions");
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <form className="student-data">
        <div className="input-group full-width">
          <label className="element-label">Student Name</label>
          <input
            className="element-input"
            value={name}
            placeholder="Enter your registered name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group full-width">
          <label className="element-label">Student Code</label>
          <input
            className="element-input"
            value={code}
            placeholder="Your class code"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btnPrimary"
          onClick={() => startHandler()}
        >
          Start Test
        </button>
      </form>
    </div>
  );
};

export default Home;
