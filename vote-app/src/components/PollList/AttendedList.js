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

import Web3Service from "../../blockchain/web3.service";

// Generate Order Data
function createData(id, description, voted, status) {
  return { id, description, voted, status };
}


//Project list component
class CreatedList extends React.Component {
  constructor() {
    super();
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    const data = Web3Service.call("getVotePoll");
    this.setState({ listItems: data });
  }

  //Click to view poll result
  resultButton = (id) => {
    return (
      <Button
        color="blue"
        component={Link}
        to={{
          pathname: `/result/${id}`,
        }}
      >
        View
      </Button>
    );
  };

  //Click to vote
  voteButton = (id) => {
    return (
      <Button
        color="blue"
        component={Link}
        to={{
          pathname: `/vote/${id}`,
        }}
      >
        View
      </Button>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Voted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Details</TableCell>
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
                {row.voted === "true" ? (
                  <TableCell>Yes</TableCell>
                ) : (
                  <TableCell>No</TableCell>
                )}
                {/* Status */}
                {row.status === "true" ? (
                  <TableCell>In progress</TableCell>
                ) : (
                  <TableCell>Closed</TableCell>
                )}
                {/* Link to view result */}
                {row.status === "true" ? (
                  <TableCell align="right">{this.voteButton(row.id)}</TableCell>
                ) : (
                  <TableCell align="right">
                    {this.resultButton(row.id)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default CreatedList;
