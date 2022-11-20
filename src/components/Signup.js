import React, { useRef, useState } from 'react'
import { Card , Form , Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { NavLink , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import '../styles.css';
import {setDoc , doc , serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';
import { collection , addDoc } from 'firebase/firestore';
// const eye = <FontAwesomeIcon icon="fa-regular fa-eye" />;
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const contactRef = useRef();
    const {signup} = useAuth();
    const [error ,setError] = useState();
    const [loading , setLoading] = useState(false);
    const history = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData , setFormData ] = useState({
        name : '' ,
        email : '' ,
        contact : ''
    })
    const handleChange = (event)=>{
        event.preventDefault();
        const{name , value} = event.target;
        setFormData((prev) =>{
            return {...prev, [name]:value};
        })
    }
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
      };
    async function handleSubmit(e){
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        setFormData({
            name : nameRef.current.value ,
            email : emailRef.current.value ,
            contact : contactRef.current.value
        })
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value , passwordRef.current.value)
            await addDoc(collection(db, "Users-Info"),{
                name : formData.name,
                email : formData.email,
                contact : formData.contact,
            }).then(function(res){
                alert("Data is succesfully added")
            }).catch(function(err){
                alert("Data can't be added")
            })
            history("/profile")
        }catch{
            setError("Failed to create an account or the user already exists ")
        }
        setLoading(false)
    }
    return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Register Here</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' required ref={nameRef} value={formData.name} onChange={handleChange} autoComplete="off"/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' required ref={emailRef} value={formData.email} onChange={handleChange} autoComplete="off"/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef} autoComplete="off" />
                    </Form.Group>
                
                    <Form.Group id="password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} required ref={passwordConfirmRef} autoComplete="off" />
                        <i onClick={togglePassword}>{eye}</i>
                    </Form.Group>

                    <Form.Group id="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" name='contact' required ref={contactRef} value={formData.contact} onChange={handleChange}/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-3' type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <NavLink to="/login">Log In</NavLink>
        </div>
    </>
  )
}
