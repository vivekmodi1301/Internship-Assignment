import React, { useRef, useState } from 'react'
import { Card , Form , Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { NavLink , useNavigate} from 'react-router-dom';

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
    async function handleSubmit(e){
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value , passwordRef.current.value)
            history("/")
        }catch{
            setError("Failed to create an account")
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
                        <Form.Control type="text" required ref={nameRef}/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef} autoComplete="off" />
                    </Form.Group>
                
                    <Form.Group id="password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" required ref={passwordConfirmRef} autoComplete="off"/>
                    </Form.Group>

                    <Form.Group id="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" required ref={contactRef}/>
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
