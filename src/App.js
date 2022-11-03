import { Homepage } from "./pages/Homepage";
import { Signinpage } from "./pages/Signinpage.jsx";
import { Signuppage } from "./pages/Signuppage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Userpage } from "./pages/Userpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/user" element={<Userpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
