import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class ProposalComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  }

  render() {
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
        </div>
    );
  }
}

export default ProposalComponent;
