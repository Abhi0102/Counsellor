import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: (10, 15, 15),
    textAlign: "right",
  },
  link: {
    color: theme.palette.common.white,
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography variant="h6">Developed by</Typography>
      <Typography
        variant="caption"
        component="a"
        href="https://google.com"
        target="_blank"
        className={classes.link}
      >
        Abhishek Sharma
      </Typography>
    </Box>
  );
}

export default Footer;
