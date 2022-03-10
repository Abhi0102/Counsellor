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
import { useState } from "react";
import CounsellingForm from "./CounsellingForm";

const Input = styled("input")({
  display: "none",
});

function Profile(props) {
  const { userDetail } = useSelector((state) => state.user);
  const [isOfferingCounselling, setIsOfferingCounselling] = useState(false);
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
    <Grid container pt={15} alignContent="center" flexDirection="column">
      <Grid item md={6} xs={12} mb={5}>
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
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOfferingCounselling(!isOfferingCounselling);
                }}
              >
                Offer Counselling
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {isOfferingCounselling && <CounsellingForm />}
    </Grid>
  );
}

export default Profile;
