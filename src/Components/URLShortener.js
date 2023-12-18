import React, { useState, useEffect } from "react";
import { API } from "../General";
import { frontEndURL } from "../General";

function URLShortener() {
  const [fullUrl, setFullUrl] = useState(null);
  const [shortURL, setShortUrl] = useState("");
  const getShortURL = () => {
    if (fullUrl != null && fullUrl != "") {
      const data = { fullUrl: fullUrl };
      console.log(data);
      fetch(`${API}/url/shorturl`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setShortUrl(result.short);
        });
    }
  };
  const redirectToFullPage = () => {
    if (shortURL != "" && shortURL != null) {
      fetch(`${API}/url/urldetails/${shortURL}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.fullURL);
          window.open(result.fullURL, "_blank");
        });
    }
  };
  useEffect(() => {
    getShortURL();
    redirectToFullPage();
  }, [fullUrl]);
  return (
    <div className="container pt-3">
      <form>
        <div className="d-flex flex-row justify-content-center align-items-center gap-0">
          <label className="col-3">Enter Your Long URL</label>
          <div className="col-6">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => {
                setFullUrl(event.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <div>
        {!shortURL ? (
          ""
        ) : (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <label className="col-3">Result</label>
            <div className="col-6">
              <input
                className="form-control me-2"
                type="text"
                defaultValue={fullUrl != "" ? `${frontEndURL}/${shortURL}` : ""}
                placeholder={fullUrl != "" ? `${frontEndURL}/${shortURL}` : ""}
              />
              {/* <a href={`${API}/url/urldetails/${shortURL}`} target="_blank">Click Link !!</a> */}
              <button
                className="btn btn-outline-primary"
                onClick={() => redirectToFullPage()}
              >
                Click Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default URLShortener;
