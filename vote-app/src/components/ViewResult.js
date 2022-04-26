import { useParams} from "react-router";
import React, { useState } from "react";
import {TableBody, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function ViewResult() {
    //Get poll id when clicked into this component
    const params = useParams();
    const poll_id = params.id;

    const Poll = {
        status: "closed",
        description: 'Which is better? Cat or dog?',
        startTime:'2022.01.23',
        endTime:'2022.04.23',
        votingBar:'100',
        registrated:'234',
        };
    const [options,setOptions] = useState([
            {option: 'Cat',result: 83},
            {option: 'Dog',result: 78},
            {option: 'Neigher',result: 1},
    ])

    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
          <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          style={{ minHeight: "100vh" }}
        >
        <Typography variant="h4" mt={6} >
            {"voting result for Poll id: "}
            {poll_id}
         </Typography>
         <Typography variant="h6" mt={4} >
            {"status: closed"}
         </Typography>
         <table sx={{minWidth:650}} aria-label="results table">
            <TableBody>
                <TableRow>
                    <TableCell>{"Descroption:"}</TableCell>
                    <TableCell align="center">{Poll.description}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{"Start Time:"}</TableCell>
                    <TableCell align="center">{Poll.startTime}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{"End Time:"}</TableCell>
                    <TableCell align="center">{Poll.endTime}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{"Voting Bar:"}</TableCell>
                    <TableCell align="center">{Poll.votingBar}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{"registrated:"}</TableCell>
                    <TableCell align="center">{Poll.registrated}</TableCell>
                </TableRow>
                {options.map((option,index)=>(
                    <TableRow key={index}>
                        <TableCell>{option.option}</TableCell>
                        <TableCell align="center">{option.result}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
         </table>
        </Grid>
      </Box>
      );
}
