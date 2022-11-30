import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {todoDataService} from "../Services/crudFirebase";

export default function TodoTable() {
  const [todos, setTodos] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getTodos()
  }, []);
  const getTodos = async () => {
    const data = await todoDataService.getAllTodos();
    console.log(data.docs);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  function todoLister() {
    navigate("/admin-panel");
  }
  async function handleLogout() {
    try {
      await logout();
      navigate("/admin-login");
    } catch {}
  }
  return (
    <>
      <h1>Todo Table</h1>
      <Table striped bordered hover size="sm">
        <caption>List of Todos</caption>
        <thead>
          <tr>
            <th>STATUS</th>
            <th>TASKNAME</th>
            <th>TODOID</th>
            <th>USERID</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.map((doc) => {
            return (
              <tr key={doc.id}>
                <td>{doc.status}</td>
                <td>{doc.taskname}</td>
                <td>{doc.todoid}</td>
                <td>{doc.userid}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="mb-2 d-flex">
        <Button variant="primary edit" onClick={todoLister}>
          Admin Panel
        </Button>
        <Button variant="dark edit" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
