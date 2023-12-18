import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { API } from "../General";

function URLData() {
  const [data, setData] = useState([]);
  const [arr, setArr] = useState(data);
  let count = Math.ceil(data.length/10);
  useEffect(() => {
    fetch(`${API}/url/getURLData`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  const [page, setPage] = useState(0);
  const handleChange = (event, value) => {
    let startIndex = (value - 1) * 10;
    let endIndex = startIndex + 9;
    console.log(startIndex, endIndex);
    setArr(data.slice(startIndex,endIndex));
  };
  return (
    <div className="container pt-3">
      <TableContainer className="container table table-striped">
        <Table size="large" color="inherit" sx={{maxWidth:450}}>
          <TableHead>
            <TableRow>
              {[
                "Sl.no.",
                "Full URL Address",
                "Shortened URL",
                "created On",
                "Views",
              ].map((element, index) => {
                return (
                  <TableCell align="center" key={index}>
                    {element}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {arr.map((element, index) => {
            return (
              <TableBody key={element._id}>
                <TableRow key={index}>
                  <TableCell align="center">{element._id}</TableCell>
                  <TableCell align="left">{element.fullUrl}</TableCell>
                  <TableCell align="center">{element.shortURL}</TableCell>
                  <TableCell align="center">{element.createdDate}</TableCell>
                  <TableCell align="center">{element.click}</TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="success"
        />
      </TableContainer>
    </div>
  );
}

export default URLData;
