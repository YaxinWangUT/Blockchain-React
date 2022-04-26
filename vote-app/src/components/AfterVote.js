import React, { Component } from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";

export default function AfterVote() {
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home');
    }
        return (
            <div>
            <Typography variant="h4" mt={6} >
            {"Thank you for your participation!"}
            {"You may check the result after this voting end."}
            </Typography>
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color = "blue"
              sx={{ mt: 15, mb: 2, maxWidth: '300px', fontSize: '30px'}}
            >
              Back to homepage
            </Button>
            </div>
        );
    }

 
