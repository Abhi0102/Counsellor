import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  Box,
  Chip,
  MenuItem,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  addCounsellorOffer,
  deleteOffer,
  getCounsellorOffer,
  updateCounsellorOffer,
} from "../actions/offer";
import { testRoute } from "../actions/user";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getStyles(day, workingDays, theme) {
  return {
    fontWeight:
      workingDays.indexOf(day) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CounsellingForm(props) {
  const theme = useTheme();
  const { isNew, data } = useSelector((state) => state.offer.counsellor);
  const dispatch = useDispatch();
  const handleDeleteOffer = (e) => {
    dispatch(deleteOffer());
  };

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isNew) {
        dispatch(addCounsellorOffer(values));
      } else {
        let changedData = {};
        for (let i in values) {
          if (values[i] !== data[i]) {
            changedData[i] = values[i];
          }
        }
        if (Object.keys(changedData).length) {
          dispatch(updateCounsellorOffer(changedData));
        }
        // dispatch(testRoute(values));
      }
    },
  });
  return (
    <Grid item md={6} xs={12} mb={5}>
      <Card>
        <CardHeader title="Counselling Form" />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  required
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  required
                  id="license"
                  name="license"
                  label="License No."
                  value={formik.values.license}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  required
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  multiline
                  rows={10}
                />
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth required>
                  <InputLabel id="workingDaysLabel">Working Days</InputLabel>
                  <Select
                    labelId="workingDaysLabel"
                    id="workingDays"
                    name="workingDays"
                    multiple
                    value={formik.values.workingDays}
                    onChange={formik.handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-workDays"
                        label="Working Days"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {days.map((day) => (
                      <MenuItem
                        key={day}
                        value={day}
                        style={getStyles(day, formik.values.workingDays, theme)}
                      >
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <TextField
                  id="fromTime"
                  name="fromTime"
                  required
                  label="From"
                  type="time"
                  value={formik.values.fromTime}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id="toTime"
                  required
                  name="toTime"
                  label="To"
                  type="time"
                  value={formik.values.toTime}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  fullWidth
                  required
                  id="expertise"
                  name="expertise"
                  label="Expertise In"
                  value={formik.values.expertise}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  required
                  id="experience"
                  name="experience"
                  type="number"
                  label="Experience in Yrs."
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  id="price"
                  name="price"
                  label="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item>
                <Button type="submit" variant="outlined">
                  {isNew ? "Save" : "Update"}
                </Button>
              </Grid>
              {!isNew && (
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteOffer}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
          {/* </LocalizationProvider> */}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CounsellingForm;
