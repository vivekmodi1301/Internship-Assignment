import React, { useCallback, useEffect, useState } from 'react'
import { Card , Form , Button, Alert } from 'react-bootstrap'
import '../styles.css'
import { useAuth } from '../contexts/AuthContext'
import {upload } from "../firebase"
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const {currentUser} = useAuth();
    const [photo , setPhoto] = useState(null) // photo binary itself 
    const [loading , setLoading] = useState(false)
    const history = useNavigate();
    const [photoURL , setPhotoURL] = useState("https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    function handleClick(){
        upload(photo,currentUser,setLoading)
        history("/profile")
    }
    function handleSkip(){
        history("/")
    }
    useEffect(()=>{
        if(currentUser?.photoURL){
            console.log(currentUser.photoURL);
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])
  return (
    <>
        <input type="file" onChange={handleChange}/>
        <Button disabled={loading || !photo} className="mt-3" onClick={()=>{
            handleClick();
            forceUpdate();
        }}>Upload</Button><br/>
        <Button className="mt-3" onClick={handleSkip}>Go To Dashboard</Button><br/>
        <img src={photoURL} alt="Avatar" className="avatar12"/>
    </>
  )
}
export default Profile