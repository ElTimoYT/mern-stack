import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    axios.post("http://localhost:3001/createUser", {
      name,
      age,
      email,
      username,
      password
    }).then((response) => {
      Swal.fire({
        title: "User Created Successfully !",
        icon: "success",
        draggable: true
      });
      setListOfUsers([...listOfUsers, response.data]);
    });
  };

  return (
    <div className="app-container">
      
      <h1 className="title">User Dashboard</h1>

      <div className="form-card">
        <h2>Create New User</h2>

        {/* Input fields for user details */}
        <input className="input" type="text" placeholder="Name"
          onChange={(e) => setName(e.target.value)} />

        <input className="input" type="number" placeholder="Age"
          onChange={(e) => setAge(e.target.value)} />

        <input className="input" type="text" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="input" type="text" placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn" onClick={createUser}>Create User</button>
      </div>

      <div className="users-list">
        {listOfUsers.map((user) => (
          <div className="user-card" key={user._id || user.id || user.username}>
            <h3>{user.name}</h3>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
