import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import CandidateComponent from "./CandidateComponent";
import AddCandidateComponent from "./AddCandidateComponent";

const { ContractData } = newContextComponents;

class ProposalComponent extends React.Component {
  state = { candidateCounter: null , adminAccount: null};
  componentDidMount() {
    const { drizzle } = this.props;
    // Set the contract we want to intereact with
    const ballotContract = drizzle.contracts.Ballot;
    
    // Cache getNumberOfProposals() method and add it to our state
    const candidateCounter = ballotContract.methods.getNumberOfCandidates.cacheCall(this.props.match.params.propId);
    const adminAccount = ballotContract.methods.getAdmin.cacheCall(this.props.match.params.propId);
    this.setState({candidateCounter, adminAccount});
  }

  render() {
    let addCandidatesField;
    let candidates = []
    let len = 0;

    //check if drizzlestatus initialized
    if (this.props.drizzleState.drizzleStatus.initialized) {
      //Get contract from state and get count from key
      const ballotContractState = this.props.drizzleState.contracts;
      const count = ballotContractState.Ballot.getNumberOfCandidates[this.state.candidateCounter];
      if (count) {
        len = count.value;
      }

      // check whether the user is the election official for this ballot
      const adminStatus = ballotContractState.Ballot.getAdmin[this.state.adminAccount];
      if (adminStatus) {
        if (adminStatus.value === this.props.drizzleState.accounts[0]) {
          // Add Field for adding candidates if they are the admin
          addCandidatesField = (
            <AddCandidateComponent
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              propId={this.props.match.params.propId}
            />
          );
        } else {
          addCandidatesField = (<></>);
        }
      }
    }

    // push candidates onto the view
    for (var i = len - 1; i > -1; i -= 1) {
      candidates.push(
        <li key={i.toString()}>
          <CandidateComponent
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            index={i}
            propId={this.props.match.params.propId}
          />
        </li>
      );
    }

    return (
        <div className="section">
        <h1> 
        <ContractData
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          contract="Ballot"
          method="getProposal"
          methodArgs={[this.props.match.params.propId]}
          toUtf8={true}
        />
        </h1>
        <ul>
          {candidates}
        </ul>
        <br />
        <br />
        {addCandidatesField}
        <div className="foot">
        <div>
          Give each candidate a rating.
        </div>
        <br />
        <strong>Election Official: </strong>
        <ContractData
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          contract="Ballot"
          method="getAdmin"
          methodArgs={[this.props.match.params.propId]}
        />
        </div>
        </div>
    );
  }
}

export default ProposalComponent;
