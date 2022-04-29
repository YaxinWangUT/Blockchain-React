pragma solidity ^0.8.7;

contract VotingContract{
    struct Poll{
        uint256 poll_id;
        string poll_name;
        string question;
        uint64[] votes; // store the voters'id for each option
        bytes32[] options;
        uint256 poll_status; // 0 for register, 1 for vote, 2 for end
        uint256 birth_time; // time when creating the poll
        uint256 register_time; // length of time for registration
        uint256 vote_time; // length of time for voting
        address creator; // the user who created the poll
        address[] registered_users; // store who is registered
    }

    struct Voter{
        address voter_id;
        uint256 num_of_stocks; // store the number of stocks of a voter
        uint256[] voted_ids; // store all the polls that a voter has voted
        mapping (uint256 => bool) voted_map;
        uint256[] created_poll;
    }
    
    struct result_for_get_poll{
        uint256[] poll_ids;
        string[] question_list;
        bool[] voted_list;
        uint256[] poll_status_list;
    }

    Poll[] private polls; // stores all the established polls
    mapping(address => Voter) private voters; //stores all the available voters
    
    event poll_created(uint256 _poll_id, address _user_address);

    function verifyCreate(address _user_address) public view returns(bool){
        // Verify if the user address can create a poll or not
        if (voters[_user_address].num_of_stocks > 10){
            return true;
        } 
        else{
            return false;
        }
    }

    function create_poll(address _user_address, string memory _poll_name, string memory _question, bytes32[] memory _options, uint256 _register_time, uint256 _vote_time) public{
        require(bytes(_poll_name).length>0, "We need a poll name when creating polls");
        require(bytes(_question).length>0, "We do not allow emputy questions when creating polls");
        require(_options.length > 1, "We need at least 2 options");
        require(verifyCreate(_user_address), "You are not allowed to create polls.");

        uint256 new_poll_id = polls.length;

        Poll memory newPoll = Poll({
            poll_id: new_poll_id,
            poll_name: _poll_name,
            question: _question,
            options: _options,
            votes: new uint64[](_options.length),
            poll_status: 0,
            birth_time: block.timestamp,
            register_time: _register_time,
            vote_time: _vote_time,
            creator: _user_address,
            registered_users: new address[](100) // 100 users at the maximum
        });

        polls.push(newPoll);
        voters[_user_address].created_poll.push(new_poll_id);

        emit poll_created(new_poll_id, _user_address);
    }

    function get_poll(uint256 _poll_id) public returns(uint256, string memory, string memory, uint64[] memory, bytes32[] memory, uint256){
        require( _poll_id < polls.length, "Poll ID exceeds the maximal poll ID.");
        require(_poll_id >= 0, "Poll ID must be greater than or equal to 0.");
        uint256 current_time = block.timestamp;
        if (current_time > (polls[_poll_id].birth_time + polls[_poll_id].register_time + polls[_poll_id].vote_time)){
            polls[_poll_id].poll_status = 2;
        } 
        else{
            if (current_time > (polls[_poll_id].birth_time + polls[_poll_id].register_time)){
                polls[_poll_id].poll_status = 1;
            }
            else{
                polls[_poll_id].poll_status = 0;
            }
        }
        return (
            polls[_poll_id].poll_id,
            polls[_poll_id].poll_name,
            polls[_poll_id].question,
            polls[_poll_id].votes,
            polls[_poll_id].options,
            polls[_poll_id].poll_status
        );
    }

    function get_voter(address _voter_address) external view returns(address, uint256[] memory){
        // return the voter id and voted polls according to voter's address
        return(
            voters[_voter_address].voter_id,
            voters[_voter_address].voted_ids
        );
    }
    
    function get_total_polls() external view returns(uint256){
        return polls.length;
    }

    function verifyAddress(address _user_address) public view returns(bool){
        // Verify if the user address is a valid address
        if (_user_address == 0x001d3F1ef827552AE1114027BD3eCf1F086Ba0F7){
            return true;
        }
        if (_user_address == 0x001D3F1ef827552Ae1114027bD3ecF1f086ba0F8){
            return true;
        }
        if (_user_address == 0x001d3F1ef827552Ae1114027BD3ECF1f086bA0F9){
            return true;
        }
        return false ;
    }

    function getCreatedPoll(address _user_address) external returns(uint256[] memory, string[] memory, bool[] memory, uint256[] memory, uint256){
        // Get the polls created by this user
        // return the lists of poll_id, questions, voted_map, poll_status
        result_for_get_poll memory results = result_for_get_poll({
            poll_ids: new uint256[](100),
            question_list: new string[](100),
            voted_list: new bool[](100),
            poll_status_list: new uint256[](100)
        }
        );

        results.poll_ids =  voters[_user_address].created_poll;
        
        uint256 poll_id;
        string memory question;
        uint256 poll_status;
        uint256 num_polls = 0;

        for (uint i=0; i<results.poll_ids.length;i++){
             
            (poll_id, question, poll_status) = get_poll_id_question_status(results.poll_ids[i]);
            results.question_list[i] = question;
            results.poll_status_list[i] = poll_status;
            num_polls ++;

            // check if voted or not for the current user
            if (voters[_user_address].voted_map[poll_id]){
                results.voted_list[i] = true;
            }
            else{
                results.voted_list[i] = false;
            }
        }

        return(
            results.poll_ids,
            results.question_list,
            results.voted_list,
            results.poll_status_list,
            num_polls 
        );
    }
    
    
    function getRegisterPoll(address _user_address) external returns(uint256[] memory, string[] memory, bool[] memory, uint256[] memory, uint256){
        // Get the polls in register
        // return the lists of poll_id, questions, voted_map, poll_status
        result_for_get_poll memory results = result_for_get_poll({
            poll_ids: new uint256[](100),
            question_list: new string[](100),
            voted_list: new bool[](100),
            poll_status_list: new uint256[](100)
        }
        );

        uint256 poll_id;
        string memory question;
        uint256 poll_status;
        uint256 num_polls = 0;

        for (uint i=0; i<polls.length;i++){
             
            (poll_id, question, poll_status) = get_poll_id_question_status(i);
            if (poll_status == 0){
                results.poll_ids[num_polls] = poll_id;
                results.question_list[num_polls] = question;
                results.poll_status_list[num_polls] = poll_status;
                num_polls ++;

                // check if voted or not for the current user
                if (voters[_user_address].voted_map[poll_id]){
                    results.voted_list[poll_id] = true;
                }
                else{
                    results.voted_list[poll_id] = false;
                }
            }
            
        }

        return(
            results.poll_ids,
            results.question_list,
            results.voted_list,
            results.poll_status_list,
            num_polls 
        );
    }
    
    function get_poll_id_question_status(uint256 i) private returns(uint256, string memory, uint256){
        uint256 poll_id;
        string memory poll_name;
        string memory question;
        uint64[] memory votes;
        bytes32[] memory options;
        uint256 poll_status;
        (poll_id, poll_name, question, votes, options, poll_status) = get_poll(i);
        return(
            poll_id,
            question,
            poll_status
        );
    }
    
    function getVotePoll(address _user_address) external returns(uint256[] memory, string[] memory, bool[] memory, uint256[] memory, uint256){
        // Get the polls in voting
        // return the lists of poll_id, questions, voted_map, poll_status
        result_for_get_poll memory results = result_for_get_poll({
            poll_ids: new uint256[](100),
            question_list: new string[](100),
            voted_list: new bool[](100),
            poll_status_list: new uint256[](100)
        }
        );

        uint256 poll_id;
        string memory question;
        uint256 poll_status;
        uint256 num_polls = 0;

        for (uint i=0; i<polls.length;i++){
             
            (poll_id, question, poll_status) = get_poll_id_question_status(i);
            if (poll_status == 1){
                results.poll_ids[num_polls] = poll_id;
                results.question_list[num_polls] = question;
                results.poll_status_list[num_polls] = poll_status;
                num_polls ++;

                // check if voted or not for the current user
                if (voters[_user_address].voted_map[poll_id]){
                    results.voted_list[poll_id] = true;
                }
                else{
                    results.voted_list[poll_id] = false;
                }
            }
            
        }

        return(
            results.poll_ids,
            results.question_list,
            results.voted_list,
            results.poll_status_list,
            num_polls 
        );
    }
    

    function registerPoll(uint256 _poll_id) external{
        // Register a user to a existing poll. 
        // 1. Check if user is valid
        // 2. Check if poll is in register period   
        uint256 poll_id;
        string memory poll_name;
        string memory question;
        uint64[] memory votes;
        bytes32[] memory options;
        uint256 poll_status;

        (poll_id, poll_name, question, votes, options, poll_status) = get_poll(_poll_id);
        require(verifyAddress(msg.sender), "You are not a valid user");
        require(poll_status==0, "It is not the registration period for this poll.");

        bool existing_flag = false;
        for (uint i=0; i<polls[_poll_id].registered_users.length;i++){
            if (polls[_poll_id].registered_users[i] == msg.sender){
                existing_flag = true;
                break;
            }
        }
        if (!existing_flag){
            polls[_poll_id].registered_users.push(msg.sender);
        }
    }
    
    function vote(uint256 _poll_id, uint64 _vote) external {
        // the function for voting, add the vote to the corresponding option in the poll specified by poll ID.
        require(_poll_id < polls.length, "Poll ID exceeds the maximal poll ID.");
        require(_vote < polls[_poll_id].options.length, "Vote must be in the valid range of options.");
        require(voters[msg.sender].voted_map[_poll_id]==false, "You are already voted. Double voting is not allowed.");
        
        uint256 poll_id;
        string memory poll_name;
        string memory question;
        uint64[] memory votes;
        bytes32[] memory options;
        uint256 poll_status;
        (poll_id, poll_name, question, votes, options, poll_status) = get_poll(_poll_id);
        require(poll_status==1, "It is not the time for voting.");
        if (poll_status==1){
            bool register_flag = false;
            for (uint i=0; i<polls[_poll_id].registered_users.length; i++){
                if (polls[_poll_id].registered_users[i] == msg.sender){
                    register_flag=true;
                    break;
                }
            }
            require(register_flag, "You are not allowed to vote since you are not registered in the registration period.");
            polls[_poll_id].votes[_vote] += 1;
            voters[msg.sender].voted_ids.push(_poll_id);
            voters[msg.sender].voted_map[_poll_id] = true;
        }
        
    }
    
}
