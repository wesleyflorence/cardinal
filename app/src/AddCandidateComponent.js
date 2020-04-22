import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { ContractForm } = newContextComponents;


class AddCandidateComponent extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
        <ContractForm 
          drizzle={this.props.drizzle} 
          contract="Ballot" method="addCandidates" 
          methodArgs={[{ from: this.props.drizzleState.accounts[0] }]} 
          render={({
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
                          placeholder="Add a Candidate here"
                          onChange={handleInputChange}
                        />
                      <button
                        icon="Send"
                        key="submit"
                        type="button"
                        onClick={(t) => {
                          // hard coding the first input
                          console.log(this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress);
                          state[inputs[0].name] = this.props.propId;
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
    );
  }
}

export default AddCandidateComponent;
