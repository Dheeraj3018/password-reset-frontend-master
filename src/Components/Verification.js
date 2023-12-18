import React, { useEffect, useState } from "react";
import { API } from "../General";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Verification() {
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  let token = id;
  const navigate = useNavigate();
  const sendLink = ()=>{
    fetch(`${API}/url/verification/${token}`).then((response)=>response.json())
    .then((result)=>{
      setFlag(true);
      if(result.message !== "Token matched Successfully"){
        alert("Invalid Credentials.!!!");
        navigate("/forgotpassword");
      }
      else
        navigate("/changepassword");
    });
  }
  useEffect(()=>sendLink(),[flag]);
  return <div>{flag === false ? <CircularProgress /> : ""}</div>;
}

export default Verification;
