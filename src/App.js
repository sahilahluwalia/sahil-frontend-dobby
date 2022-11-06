import { Homepage } from "./pages/Homepage";
import { Signinpage } from "./pages/Signinpage.jsx";
import { Signuppage } from "./pages/Signuppage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Userpage } from "./pages/Userpage";
import { Indexpage } from "./pages/Indexpage";
import { Explorepage } from "./pages/Explorepage";
import { Famouspage } from "./pages/Famouspage";
import { Uploadpage } from "./pages/Uploadpage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Indexpage />} />
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/upload" element={<Uploadpage />} />
          <Route path="/famous" element={<Famouspage />} />
          <Route path="/explore" element={<Explorepage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/user" element={<Userpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
