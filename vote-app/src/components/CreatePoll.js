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
    const [descript, setDescript] = useState("");
    const handleSubmit = (event) => {
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
            <div><TextField id="time1" label="starting time" variant="filled"/></div>
            <div><TextField id="time2" label="registration end time" variant="filled"/></div>
            <div><TextField id="time3" label="voting end time" variant="filled"/></div>
            <div><TextField id="bar" label="voting bar" variant="filled"/></div>
            <hr/>
            <Typography variant="h5" >designing options:</Typography>
            {options.map((option,index)=>(
                <div key={index}>
                    <TextField id="option" label={index+1} variant="standard" />
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