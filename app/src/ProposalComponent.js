import React from "react";
import { newContextComponents } from "@drizzle/react-components";

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
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="Ballot"
            method="getCandidates"
            methodArgs={[this.props.match.params.propId, i]}
            toUtf8={true}
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
                          key={inputs[0].name}
                          type="hidden"
                          name={inputs[0].name}
                          value={this.props.match.params.propId}
                          placeholder="Input new value here"
                          onChange={handleInputChange}
                          mr={10}
                        />
                        <input
                          key={inputs[1].name}
                          type={inputTypes[1]}
                          name={inputs[1].name}
                          value={state[inputs[1].name]}
                          placeholder="Input new value here"
                          onChange={handleInputChange}
                          mr={10}
                        />
                      <button
                        icon="Send"
                        key="submit"
                        type="button"
                        onClick={handleSubmit}
                        position="relative"
                        top={8}
                      >
                        Submit
                      </button>
                    </form>
                    </>
                  )}/>
        {candidates}
        </div>
    );
  }
}

export default ProposalComponent;
