import React from "react";
import { useParams} from "react-router";
import auth from "../Utils/auth";

export default function ViewResult() {
    //Get poll id when clicked into this component
    const params = useParams();
    const poll_id = params.id;
    const address = auth.address;

    return (
        <React.Fragment>
        address is: {address}
        </React.Fragment>
      );
}