import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Container from '../container';
import { Grid } from '@mui/material';

export default function AfterVote() {
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home');
    }

    return (
        <Grid alignItems="center">
            <Typography variant="h4" mt={6} >{"Thank you for your participation!"}</Typography>
            <Typography variant="h4" mt={4} >{"You may check the result after this voting end."}</Typography>
            <Container component="main" sx={{ mt: 20, mb: 2 }} maxWidth="lg"> </Container>
            <Button type="submit"onClick={handleSubmit} variant="contained" sx={{mt:20, maxWidth: '300px'}}>Back to homepage</Button>

        </Grid>
        );
    }
