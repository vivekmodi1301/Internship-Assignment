import React, { useEffect, useState } from 'react'
import { Button, NavLink, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { todoDataService } from '../Services/crudFirebase';

const TodoList = ({ getTodoId }) => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();
  const history = useNavigate();
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const data = await todoDataService.getAllTodos();
    console.log(data.docs);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await todoDataService.deleteTodo(id);
    getTodos();
  };
  function handleTodo(){
    history("/")
  }
  return (
    <>
      <div className="mb-2 d-flex">
        <Button variant="dark edit" onClick={getTodos} style={{ width: "40%", height: "50%" , margin : "2%"}}>
          Refresh List
        </Button>
        <Button variant="btn btn-link" onClick={handleTodo}>
          Dashboard
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((doc) => {
            if (doc.userid === currentUser.uid)
              return (
                <tr key={doc.id}>
                  <td>{doc.todoid}</td>
                  <td>{doc.taskname}</td>
                  <td>{doc.status}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        style={{ width: "40%", height: "50%", marginRight: "3px" }}
                        variant="secondary"
                        className="edit"
                        onClick={(e) => getTodoId(doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ width: "50%", height: "50%" }}
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </>
  )
}

export default TodoList