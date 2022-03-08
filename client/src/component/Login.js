import React, { useState } from "react";

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

function Login(props) {
  // Handling For Submit
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("/api/v1/login", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.message);
      });
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
