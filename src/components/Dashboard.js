import React, { useEffect, useState } from 'react'
import { Button, Card , Alert } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"
import userDataService from "../Services/crudFirebase"

export default function Dashboard({getUserId}) {
  const[error , setError] = useState("");
  const {currentUser , logout} = useAuth();
  const history = useNavigate();
  async function handleLogout(){
    setError("")
    try{
      await logout()
      history("/login")
    }catch{
      setError("Failed to log out");
    }
  }
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userDataService.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          { users.map((doc, index) => {
            if(doc.email === currentUser.email) {
              return (
                <>
                <strong>Name:</strong> {doc.name} <br />
                <strong>Email:</strong> {doc.email} <br />
                <strong>Contact:</strong> {doc.contact} <br />
                <strong>ID:</strong> {doc.id} <br />
                <NavLink to="/update-profile" className="btn btn-primary w-100 mt-3" onClick={(e) => getUserId(doc.id)}>Update Profile</NavLink>
                </>
              )
            }
            }) }
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}