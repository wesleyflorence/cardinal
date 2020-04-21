import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class CandidateComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState, index } = this.props;
  }

  render() {
    return (
          <section className="section">
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="Ballot"
            method="getCandidates"
            methodArgs={[this.props.propId, this.props.index]}
            toUtf8={true}
          />
          <p>
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="Ballot"
            method="getVoteTally"
            methodArgs={[this.props.propId, this.props.index]}
          />
          </p>
          <ContractForm
            drizzle={this.props.drizzle}
            contract="Ballot"
            method="vote"
            render={({
              inputs,
              inputTypes,
              state,
              handleInputChange,
              handleSubmit
            }) => (
              <>
              <form onSubmit={handleSubmit}>
                <button
                  icon="Send"
                  key="submit"
                  type="button"
                  onClick={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    handleSubmit(t);
                  }}
                  position="relative"
                >
                Vote
                </button>
              </form>
            </>
          )}
      />
      </section>
    );
  }
}

export default CandidateComponent;
