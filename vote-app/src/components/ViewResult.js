import { useParams} from "react-router";
import React, { useState } from "react";
import {TableBody, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function ViewResult() {
    //Get poll id when clicked into this component
    const params = useParams();
    const poll_id = params.id;

    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home');
    }

    const Poll = {
        status: "",
        description: '',
        startTime:'',
        endTime:'',
        votingBar:'',
        registrated:'',
        };
    const [options,setOptions] = useState([])
    componentDidMount() {
    const data = Web3Service.call("getResult");
    this.setState({ Pol: data });
  }

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
         <div><Button type="submit"onClick={handleSubmit} variant="contained" sx={{mt:20, maxWidth: '300px'}}>Back to homepage</Button></div>
        </Grid>
        
      </Box>
      );
}
