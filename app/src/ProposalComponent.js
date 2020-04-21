import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import CandidateComponent  from "./CandidateComponent";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class ProposalComponent extends React.Component {
  state = { candidateCounter: null };
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    // Set the contract we want to intereact with
    const ballotContract = drizzle.contracts.Ballot;
    
    // Cache getNumberOfProposals() method and add it to our state
    const candidateCounter = ballotContract.methods.getNumberOfCandidates.cacheCall(this.props.match.params.propId);
    this.setState({candidateCounter});
  }

  render() {
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
    }
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
        <ContractForm drizzle={this.props.drizzle} contract="Ballot" method="addCandidates" render={({
                    inputs,
                    inputTypes,
                    state,
                    handleInputChange,
                    handleSubmit
                  }) => (
                    <>
                    <form onSubmit={handleSubmit}>
                        <input
                          key={inputs[1].name}
                          type={inputTypes[1]}
                          name={inputs[1].name}
                          value={state[inputs[1].name]}
                          placeholder="Enter a Candidate here"
                          onChange={handleInputChange}
                        />
                      <button
                        icon="Send"
                        key="submit"
                        type="button"
                        onClick={(t) => {
                          // hard coding the first input
                          console.log(this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress);
                          state[inputs[0].name] = this.props.match.params.propId;
                          handleSubmit(t);
                          }
                        }
                        position="relative"
                      >
                        Submit
                      </button>
                    </form>
                    </>
                  )}/>
        <ul>
          {candidates}
        </ul>
        </div>
    );
  }
}

export default ProposalComponent;
