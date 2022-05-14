import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from 'react-router-dom';
import Web3Service from "../blockchain/web3.service";

import Poll from "../Utils/setLocal"

const mdTheme = createTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#616161", contrastText: "#fff" },
      blue: { main: "#2196f3", contrastText: "#fff" },
    },
  });

export default function CreatePoll() {
    let navigate = useNavigate();
    const [options,setOptions] = useState([
        {option: ''},
        {option: ''},
    ])
    const handleOptions=(value,index)=>()=>{
        const newOption=[...options];
        newOption.push(index,{option: value});
        }
        setOptions(newOption);
    }

    const [descript, setDescript] = useState("");
    const [STime, setSTime] = useSTime("");
    const [RTime, setRTime] = useRTime("");
    const [VTime, setVTime] = useVTime("");
    const [Bar, setBar] = useBar("");
    const handleSubmit = (event) => {
        Web3Service.execute(create_poll, description, options, STime, RTime, VTime, Bar);
        console.log("poll created");
        console.log(Poll.getState());
        Poll.questionCreated(descript);
        console.log(Poll.getState());
        console.log(Poll.getQuestion());
        //console.log(descript);
        navigate('/home');

    }
    const handleAddOption = (event) => {
        setOptions([...options,{option: ''}])
    }
    const handleDropOption = (index) => {
        const values=[...options];
        values.splice(index,1);
        setOptions(values);
    }

    return (
    <ThemeProvider theme={mdTheme}>
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
        <Typography variant="h4" >
          create new Poll
        </Typography>
        <hr/>
        <Typography variant="h5" >
          basic informations:
        </Typography>
        
        <form>
            <div><TextField 
            id="descript" 
            label="decription" 
            variant="filled" 
            value = {descript}
            onChange = {(e) => setDescript(e.target.value)} /></div>
            <div><TextField id="time1" label="starting time" variant="filled" onChange = {(event) => setSTime(event.target.value)}/></div>
            <div><TextField id="time2" label="registration end time" variant="filled" onChange = {(event) => setRTime(event.target.value)}/></div>
            <div><TextField id="time3" label="voting end time" variant="filled" onChange = {(event) => setVTime(event.target.value)}/></div>
            <div><TextField id="bar" label="voting bar" variant="filled" onChange = {(event) => setBar(event.target.value)}/></div>
            <hr/>
            <Typography variant="h5" >designing options:</Typography>
            {options.map((option,index)=>(
                <div key={index}>
                    <TextField id="option" label={index+1} variant="standard" onChange = {(event,index) => handleOption(event.target.value)}/>
                    <IconButton onClick={handleAddOption}><AddIcon/></IconButton>
                    <IconButton onClick={handleDropOption}><DeleteIcon/></IconButton>
                </div>
            ))}
        
        </form>
        <hr/>
        <Button type="submit"  onClick={handleSubmit}  variant="contained"  color = "blue">create</Button>
        </Grid>
      </Box>
    </ThemeProvider>
      );
}
