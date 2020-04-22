import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { ContractData } = newContextComponents;


class ProposalListComponent extends React.Component {

  componentDidMount() {
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
