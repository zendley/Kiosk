import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CSVLink } from "react-csv";

var Url = axiosURL.SaleKiosk;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Kiosk() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  const [startDate, setStartDate] = useState();
  const [checkDate, setCheckDate] = useState();

  useEffect(() => {
    getData();
  }, [rerender]);

  const getData = async (e) => {
    setLoaderMain(true);

    try {
      const response = await axios.post(
        Url,
        {
          date: startDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      var res = response.data;

      setTable(res.data);

      setStartDate(Date.parse(res.date));
      setCheckDate(Date.parse(res.date));

      setLoaderMain(false);

      // console.log(response);
    } catch (err) {
      // if(!err.response){
      //   setErrMsg('No server response');
      // }
      // else if(err.response.status === 400){
      //   setErrMsg('Missing Username or Password');
      // }
      // else if(err.response.status === 401){
      //   setErrMsg('Unauthorized');
      // }
      // else {
      //   setErrMsg('Login Failed');
      // }
      // console.log(err);
    }
  };

  const headers = [
    { label: "KIOSK", key: "kiosk" },
    { label: "TOTAL SALE", key: "total_sold" },
    { label: "DONUT SOLD", key: "total_price" },
  ];

  const data = table;

  const csvReport = {
    data: data,
    headers: headers,
    filename: "SaleChannel_Kiosk.csv",
  };

  if (loadermain === true) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "39vh",
            left: "53vw",
          }}
        >
          <img src={loader} alt="" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="kiosk">
          <div style={{ marginRight: "20px" }} className="top">
            <h4 style={{ color: "#463B3B" }}>Sale Channel</h4>
            <div className="buttons">
              <div style={{ alignItems: "center" }} className="d-flex">
                <DatePicker
                  className="form-control "
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                {checkDate === startDate ? (
                  <button
                    style={{
                      background: "linear-gradient(180deg, #01a0c6, #015063)",
                      width: "150px",
                    }}
                    className="mx-3 pBut"
                    disabled
                    onClick={() => {
                      setRerender(!rerender);
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    style={{
                      background: "linear-gradient(180deg, #01a0c6, #015063)",
                      width: "150px",
                    }}
                    className="mx-3 pBut"
                    onClick={() => {
                      setRerender(!rerender);
                    }}
                  >
                    Confirm
                  </button>
                )}
                <CSVLink
                  style={{
                    padding: "6.5px 35px",
                    width: "150px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  {...csvReport}
                  className="b1"
                >
                  Download
                </CSVLink>
              </div>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                <th>Kiosk </th>
                <th>Total Sale(PKR)</th>
                <th>Donut Sold</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={index}>
                    <td>{tabl.kiosk}</td>
                    <td>{tabl.total_sold}</td>
                    <td>{tabl.total_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
