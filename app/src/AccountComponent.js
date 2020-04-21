import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


class AccountComponent extends React.Component {

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
  }

  render() {
    return (
    <div className="App">
      <div className="section">
        <h2>Active Account</h2>
          <div className="address">
          { this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress }
          </div>
      </div>
    </div>
    );
  }
}

export default AccountComponent;
