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
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import AdminRoute from "./AdminRoute";
import TodoTable from "./TodoTable";

function App() {
  const[userId, setUserId] = useState();
  const[todoId , setTodoId] = useState();
  const getUserIdHandler =(id) => {
    console.log("User Id is: ", id)
    setUserId(id);
  }
  const getTodoIdHandler =(id) => {
    console.log("The ID of document to be edited: ", id);
    setTodoId(id);
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
                <Route path="/todo" element={<PrivateRoute><AddTodo id={todoId} setTodoId={setTodoId} /><TodoList getTodoId={getTodoIdHandler}/></PrivateRoute>} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-panel" element={<AdminRoute><AdminPanel /></AdminRoute> } />
                <Route path="/todo-table" element={<AdminRoute><TodoTable /></AdminRoute> } />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
  );
}

export default App;
