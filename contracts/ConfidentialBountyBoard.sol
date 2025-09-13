// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ConfidentialBountyBoard {
    
    struct Bounty {
        uint256 bountyId;
        uint256 rewardAmount;
        uint256 difficulty;
        uint256 maxApplicants;
        uint256 currentApplicants;
        bool isActive;
        bool isCompleted;
        string title;
        string description;
        string requirements;
        address creator;
        uint256 deadline;
        uint256 createdAt;
    }
    
    struct Application {
        uint256 applicationId;
        uint256 bountyId;
        uint256 proposedAmount;
        uint256 estimatedTime;
        bool isAccepted;
        bool isCompleted;
        string proposal;
        address applicant;
        uint256 submittedAt;
    }
    
    struct Submission {
        uint256 submissionId;
        uint256 applicationId;
        uint256 qualityScore;
        bool isVerified;
        string submissionHash;
        string feedback;
        address submitter;
        uint256 submittedAt;
    }
    
    struct UserProfile {
        uint256 reputation;
        uint256 completedBounties;
        uint256 totalEarnings;
        bool isVerified;
        string skills;
        address user;
    }
    
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => Application) public applications;
    mapping(uint256 => Submission) public submissions;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => uint256) public userReputation;
    
    uint256 public bountyCounter;
    uint256 public applicationCounter;
    uint256 public submissionCounter;
    
    address public owner;
    address public verifier;
    
    event BountyCreated(uint256 indexed bountyId, address indexed creator, string title);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed bountyId, address indexed applicant);
    event ApplicationAccepted(uint256 indexed applicationId, address indexed applicant);
    event SubmissionSubmitted(uint256 indexed submissionId, uint256 indexed applicationId, address indexed submitter);
    event SubmissionVerified(uint256 indexed submissionId, bool isVerified);
    event BountyCompleted(uint256 indexed bountyId, address indexed creator);
    event ReputationUpdated(address indexed user, uint256 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createBounty(
        string memory _title,
        string memory _description,
        string memory _requirements,
        uint256 _deadline,
        uint256 _rewardAmount,
        uint256 _difficulty,
        uint256 _maxApplicants
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Bounty title cannot be empty");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 bountyId = bountyCounter++;
        
        bounties[bountyId] = Bounty({
            bountyId: bountyId,
            rewardAmount: _rewardAmount,
            difficulty: _difficulty,
            maxApplicants: _maxApplicants,
            currentApplicants: 0,
            isActive: true,
            isCompleted: false,
            title: _title,
            description: _description,
            requirements: _requirements,
            creator: msg.sender,
            deadline: _deadline,
            createdAt: block.timestamp
        });
        
        emit BountyCreated(bountyId, msg.sender, _title);
        return bountyId;
    }
    
    function submitApplication(
        uint256 _bountyId,
        string memory _proposal,
        uint256 _proposedAmount,
        uint256 _estimatedTime
    ) public returns (uint256) {
        require(bounties[_bountyId].creator != address(0), "Bounty does not exist");
        require(bounties[_bountyId].isActive, "Bounty is not active");
        require(block.timestamp <= bounties[_bountyId].deadline, "Bounty deadline has passed");
        
        uint256 applicationId = applicationCounter++;
        
        applications[applicationId] = Application({
            applicationId: applicationId,
            bountyId: _bountyId,
            proposedAmount: _proposedAmount,
            estimatedTime: _estimatedTime,
            isAccepted: false,
            isCompleted: false,
            proposal: _proposal,
            applicant: msg.sender,
            submittedAt: block.timestamp
        });
        
        // Increment current applicants count
        bounties[_bountyId].currentApplicants++;
        
        emit ApplicationSubmitted(applicationId, _bountyId, msg.sender);
        return applicationId;
    }
    
    function acceptApplication(uint256 _applicationId) public {
        Application storage application = applications[_applicationId];
        require(application.applicant != address(0), "Application does not exist");
        require(bounties[application.bountyId].creator == msg.sender, "Only bounty creator can accept");
        require(!application.isAccepted, "Application already accepted");
        
        application.isAccepted = true;
        emit ApplicationAccepted(_applicationId, application.applicant);
    }
    
    function submitWork(
        uint256 _applicationId,
        string memory _submissionHash,
        uint256 _qualityScore
    ) public returns (uint256) {
        Application storage application = applications[_applicationId];
        require(application.applicant != address(0), "Application does not exist");
        require(application.applicant == msg.sender, "Only applicant can submit work");
        require(application.isAccepted, "Application must be accepted first");
        require(!application.isCompleted, "Application already completed");
        
        uint256 submissionId = submissionCounter++;
        
        submissions[submissionId] = Submission({
            submissionId: submissionId,
            applicationId: _applicationId,
            qualityScore: _qualityScore,
            isVerified: false,
            submissionHash: _submissionHash,
            feedback: "",
            submitter: msg.sender,
            submittedAt: block.timestamp
        });
        
        emit SubmissionSubmitted(submissionId, _applicationId, msg.sender);
        return submissionId;
    }
    
    function verifySubmission(
        uint256 _submissionId,
        bool _isVerified,
        string memory _feedback
    ) public {
        require(msg.sender == verifier, "Only verifier can verify submissions");
        require(submissions[_submissionId].submitter != address(0), "Submission does not exist");
        
        Submission storage submission = submissions[_submissionId];
        submission.isVerified = _isVerified;
        submission.feedback = _feedback;
        
        if (_isVerified) {
            Application storage application = applications[submission.applicationId];
            application.isCompleted = true;
            
            // Mark bounty as completed if all applications are done
            Bounty storage bounty = bounties[application.bountyId];
            bounty.isCompleted = true;
            bounty.isActive = false;
            
            emit BountyCompleted(application.bountyId, bounty.creator);
        }
        
        emit SubmissionVerified(_submissionId, _isVerified);
    }
    
    function updateUserReputation(address _user, uint256 _reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        userReputation[_user] = _reputation;
        emit ReputationUpdated(_user, _reputation);
    }
    
    function createUserProfile(
        string memory _skills,
        uint256 _initialReputation
    ) public {
        require(userProfiles[msg.sender].user == address(0), "Profile already exists");
        
        userProfiles[msg.sender] = UserProfile({
            reputation: _initialReputation,
            completedBounties: 0,
            totalEarnings: 0,
            isVerified: false,
            skills: _skills,
            user: msg.sender
        });
    }
    
    function getBountyInfo(uint256 _bountyId) public view returns (
        string memory title,
        string memory description,
        string memory requirements,
        uint256 rewardAmount,
        uint256 difficulty,
        uint256 maxApplicants,
        uint256 currentApplicants,
        bool isActive,
        bool isCompleted,
        address creator,
        uint256 deadline,
        uint256 createdAt
    ) {
        Bounty storage bounty = bounties[_bountyId];
        return (
            bounty.title,
            bounty.description,
            bounty.requirements,
            bounty.rewardAmount,
            bounty.difficulty,
            bounty.maxApplicants,
            bounty.currentApplicants,
            bounty.isActive,
            bounty.isCompleted,
            bounty.creator,
            bounty.deadline,
            bounty.createdAt
        );
    }
    
    function getApplicationInfo(uint256 _applicationId) public view returns (
        uint256 bountyId,
        uint256 proposedAmount,
        uint256 estimatedTime,
        bool isAccepted,
        bool isCompleted,
        string memory proposal,
        address applicant,
        uint256 submittedAt
    ) {
        Application storage application = applications[_applicationId];
        return (
            application.bountyId,
            application.proposedAmount,
            application.estimatedTime,
            application.isAccepted,
            application.isCompleted,
            application.proposal,
            application.applicant,
            application.submittedAt
        );
    }
    
    function getSubmissionInfo(uint256 _submissionId) public view returns (
        uint256 applicationId,
        uint256 qualityScore,
        bool isVerified,
        string memory submissionHash,
        string memory feedback,
        address submitter,
        uint256 submittedAt
    ) {
        Submission storage submission = submissions[_submissionId];
        return (
            submission.applicationId,
            submission.qualityScore,
            submission.isVerified,
            submission.submissionHash,
            submission.feedback,
            submission.submitter,
            submission.submittedAt
        );
    }
    
    function getUserReputation(address _user) public view returns (uint256) {
        return userReputation[_user];
    }
    
    function getUserProfile(address _user) public view returns (
        uint256 reputation,
        uint256 completedBounties,
        uint256 totalEarnings,
        bool isVerified,
        string memory skills
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            profile.reputation,
            profile.completedBounties,
            profile.totalEarnings,
            profile.isVerified,
            profile.skills
        );
    }
}