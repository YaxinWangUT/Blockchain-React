import * as React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const colortheme = createTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#616161", contrastText: "#fff" },
      blue: {main: "#2196f3", contrastText: "#fff"}
    }
});

export default function Login() {
  let navigate = useNavigate();

  //Handle click on "get started" button
  const handleSubmit = (event) => {
      event.preventDefault();
    //Jump to project dashboard page
    navigate('/home');
  }
    return (
    <ThemeProvider theme={colortheme}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 40, mb: 2 }} maxWidth="lg">
        <Typography variant="h2" component="h1" >
          Online Voting System
        </Typography>
        <Typography variant="h4">&nbsp;</Typography>
        <Typography variant="h5" component="h2" color = "secondary">
          {'Powered by blockchain technology'}
        </Typography>
        <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color = "blue"
              sx={{ mt: 15, mb: 2, maxWidth: '300px', fontSize: '30px'}}
            >
              Get Started
        </Button>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            {"Presented by team Elephant"}
          </Typography>
          <Typography variant="body1">
            {"Team member: Jingwen Hu, Xingchao Liu, Yaxin Wang and Yue Xiong."}
          </Typography>
        </Container>

        
      </Box>
    </Box>
     </ThemeProvider>
    );
}

