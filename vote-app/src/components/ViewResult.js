import React from "react";
import { useParams} from "react-router";

export default function ViewResult() {
    //Get poll id when clicked into this component
    const params = useParams();
    const poll_id = params.id;

    return (
        <React.Fragment>
            ID of this poll is: {poll_id}
        </React.Fragment>
      );
}