import { Grid, Card, CardHeader } from "@mui/material";
import React from "react";

function CounsellorDetail(props) {
  return (
    <Grid container my={10}>
      <Grid item md={12} mx={6}>
        <Card>
          <CardHeader title="Name" />
        </Card>
      </Grid>
    </Grid>
  );
}

export default CounsellorDetail;
