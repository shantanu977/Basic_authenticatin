
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username : username,
      password : password
    }
    try{
      const response = await fetch("http://localhost:5000/api/login",{
        method :"POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(user),
        credentials : "include",
      }); 
      const data = await response.json();
      alert(data.message);
      setUsername("");
      setPassword("");
    }
    catch(error){
      console.log("Error : ",error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Login</h2>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>Login</button>
    </form>
  );
};

export default Login;
