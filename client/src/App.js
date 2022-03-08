import Navbar from "./components/Navbar";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetail } from "./actions/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
