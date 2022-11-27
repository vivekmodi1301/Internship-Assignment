import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Card , Form , Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { NavLink , useNavigate} from 'react-router-dom';
import userDataService from "../Services/crudFirebase"
import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getDatabase, ref, child, push, update } from "firebase/database";
import '../styles.css'
import {upload } from "../firebase"

export default function UpdateProfile({ id, setUserId }) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const contactRef = useRef();
    const {currentUser , updatePassword , updateEmail} = useAuth();
    const [error ,setError] = useState();
    const [loading , setLoading] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const history = useNavigate();
    const database = getDatabase();
    const [users, setUsers] = useState([]);
    const [photo , setPhoto] = useState(null) // photo binary itself 
    // const [loading , setLoading] = useState(false)
    // const history = useNavigate();
    const [photoURL , setPhotoURL] = useState("https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg");
    const [reducerValue] = useReducer(x => x + 1, 0);
    async function submitHandler(e) {
        e.preventDefault()
    
        const newUser = {
            name,
            email,
            contact
        };
    
        setLoading(true);
    
        await userDataService.updateUser(id, newUser);
        setUserId("")
        setLoading(false);
        alert("Updated the profile!");
        history('/')
      }
    
      const editHandler = async () => {
        setError("");
        try {
          const docSnap = await userDataService.getUser(id);
          console.log("the record is :", docSnap.data());
          setName(docSnap.data().name);
          setEmail(docSnap.data().email);
          setContact(docSnap.data().contact);
        } catch (err) {
          setError(err.message);
        }
      };
    
      useEffect(() => {
        if (id !== undefined && id !== "") {
            editHandler();
        }
      }, [id , reducerValue])

    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
            }
    }

    function handleClick(){
            upload(photo,currentUser,setLoading)
            history("/update-profile")
    }
    useEffect(()=>{
        const newUser = {
            name,
            email,
            contact
        };
        if(currentUser?.photoURL){
            console.log(currentUser.photoURL);
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])

    return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={submitHandler()}>
                    <img src={photoURL} alt="Avatar" className="avatar12" />
                    <Form.Group id="profile">
                        {/* <Form.Label>Profile</Form.Label>
                        <div className='indent'>
                            <input type="file" onChange={handleChange}/>
                            <Button disabled={loading || !photo} onClick={handleClick} className="mt-3" style={{
                                width:"200px"
                            }}>Upload</Button><br/>
                        </div> */}
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} required ref={nameRef} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className={"noHover"} type="email" required ref={emailRef} defaultValue={currentUser.email} placeholder={currentUser.email} disabled/>
                    </Form.Group>
 
                    <Form.Group id="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="contact" ref={contactRef} value={contact} onChange={(e) => setContact(e.target.value)}/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-3' type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <NavLink to="/">Cancel</NavLink>
        </div>
        <div className="w-100 text-center mt-2">
            <NavLink to="/profile">Update Profile Pic </NavLink>
        </div>
    </>
  )
}
