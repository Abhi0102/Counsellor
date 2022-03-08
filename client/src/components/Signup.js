import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import axios from "axios";
import { Box } from "@mui/system";

const Input = styled("input")({
  display: "none",
});

function Signup(props) {
  const [error, setError] = useState("");
  const [pic, setPic] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Password & Confirm Password does not matches.");
      return;
    }

    axios
      .post("/api/v1/signup", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.error);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item md={6} my={10}>
        <Card elevation={4}>
          <CardHeader title="Register" />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                id="name"
                name="name"
                label="Name"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                required
                id="email"
                name="email"
                type="email"
                label="Email"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="dob"
                name="dob"
                helperText="Date of Birth *"
                // label="Date of Birth"
                type="date"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="qualification"
                name="qualification"
                label="Qualification"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="aboutme"
                name="aboutme"
                label="About Me"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="phno"
                name="phno"
                label="Phone No"
                type="number"
                fullWidth
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="role">Role *</InputLabel>
                <Select
                  labelId="role"
                  label="role"
                  defaultValue="User"
                  name="role"
                  required
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Counsellor">Counsellor</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />

              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  name="photo"
                  onChange={(e) => setPic(e.target.files[0].name)}
                />
                <Button variant="contained" component="span">
                  Profile Pic
                </Button>{" "}
                &nbsp;
                {pic}
              </label>

              <br />
              <br />

              <Typography variant="caption" color="error">
                {error}
              </Typography>
              <br />
              <Typography variant="caption" color="error">
                * All Fields are required
              </Typography>
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Register
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{ mb: 2 }}
                fullWidth
                color="error"
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

export default Signup;
