import React, { useEffect, useState } from 'react'
import { Button, Card , Alert } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"
import userDataService from "../Services/crudFirebase"
import '../styles.css'

export default function Dashboard({getUserId}) {
  const[error , setError] = useState("");
  const {currentUser , logout} = useAuth();
  const [photoURL, setphotoURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
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
  function handleTodo(){
    history("/todo")
  }
  useEffect(() => {
    if(currentUser?.photoURL) {
      setphotoURL(currentUser.photoURL);
    }
  }, [currentUser])
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          { users.map((doc, index) => {
            if(doc.email === currentUser.email) {
              return (
                <>
                <img src={photoURL} width="200px" height="200px" style={{borderRadius : "50%" , border: '4px solid gray' ,marginLeft:"80px"  }} alt="Profile" className="avatar" /><br/>
                <strong>Name:</strong> {doc.name} <br />
                <strong>Email:</strong> {doc.email} <br />
                <strong>Contact:</strong> {doc.contact} <br />
                <strong>ID:</strong> {doc.id} <br />
                <NavLink to="/update-profile" className="btn btn-primary w-100 mt-3" onClick={(e) => getUserId(doc.id)}>Update Profile</NavLink>
                <NavLink to="/todo" className="btn btn-primary w-100 mt-3" onClick={(e) => getUserId(doc.id)}>Your TODO</NavLink>
                </>
              )
            }
            }) }
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
        <Button style={{marginTop : "-20px"}} variant="link" onClick={handleTodo}>TODO</Button>
        {/* <NavLink to="/update-profile" onClick={(e) => getUserId(doc.id)}>Update Profile</NavLink> */}
      </div>
    </>
  )
}