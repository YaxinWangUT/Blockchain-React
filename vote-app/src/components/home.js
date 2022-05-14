import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import CreatedList from "./PollList/CreatedList";
import AttendedList from "./PollList/AttendedList";
import RegisterList from "./PollList/RegisterList";

const mdTheme = createTheme({
  palette: {
    primary: { main: "#e91e63", contrastText: "#fff" },
    secondary: { main: "#616161", contrastText: "#fff" },
    blue: { main: "#2196f3", contrastText: "#fff" },
  },
});

function CreatedPolls() {
  return (
    <Container component="main" sx={{ mt: 10, mb: 2 }} maxWidth="sm">
      <Typography variant="h4" component="h3">
        Polls I Create
      </Typography>
      <CreatedList />
      <Button
        fullWidth
        variant="contained"
        color="blue"
        component={Link}
        to={{
          pathname: `/create`,
        }}
        sx={{ mt: 2, mb: 2, maxWidth: "200px" }}
      >
        Setup New Poll
      </Button>
    </Container>
  );
}


function AttendedPolls() {
  return (
    <Container component="main" sx={{ mt: 5, mb: 2 }} maxWidth="sm">
      <Typography variant="h4" component="h3">
        Polls to be Voted
      </Typography>
      <AttendedList />
    </Container>
  );
}

function RegisterPolls() {
  return (
    <Container component="main" sx={{ mt: 5, mb: 2 }} maxWidth="sm">
      <Typography variant="h4" component="h3">
        Polls to be Registered
      </Typography>
      <RegisterList />
    </Container>
  );
}

export default function Home() {
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
          <Grid item xs={3}>
            <CreatedPolls />
          </Grid>

          <Grid item xs={3}>
            <RegisterPolls />
          </Grid>

          <Grid item xs={3}>
            <AttendedPolls />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
