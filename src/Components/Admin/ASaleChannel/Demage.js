import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CSVLink } from "react-csv";

import { Modal, Button, Form } from "react-bootstrap";

var Url = axiosURL.Demage;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Demage() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [checkDate, setCheckDate] = useState();

  const [detail, setDetail] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [kioskname, setKioskName] = useState();

  // useEffect(() => {
  //     setStartDate(new Date())

  //   })

  useEffect(() => {
    // setStartDate(new Date())
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
      setTable(res);

      // setStartDate(Date.parse(res.date));
      // setCheckDate(Date.parse(res.date));

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
    { label: "DAMAGED DONUT", key: "total_demage" },
    { label: "REPORT TIME", key: "time" },
  ];

  const data = table;
  console.log(table);

  const csvReport = {
    data: data,
    headers: headers,
    filename: "damage_donuts.csv",
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
                <th>damaged donuts</th>
                <th>report time</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={index}>
                    <td>{tabl.kiosk}</td>
                    <td>{tabl.total_demage}</td>
                    <td>{tabl.time}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#FFF",
                          border: "1px solid black",
                          padding: "2px 3px",
                        }}
                        onClick={() => {
                          setIsDetail(true);
                          setDetail(JSON.parse(tabl.data));
                          setKioskName(tabl.kiosk);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal
            show={isDetail}
            onHide={() => {
              setIsDetail(false);
            }}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header> */}
            <Modal.Body>
              <div
                className="d-flex justify-content-center m-2"
                style={{ fontWeight: "bold" }}
              >
                {kioskname}
              </div>
              {/* {detail.map((tabl, index)=>{
            return(
            <div>test</div>
            );
            })} */}
              {Object.keys(detail).map(function (key) {
                return detail[key] == 0 ? (
                  ""
                ) : (
                  <div className="d-flex justify-content-between border p-1 m-2">
                    <span>{key}</span>
                    <span>{detail[key]}</span>
                  </div>
                );
              })}
            </Modal.Body>
            {/* <Modal.Footer>
        <Button variant="secondary" onClick={()=>{setBatchOpen(false)}}>Close</Button>
        <Button style={{backgroundColor: '#FF8AA5', border:'none'}}  >Update</Button>
      </Modal.Footer> */}
          </Modal>
        </div>
      </>
    );
  }
}
