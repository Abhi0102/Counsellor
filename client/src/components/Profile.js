import React from "react";
import {
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import axios from "axios";
import { uploadPhoto } from "../actions/user";

const Input = styled("input")({
  display: "none",
});

function Profile(props) {
  const { userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handlePicUpload = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    let data = new FormData();
    data.append("photo", e.target.files[0]);
    await dispatch(uploadPhoto(data));
    // axios
    //   .patch("/api/v1/uploadphoto", data)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error.response));
  };
  return (
    <Grid container pt={15} justifyContent="center">
      <Grid item md={6} xs={12} mb={10}>
        <Card>
          <CardHeader title="User Profile" />
          <CardContent>
            <Grid container alignItems="center" flexDirection="column">
              <Grid item>
                <Avatar
                  alt="p"
                  src={userDetail.photo.secure_url}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item mt={2}>
                <label htmlFor="profile-pic">
                  <Input
                    accept="image/*"
                    id="profile-pic"
                    type="file"
                    name="photo"
                    onChange={handlePicUpload}
                  />
                  <Button component="span">Change Photo</Button>
                </label>
              </Grid>

              <ProfileForm />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // <Grid container pt={15} justifyContent="center">
    //   <Grid item md={6} sm={12} xs={12}>
    //     <Card>
    //       <CardHeader title="User Profile" />
    //       <CardContent>
    //         <Avatar
    //           alt="P"
    //           src={userDetail.photo.secure_url}
    //           sx={{ width: 150, height: 150 }}
    //         />
    //         <Typography variant="subtitle2">Name</Typography>
    //         <Typography>{userDetail.name}</Typography>
    //         <TextField />
    //       </CardContent>
    //     </Card>
    //   </Grid>
    // </Grid>
  );
}

export default Profile;
