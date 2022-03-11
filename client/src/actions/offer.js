import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  FILL_COUNSELLOR_OFFER,
  EMPTY_COUNSELLOR_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAILED,
} from "./actionType";

// Counsellor Specific
export function getCounsellorOffer() {
  return (dispatch) => {
    axios
      .get(apiUrls.getCounsellorOffer())
      .then((response) => {
        dispatch(fillCounsellorOffer(response.data.data));
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(
          emptyCounsellorOffer({
            title: "",
            license: "",
            description: "",
            workingDays: [],
            fromTime: "",
            toTime: "",
            expertise: "",
            experience: "",
            price: "",
          })
        );
      });
  };
}

function fillCounsellorOffer(data) {
  return {
    type: FILL_COUNSELLOR_OFFER,
    data,
  };
}

function emptyCounsellorOffer(data) {
  return {
    type: EMPTY_COUNSELLOR_OFFER,
    data,
  };
}

export function deleteOffer() {
  return (dispatch) => {
    const url = apiUrls.deleteOffer();
    axios
      .delete(url)
      .then((response) => dispatch(deleteOfferSuccess()))
      .catch((error) => console.log(error));
  };
}

function deleteOfferSuccess() {
  return {
    type: DELETE_OFFER_SUCCESS,
    data: {
      title: "",
      license: "",
      description: "",
      workingDays: [],
      fromTime: "",
      toTime: "",
      expertise: "",
      experience: "",
      price: "",
    },
  };
}

export function addCounsellorOffer(data) {
  return (dispatch) => {
    const url = apiUrls.addOffer();
    axios
      .post(url, data)
      .then((response) => {
        dispatch(fillCounsellorOffer(response.data.data));
      })
      .catch((error) => console.log(error));
  };
}

export function updateCounsellorOffer(data) {
  return (dispatch) => {
    const url = apiUrls.getUpdateOffer();
    axios
      .patch(url, data)
      .then((response) => dispatch(fillCounsellorOffer(response.data.data)))
      .catch((error) => console.log(error.response.data));
  };
}

// User Specific

export function getOffers() {
  return (dispatch) => {
    const url = apiUrls.getOffers();
    axios
      .get(url)
      .then((response) => dispatch(getOffersSuccess(response.data)))
      .catch((error) => getOffersFailed(error.response.data));
  };
}

function getOffersSuccess(response) {
  return {
    type: GET_OFFERS_SUCCESS,
    offers: response.offers,
  };
}

function getOffersFailed(response) {
  return {
    type: GET_OFFERS_FAILED,
    error: response.error,
  };
}
