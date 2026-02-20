import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';


const API = "http://localhost:8080/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async (task) => {
    await axios.post(API, task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}?status=${status}`);
    fetchTasks();
  };

  const handleSearch = async () => {
    const res = await axios.get(`${API}/search?title=${search}`);
    setTasks(res.data);
  };

  const handleFilter = async (status) => {
    if (status === "") {
      fetchTasks();
    } else {
      const res = await axios.get(`${API}/filter?status=${status}`);
      setTasks(res.data);
    }
  };
  const handleLogin = (creds) => {
    setUser(creds);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-4">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Task Manager</h2>
        <div>
          <span className="me-3">{user?.email}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <TaskForm addTask={addTask} />

      <div className="row my-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;