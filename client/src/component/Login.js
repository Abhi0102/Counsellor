import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item md={4} my={10}>
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
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
