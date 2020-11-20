import "./App.css";
import React from "react";
import pg from "./pensaghana.png";
function App(props) {
  return (
    <div className="App">
      <section className="section-team">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4 col-xl-3"></div>

            <div className="col-sm-6 col-lg-4 col-xl-3" id="node">
              <div className="single-person">
                <h3 className="speciality text-center">
                  I registered for PENSA GHANA 2021
                </h3>
                <div className="person-image">
                  <img src={props.data && props.data.urls[0]} alt="" />
                  <span className="icon">
                    {/* <i className="fab fa-html5"> */} <img src={pg} />
                    {/* </i> */}
                  </span>
                </div>
                <div className="person-info text-center">
                  <h3 className="full-name">John Doe</h3>
                  <span className="speciality">Web Developer</span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3"></div>
            <div className="col-sm-6 col-lg-4 col-xl-3"></div>
          </div>
        </div>
      </section>
      <button onClick={props.screenshot}>Take screenshot</button>
    </div>
  );
}

export default App;
