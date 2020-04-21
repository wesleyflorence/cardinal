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
        <AccountData
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>
    </div>
    );
  }
}

export default AccountComponent;
