import React, { useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Navbar, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import TodoList from './TodoList';
import {todoDataService} from "../Services/crudFirebase"
import userDataService from "../Services/crudFirebase"

export default function AddTodo({id , getTodoId}){
    const [todo, setTodo] = useState("");
    const [todoid, setTodoid] = useState();
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [taskname, setTaskname] = useState("");
    const [TodoId, setTodoId] = useState("");
    const { currentUser } = useAuth()
    const userid = currentUser.uid;
    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");

        const newTodo = {
          todoid,
          taskname,
          status,
          userid
        };
        console.log(newTodo);
        try {
            if (id !== undefined && id !== "") {
              await todoDataService.updateTodo(id, newTodo);
              setTodoid("");
              setMessage({ error: false, msg: "Updated successfully!" });
            } else {
              await todoDataService.addTodos(newTodo);
              setMessage({ error: false, msg: "New Todo added successfully!" });
            }
          } catch (err) {
            setMessage({ error: true, msg: err.message });
          }
      
        setTodoid("");
        setTodo("");
    }
    const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await todoDataService.getTodo(id);
          console.log("the record is :", docSnap.data());
        //   setTodoid(docSnap.data().todoid);
          setTodo(docSnap.data().taskname);
          setStatus(docSnap.data().status);
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };
      useEffect(() => {
        if (id !== undefined && id !== "") {
            editHandler();
            console.log("Your id is "+id)
        }
      }, [id])
      const getTodoIdHandler =(id) => {
        console.log("Todo Id is: ", id)
        setTodoId(id);
      }
    return (
        <>
        <div className='p-4 box'>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        </div>
        <Navbar bg="dark" variant="dark" className="header">
            <Container>
            <Navbar.Brand href="#home">Todo - Firebase CRUD</Navbar.Brand>
            </Container>
        </Navbar>
            <Card>
                <Card.Body>
                    <h1>
                        TODO LIST
                    </h1>
                    <Form onSubmit={handleSubmit} >
                      <Form.Group className="mb-3" controlId="todo-id">
                        <InputGroup>
                          <InputGroup.Text id="todo-id">#</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Todo ID"
                              value={todoid}
                              onChange={(e) => setTodoid(e.target.value)}
                              required
                            />
                          </InputGroup>
                      </Form.Group>

                        <Form.Group className="mb-3" controlId="formBookTitle">
                            <InputGroup>
                                <InputGroup.Text id="formBookTitle">T</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Task Name"
                                    value={taskname}
                                    onChange={(e) => setTaskname(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <ButtonGroup aria-label="Basic example" className="mb-3" style={{ width: "100%" }}>
                            <Button
                                disabled={flag}
                                variant="success"
                                onClick={(e) => {
                                    setStatus("Completed");
                                    setFlag(true);
                                }}
                            >
                                Completed
                            </Button>
                            <Button
                                variant="danger"
                                disabled={!flag}
                                onClick={(e) => {
                                    setStatus("Not Completed");
                                    setFlag(false);
                                }}
                            >
                                Not Completed
                            </Button>
                        </ButtonGroup>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="Submit">
                                Add/ Update
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}