import React, { useState } from "react";
import { API } from "../General";
import { useNavigate } from "react-router-dom";

function Changepassword() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [NewPassword, setPassword] = useState("");
  async function changePassword() {
    if (username == null || NewPassword == null)
      alert("Enter Valid Credentials !!!!!");
    else {
      const newCredentials = {
        username,
        NewPassword,
      };
      const getData = await fetch(`${API}/password/changepassword`, {
        method: "POST",
        body: JSON.stringify(newCredentials),
        headers: {
          "content-type": "application/json",
        },
      });
      if (getData.status === 401) console.log("error");
      else {
        const result = await getData.json();
        console.log(result); 
        navigate("/");
      }
    }
  }
  return (
    <div>
      <div className="border border-tertiary loginform mx-auto shadow">
        <span className="fs-1">Change Password</span>
        <br />
        <br />
        <div className="mx-auto row align-items-center pt-3 pb-3">
          <div className="col-4">
            <label className="form-label">Username</label>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className="mx-auto row align-items-center pb-3">
          <div className="col-4">
            <label className="form-label">Password</label>
          </div>
          <div className="col-7">
            <input
              type="password"
              className="form-control me-2"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => changePassword()}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Changepassword;
