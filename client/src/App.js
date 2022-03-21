import Navbar from "./components/Navbar";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetail } from "./actions/user";
import { getOffers } from "./actions/offer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/styles";

const theme = createTheme();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffers());
    dispatch(getUserDetail());
  }, []);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar />
          <ToastContainer />
          <Router />
          {/* <Footer /> */}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
