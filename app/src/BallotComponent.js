import React from "react";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { newContextComponents } from "@drizzle/react-components";
import ProposalListComponent from "./ProposalListComponent";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class BallotComponent extends React.Component {
  state = { propsalCounter: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    
    // Set the contract we want to intereact with
    const ballotContract = drizzle.contracts.Ballot;
    
    // Cache getNumberOfProposals() method and add it to our state
    const propsalCounter = ballotContract.methods.getNumberOfProposals.cacheCall();
    this.setState({propsalCounter});
  }

  render() {
    let proposals = [];
    let len = 0;

    //check if drizzlestatus initialized
    if (this.props.drizzleState.drizzleStatus.initialized) {
      //Get contract from state and get count from key
      const ballotContractState = this.props.drizzleState.contracts;
      const count = ballotContractState.Ballot.getNumberOfProposals[this.state.propsalCounter];
      if (count) {
        len = count.value;
      }
    }
    
    for (var i = len - 1; i > -1; i -= 1) {
      proposals.push(
        <li key={i.toString()}>
          <Link to={`/props/${i}`}>
          <ProposalListComponent 
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            index={i}
            />
          </Link>
        </li>
      );
    }

    return (
    <div className="App">
      <h1>Cardinal</h1>

      <div className="section">
      <h2>Proposal</h2>
        <ContractForm drizzle={this.props.drizzle} contract="Ballot" method="createProposal" />
        {proposals}    
      </div> 
    </div>
  );
  }
}

export default BallotComponent;
