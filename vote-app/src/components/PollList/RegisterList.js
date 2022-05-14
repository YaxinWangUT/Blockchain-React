import * as React from "react";
import { useState, setState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Poll from "../../Utils/setLocal";
import { useNavigate } from "react-router-dom";

import Web3Service from "../../blockchain/web3.service";

//Project list component
class RegisterList extends React.Component {
  constructor() {
    super();
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    const data = Web3Service.call("getRegesterPoll");
    this.setState({ listItems: data });
  }

  //arrays of objects
  rows_test1 = [];

  rows_test3 = [this.createData("005", Poll.getQuestion(), "true")];

  handleClick = () => {
    //let navigate = useNavigate();
    console.log("clicked！");
    Poll.setRegister();
    //navigate('/home');
  };

  //Click to view poll result
  registerButton = () => {
    return (
      <Button color="blue" href="/home" onClick={this.handleClick}>
        Register
      </Button>
    );
  };

  //Click to vote
  alertButton = () => {
    return <Button color="blue">View</Button>;
  };

  render() {
    return (
      <React.Fragment>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.listItems.map((row) => (
              <TableRow key={row.description}>
                {/* Description */}
                <TableCell>
                  <Box
                    sx={{
                      maxWidth: 500,
                      flexGrow: 1,
                      overflow: "hidden",
                      px: 0,
                    }}
                  >
                    {row.description}
                  </Box>
                </TableCell>

                {/* If registered */}
                {row.status === "true" ? (
                  <TableCell align="right">You have registered</TableCell>
                ) : (
                  <TableCell align="right">{this.registerButton()}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default RegisterList;
