import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Route, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Board from "./Routes/Board";
import Member from "./Routes/Member";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/board" component={Board} exact />
        <Route path="/board/:command" component={Board} />
        <Route path="/member" component={Member} exact />
        <Route path="/member/login" component={Member} exact />
      </Switch>
    </div>
  );
}

export default App;
