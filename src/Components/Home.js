import React, { useState, useEffect } from "react";
import { API } from "../General";
import { useNavigate } from "react-router-dom";
import URLShortener from "./URLShortener";
import URLData from "./URLData";

function Home() {
  const navigate = useNavigate();
  const [dailyCount, setDailycount] = useState(null);
  const [monthlyCount, setMonthlycount] = useState(null);
  const getDailyData = () => {
    const date = new Date().toLocaleDateString("id-ID");
    fetch(
      `${API}/url/getAllUrlfortheDay/${date.slice(0, 2)}/${date.slice(
        3,
        4
      )}/${date.slice(5)}`
    )
      .then((response) => response.json())
      .then((result) => setDailycount(result.length));
  };
  const getMonthlyData = () => {
    const month = new Date().toLocaleDateString().slice(3, 4);
    fetch(`${API}/url/urlgraphs/daywise/${month}`)
      .then((response) => response.json())
      .then((result) => setMonthlycount(result.length));
  };
  useEffect(() => {
    getDailyData();
    getMonthlyData();
  }, []);
  return (
    <div>
      <div className="login mx-auto shadow-2">
        <div
          className="container-fluid bg-light"
          style={{ width: "100vw", height: "6rem" }}
        >
          <div className="d-flex flex-row pt-3 pb-3">
            <span className="mx-auto fs-3"> URL Shortener app </span>
            <span>
              <button
                className="btn btn-outline-none"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  alert("You have successfully Logged Out !!! 😉");
                }}
              >
                LOGOUT
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard container pt-3">
        <div className="card bg-light border-0 border-dark fs-4 p-3">
          Today's Count : <span className="fs-1">{dailyCount}</span>
        </div>
        <div className="card bg-light border-0 border-dark fs-4 p-3">
          This Month's Count : <span className="fs-1">{monthlyCount}</span>
        </div>
      </div>
      <div>
        <URLShortener />
      </div>
      <hr />
      <div>
        <URLData />
      </div>
    </div>
  );
}

export default Home;
