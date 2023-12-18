import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forgotpassword from "./Components/Forgotpassword";
import Verification from "./Components/Verification";
import Changepassword from "./Components/Changepassword";
import "./App.css";
import URLShortener from "./Components/URLShortener";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/home/createURL"
          element={
            <ProtectedRoute>
              <URLShortener />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/changepassword" element={<Changepassword />} />
      </Routes>
    </div>
  );
  
  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? (
      <div>{children}</div>
    ) : (
      <div>
        "Unauthorized Entry
        <Navigate replace to="/" />
      </div>
    );
  }
}

export default App;
