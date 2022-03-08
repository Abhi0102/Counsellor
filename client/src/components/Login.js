import React, { useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

import axios from "axios";
import { Link } from "react-router-dom";
import { login } from "../actions/user";

function Login(props) {
  // Handling For Submit
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(login(data));
  };
  return (
    <Grid container justifyContent="center">
      <Grid item md={6} my={10}>
        <Card elevation={4}>
          <CardHeader title="Login" />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                id="email"
                name="email"
                label="Email"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                fullWidth
              />

              {error}
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Login
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/register"
                sx={{ mb: 2 }}
                fullWidth
                color="error"
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
