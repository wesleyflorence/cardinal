import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class ProposalListComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  }

  render() {
    return (
        <ContractData
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          contract="Ballot"
          method="getProposal"
          methodArgs={[this.props.index]}
          toUtf8={true}
        />
    );
  }
}

export default ProposalListComponent;
