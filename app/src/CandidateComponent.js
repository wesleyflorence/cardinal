import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import RatingComponent from "./RatingComponent";

const { ContractData } = newContextComponents;


class CandidateComponent extends React.Component {
  state = { votedTracker: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const ballotContract = drizzle.contracts.Ballot;
    const votedTracker = ballotContract.methods.votedAlready.cacheCall(this.props.propId, this.props.index);
    this.setState({votedTracker});
  }

  render() {
    let votedStatus = true;
    let rating;

    if (this.props.drizzleState.drizzleStatus.initialized) {
      const ballotContractState = this.props.drizzleState.contracts;
      const votedFromCache = ballotContractState.Ballot.votedAlready[this.state.votedTracker];
      if (votedFromCache) {
        votedStatus = votedFromCache.value;
      }
    }

    if (votedStatus === false) {
      rating = (
        <RatingComponent
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          propId={this.props.propId}
          index={this.props.index}
        />
      );
    }

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
          { rating }
          </div>
    );
  }
}

export default CandidateComponent;
