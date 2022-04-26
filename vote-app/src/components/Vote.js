import React, { useState } from "react";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useParams} from "react-router";
import { List } from "@mui/material";

const mdTheme = createTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#616161", contrastText: "#fff" },
      blue: { main: "#2196f3", contrastText: "#fff" },
    },
  });

export default function Vote() {
    //Get poll id when clicked into this component
    const params = useParams();
    const poll_id = params.id;

    const Poll = {
        status: "voting",
        description: 'Who is the best teacher in our university?',
        };
    const [options,setOptions] = useState([
            {option: 'Professor Suzanne Barber'},
            {option: 'Professor Daniel P.Miranker'},
            {option: 'Professor Abhay Samant'},
    ])

    const handleSubmit = (event) => {
        console.log("poll created")
    }
    const [checked, setChecked]=useState([0]);
    const handleCheck=(value)=>()=>{
        const currentIndex=checked.indexOf(value);
        const newChecked=[...checked];
        if(currentIndex===-1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked);
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
          <Typography variant="h4" mt={6} >
            {Poll.description}
          </Typography>
          <Typography variant="h4" mt={2} >
            {"status:"}
            {Poll.status}
          </Typography>
          <hr/>
          {Poll.status=="registration"?(
              <Button>Register for this Poll</Button>
          ):(
              <List sx={{bgcolor:'background.paper'}}>
                {options.map((option,index)=>(
              <ListItem key={index}>
                  <ListItemButton role={undefined} onClick={handleCheck(index)}>
                      <ListItemIcon>
                          <Checkbox edge="start" checked={checked.indexOf(index)!==-1} tabIndex={-1}
                          disableRipple inputProps={{'aria-labelledby':index}} />
                      </ListItemIcon>
                      <ListItemText id={index} primary={option.option}/>
                  </ListItemButton>
              </ListItem>
            ))}
              </List>
          )}

          <hr/>
          <Button type="submit"  onClick={handleSubmit}  variant="contained"  color = "blue">vote</Button>
          
          </Grid>
        </Box>
      </ThemeProvider>
      );
}
