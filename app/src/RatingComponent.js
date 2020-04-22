import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class RatingComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  }

  render() {
    return (
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
                <div className="rate">
                  <input type="radio" id={ "star5_" + this.props.index } className="rate" value="5" onClick={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    state[inputs[2].name] = 5;
                    handleSubmit(t);
                  }}/>
                  <label htmlFor={ "star5_" + this.props.index }  title="Advocate">5 stars</label>

                  <input type="radio" id={ "star4_" + this.props.index } className="rate" value="4" onChange={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    state[inputs[2].name] = 4;
                    handleSubmit(t);
                  }}/>
                  <label htmlFor={ "star4_" + this.props.index } title="Approve">4 stars</label>

                  <input type="radio" id={ "star3_" + this.props.index } className="rate" value="3" onChange={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    state[inputs[2].name] = 3;
                    handleSubmit(t);
                  }}/>
                  <label htmlFor={ "star3_" + this.props.index } title="Neutral">3 stars</label>

                  <input type="radio" id={ "star2_" + this.props.index }  className="rate" value="2" onChange={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    state[inputs[2].name] = 2;
                    handleSubmit(t);
                  }}/>
                  <label htmlFor={ "star2_" + this.props.index } title="Disapprove">2 stars</label>

                  <input type="radio" id={ "star1_" + this.props.index } className="rate" value="1" onChange={(t) => {
                    state[inputs[0].name] = this.props.propId;
                    state[inputs[1].name] = this.props.index;
                    state[inputs[2].name] = 1;
                    handleSubmit(t);}}/>
                  <label htmlFor={ "star1_" + this.props.index } title="Condemn">1 star</label>
                </div>
              </form>
            </>
          )}
      />
    );
  }
}

export default RatingComponent;

