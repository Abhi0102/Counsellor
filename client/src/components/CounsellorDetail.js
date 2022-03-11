import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Typography,
  Stack,
  Rating,
  Avatar,
  Button,
} from "@mui/material";
import { height } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrls } from "../utils/apiUrls";

function CounsellorDetail(props) {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [offer, setOffer] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(apiUrls.getOneOffer(params.id))
      .then((response) => {
        setOffer(response.data.offer);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Grid container my={10}>
      <Grid item md={12} mx={6}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="text.secondary">
            {error}
          </Typography>
        ) : (
          <Card elevation={4}>
            <CardHeader title={offer.title} />
            <CardContent>
              <Stack>
                <Avatar
                  alt="P"
                  src={offer.user.photo.secure_url}
                  sx={{ height: 200, width: 200, alignSelf: "center" }}
                />
                <Typography variant="h6" textAlign="center" mt={2}>
                  {offer.user.name}
                </Typography>
                <Rating
                  readOnly
                  value={offer.ratings}
                  sx={{ alignSelf: "center" }}
                />
                <Typography variant="caption" textAlign="center">
                  Rated By - {offer.noOfReviews}
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Experience - {offer.experience} Years
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Expertise In - {offer.expertise}
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Registered License - {offer.license}
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Working Timings - {offer.fromTime} - {offer.toTime}
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Working Days - {offer.workingDays.map((day) => day + ", ")}
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Contact On - {offer.user.email} | +91-{offer.user.phno}
                </Typography>
                <Typography variant="h6" my={3}>
                  About Counselling Session
                </Typography>
                <Typography variant="subtitle1" textAlign="justify">
                  {offer.description}
                </Typography>
                <Typography variant="h6" my={3}>
                  About Counsellor
                </Typography>
                <Typography variant="subtitle1" textAlign="justify">
                  {offer.user.aboutme}
                </Typography>
                <Typography
                  variant="h6"
                  my={3}
                  textAlign="center"
                  color="warning.main"
                >
                  Fees - Rs. {offer.price}
                </Typography>

                <Button variant="outlined" color="success">
                  Book Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export default CounsellorDetail;
