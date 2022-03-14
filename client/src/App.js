import Navbar from "./components/Navbar";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetail } from "./actions/user";
import { getOffers } from "./actions/offer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffers());
    dispatch(getUserDetail());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        {/* Same as */}
        <ToastContainer />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
