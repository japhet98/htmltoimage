import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import App from "./App";
import GetImage from "./GetImage";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={GetImage} />
            {/* <Route path="download-image" component={App} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
