import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Route, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Board from "./Routes/Board";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/board" component={Board} />
      </Switch>
    </div>
  );
}

export default App;
