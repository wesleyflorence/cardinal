import React from "react";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import AccountComponent from "./AccountComponent";
import BallotComponent from "./BallotComponent";
import ProposalComponent from "./ProposalComponent";
import AboutComponent from "./AboutComponent";
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
              <Router>
                <section id="listHorizontal">
                  <ul>
                    <li> 
                      <Link to="/">Home</Link>
                    </li>
                   <li>
                      <Link to="/account">Account</Link>
                    </li>
                   <li>
                      <Link to="/about">About</Link>
                    </li>
                  </ul>
                </section>
                <hr />
                <Route exact path="/" render={props => <BallotComponent drizzle={drizzle} drizzleState={drizzleState} {...props} />} />
                <Route exact path="/account" render={props => <AccountComponent drizzle={drizzle} drizzleState={drizzleState} {...props} />} />
                <Route path="/props/:propId" render={props => <ProposalComponent drizzle={drizzle} drizzleState={drizzleState} {...props} />} />
                <Route exact path="/about" component={AboutComponent} />
              </Router>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
