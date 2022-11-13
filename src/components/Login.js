import React, { useRef, useState } from 'react'
import { Card , Form , Button, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { NavLink , useNavigate} from 'react-router-dom';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error ,setError] = useState();
    const [loading , setLoading] = useState(false);
    const history = useNavigate();
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value , passwordRef.current.value)
            history("/")
        }catch{
            setError("Failed to Log In")
        }
        setLoading(false)
    }
    return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef} autoComplete="off" />
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-3' type="submit">Login</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
    </>
  )
}