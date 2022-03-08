import Navbar from "./component/Navbar";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
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
