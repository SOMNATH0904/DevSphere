import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login /> {/* login component */}
          </Route>

          <Route path="/checkout">
            <Header /> {/* header component */}
            <Checkout /> {/* checkout component */}
          </Route>

          <Route path="/">
            <Header /> {/* header component */}
            <Home /> {/* Home component */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
