import axios from "axios";
import { apiUrls } from "../utils/apiUrls";

// export function createOrder(offerId, data) {
//   const url = apiUrls.offerDetail(offerId);
//   axios.post(url, data).then(response=>);
// }

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
