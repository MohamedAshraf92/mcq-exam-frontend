import { Route, Switch } from "react-router";

import Home from "./components/home/home";
import Question from "./components/question/question";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/questions" component={Question} />
      </Switch>
    </div>
  );
}

export default App;
