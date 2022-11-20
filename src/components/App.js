// import logo from './logo.svg';
// import './App.css';
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "./ForgetPassword";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";
import Profile from "./Profile";

function App() {
  const[userId, setUserId] = useState();
  const getUserIdHandler =(id) => {
    console.log("User Id is: ", id)
    setUserId(id);
  }
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div className="w-100" style={{maxWidth : "400px"}}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={ <PrivateRoute> <Dashboard getUserId={getUserIdHandler}/></PrivateRoute>}></Route>
                <Route path="/update-profile" element={ <PrivateRoute> <UpdateProfile id={userId} setUserId={setUserId} /></PrivateRoute>}></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/profile" element={<Profile/>} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
  );
}

export default App;
