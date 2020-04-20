pragma solidity >=0.4.21 <0.7.0;

contract Ballot {
    struct MetaData {
        uint uniqueId;
        bytes32[] fields;
    }

    struct Voter {
        bool voted;
        bool registerd;
        //MetaData metaData;
        uint vote;
    }

    struct Proposal {
        string title;
        bytes32[] candidates;
        //uint[256] votes;
        //bytes32[] metaFeilds;
        //mapping (address => Voter) voters;
        //mapping (address => address) registeredVoters;
        //address[] votersAddress;
        address admin;
    }

    Proposal[] public proposals;

    function createProposal(string memory title) public returns (bool) {
        Proposal memory proposal;
        proposal.admin = msg.sender;
        proposal.title = title;
        
        // for (uint i = 0; i < candidateTitles.length; i++) {
        //     proposal.candidates[i] = candidateTitles[i];
        //     proposal.votes[i] = 0;
        // }

        proposals.push(proposal);
        return true;
    }

    function addCandidates(uint proposalIndex, bytes32 candidate) public returns (bool){
        if (proposals.length > 0) {
            proposals[proposalIndex].candidates.push(candidate);
        }
    }

    function getCandidates(uint proposalIndex, uint candidateIndex) public view returns (bytes32 candidateName) {
        if (proposals.length > 0) {
            Proposal storage p = proposals[proposalIndex];
            return (p.candidates[candidateIndex]);
        }
    }

    function getNumberOfProposals() public view returns (uint) {
        return proposals.length;
    }

    function getProposal(uint proposalIndex) public view returns (string memory title) {
        if (proposals.length > 0) {
            Proposal storage p = proposals[proposalIndex];
            return (p.title);
        }
    }

}
