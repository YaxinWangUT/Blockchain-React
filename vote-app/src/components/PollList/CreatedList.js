import * as React from "react";
import { useState, setState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Poll from "../../Utils/setLocal";

import Web3Service from "../../blockchain/web3.service";

const mdTheme = createTheme({
  palette: {
    blue: { main: "#2196f3", contrastText: "#fff" },
  },
});

//Project list component
class CreatedList extends React.Component {
  constructor() {
    console.log(Poll.getState());
    super();
    this.state = {
      listItems: this.rows_test1,
    };
  }

  componentDidMount() {
    const data = Web3Service.call("getRegisterPoll");
    this.setState({ listItems: data });
  }

  // Generate Order Data
  // Data from backend: poll id (string), poll description(string), poll status (true/false)
  createData(id, description, status) {
    return { id, description, status };
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

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={mdTheme}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.listItems.map((row) => (
                <TableRow key={row.id}>
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
                  {/* Status */}
                  {row.status === "true" ? (
                    <TableCell>In progress</TableCell>
                  ) : (
                    <TableCell>Closed</TableCell>
                  )}
                  {/* Link to view result */}
                  {row.status === "true" ? (
                    <TableCell align="right">NOT AVAILABLE</TableCell>
                  ) : (
                    <TableCell align="right">
                      {this.resultButton(row.id)}
                    </TableCell>
                  )}
                  {/* <TableCell>{this.editButton(row.project_id)}</TableCell>
                <TableCell>{this.deleteButton(row.project_id)}</TableCell>
                <TableCell align="right">
                  {this.detailButton(row.project_id)}
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default CreatedList;
