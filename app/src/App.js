import React from "react";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
// import MyComponent from "./MyComponent";
import BallotComponent from "./BallotComponent";
import ProposalComponent from "./ProposalComponent";
import "./App.css";

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
              //<MyComponent drizzle={drizzle} drizzleState={drizzleState} />
              <Router>
                <section id="listHorizontal">
                  <ul>
                    <li> 
                      <Link to="/">Home</Link>
                    </li>
                  </ul>
            </section>
                <hr />
                <Route exact path="/" render={props => <BallotComponent drizzle={drizzle} drizzleState={drizzleState} {...props} />} />
                <Route path="/props/:propId" render={props => <ProposalComponent drizzle={drizzle} drizzleState={drizzleState} {...props} />} />
              </Router>
              //<BallotComponent drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
