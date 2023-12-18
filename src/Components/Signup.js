import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../General";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  async function makeSignup() {
    const newUser = {
      username, password,firstname,lastname 
    }
    const signupData = await fetch(`${API}/url/signup`, {
      method:"POST",
      body:JSON.stringify(newUser),
      headers:{
        "content-type":"application/json"
      }
    });
    if(signupData.status === 401)
      console.log("error");
    else {
      const result = await signupData.json();
      console.log(result);
      alert("User Created Successfully !! ");
      navigate("/");
    }
  }
  return (
    <div>
      <div className="border border-tertiary loginform mx-auto shadow">
        <div className="fs-1">Login</div>
        <div className="row mx-auto align-items-center gap-3">
          <div className="row mx-auto align-items-center">
            <div className="col-4">
              <label className="form-label">Username</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                className="form-control me-2"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
          <div className="row mx-auto align-items-center">
            <div className="col-4">
              <label className="form-label">Password</label>
            </div>
            <div className="col-8">
              <input
                type="password"
                autoComplete="current-password"
                className="form-control me-2"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="row mx-auto align-items-center">
            <div className="col-4">
              <label className="form-label">Firstname</label>
            </div>
            <div className="col-8">
              <input type="email" className="form-control me-2" onChange={(event)=>setFirstname(event.target.value)}/>
            </div>
          </div>
          <div className="row mx-auto align-items-center">
            <div className="col-4">
              <label className="form-label">Lastname</label>
            </div>
            <div className="col-8">
              <input type="email" className="form-control me-2" onChange={(event)=>setLastname(event.target.value)}/>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline-primary"
              onClick={() => makeSignup()}
            >
              Register
            </button>
          </div>

          <div>
            <Link to="/">
              <button className="btn btn-outline-success">Go Back</button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
