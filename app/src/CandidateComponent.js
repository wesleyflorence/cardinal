import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import RatingComponent from "./RatingComponent";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class CandidateComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState, index } = this.props;
  }

  render() {
    let rating = 0;
    return (
          <div className="sectionCandidate">
          <strong>
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="Ballot"
            method="getCandidates"
            methodArgs={[this.props.propId, this.props.index]}
            toUtf8={true}
          />
          </strong>
          &nbsp;&nbsp;
          <ContractData
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            contract="Ballot"
            method="getVoteTally"
            methodArgs={[this.props.propId, this.props.index]}
          />
          <RatingComponent
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            propId={this.props.propId}
            index={this.props.index}
            />
          </div>
    );
  }
}

export default CandidateComponent;
