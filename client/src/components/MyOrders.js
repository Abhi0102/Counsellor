import {
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  Rating,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiUrls } from "../utils/apiUrls";

function OneOrder({ order }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddReview = (e, id) => {
    e.preventDefault();
    setIsSubmit(!isSubmit);
    axios.post(apiUrls.addReview(), { comment, rating, orderId: id });
  };

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography variant="h6">{order.offer.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            By- {order.offer.user.name}
          </Typography>

          <Typography textAlign="justify" mt={3}>
            {order.offer.description}
          </Typography>
          <Typography variant="h6" mt={3} textAlign="right">
            Counselling Date: {order.counsellingDate.split("T")[0]}
          </Typography>
          <Typography component="h5" variant="subtitle" textAlign="right">
            Payment Status: {order.paymentInfo.status}
          </Typography>
          <br />
          <Typography component="h5" variant="subtitle" textAlign="right">
            Session Status: {order.counsellingStatus}
          </Typography>

          {order.review ? (
            <>
              <Typography component="h5" variant="h5">
                Review
              </Typography>
              <Rating name="rating" value={order.review.rating} readOnly />
              <TextField
                fullWidth
                value={order.review.comment}
                disabled={true}
                label="Comment"
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography component="h5" variant="h5">
                Review
              </Typography>
              <Rating
                name="rating"
                value={rating}
                readOnly={isSubmit}
                onChange={(event, newRating) => setRating(newRating)}
              />
              <TextField
                fullWidth
                margin="normal"
                value={comment}
                disabled={isSubmit}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Comment..."
              />
              <Button
                disabled={rating === 0 || comment === "" || isSubmit}
                onClick={(e) => handleAddReview(e, order._id)}
              >
                Submit
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

function MyOrders(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrls.getMyOrders())
      .then((response) => setOrders(response.data.orders))
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <Grid container pt={15} px={3} direction="column" spacing={2}>
      <Typography variant="h4">My Orders</Typography>
      {orders.map((order) => (
        <OneOrder order={order} key={order._id} />
      ))}
    </Grid>
  );
}

export default MyOrders;
