import Web3 from "web3";
import Ballot from "./contracts/Ballot.json";

const options = {
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    }
  },
  contracts: [Ballot]
};

export default options;
