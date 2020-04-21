pragma solidity >=0.4.21 <0.7.0;

contract Ballot {
    struct Voter {
        bool voted;
        bool registerd;
        uint vote;
    }

    struct Proposal {
        bytes32 title;
        bytes32[] candidates;
        uint[] votes;
        //bytes32[] metaFeilds;
        //mapping (address => Voter) voters;
        //mapping (address => address) registeredVoters;
        address[] votersAddress;
        address admin;
    }

    Proposal[] public proposals;

    function createProposal(bytes32 title) public returns (bool) {
        Proposal memory proposal;
        proposal.admin = msg.sender;
        proposal.title = title;
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

    function getNumberOfCandidates(uint proposalIndex) public view returns (uint) {
        if (proposals.length > 0) {
            return proposals[proposalIndex].candidates.length;
        }
    }

    function getNumberOfProposals() public view returns (uint) {
        return proposals.length;
    }

    function getProposal(uint proposalIndex) public view returns (bytes32 title) {
        if (proposals.length > 0) {
            Proposal storage p = proposals[proposalIndex];
            return (p.title);
        }
    }

}
