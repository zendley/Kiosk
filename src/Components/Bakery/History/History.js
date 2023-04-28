import React, { useState, useEffect, useRef } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

import DatePicker from "react-datepicker";

// import { DownloadTableExcel } from 'react-export-table-to-excel';

import "react-datepicker/dist/react-datepicker.css";

import nodatafound from "../../../Assets/Dashboard_SVGs/NoContentFound.svg";
import { CSVLink } from "react-csv";

var HistoryUrl = axiosURL.History;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function History() {
  const [table, setTable] = useState([]);
  const [header, setHeader] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [startDate, setStartDate] = useState();
  const [checkDate, setCheckDate] = useState();
  const [FileDate, setFileDate] = useState();
  const [loadermain, setLoaderMain] = useState(true);
  const [isdata, setIsData] = useState();

  const tableRef = useRef(null);

  useEffect(() => {
    getData();
  }, [rerender]);

  useEffect(() => {
    //
  }, [startDate]);

  const getData = () => {
    setLoaderMain(true);

    const url = HistoryUrl;
    axios
      .post(
        url,
        {
          date: startDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          alert("Error", response.status);
        } else {
          console.log("===================");
          console.log(response.data);
          setHeader(response.data.header);
          setTable(response.data.data);

          setStartDate(Date.parse(response.data.date));
          setCheckDate(Date.parse(response.data.date));
          setFileDate(response.data.date);

          setIsData(response.data.isData);

          setLoaderMain(false);
          // console.log(response.data)
        }
      });
  };
  {
    console.log(table);
    console.log(header);
  }

  const csvReport = {
    data: table,
    headers: header,
    filename: "History.csv",
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
  } else if (isdata === 0) {
    return (
      <>
        <div style={{ marginTop: "10px" }} className="kiosk">
          <div style={{ textAlignLast: "center" }} className="top">
            <h4 style={{ color: "#463B3B" }}>History</h4>

            <div style={{ alignItems: "center" }} className="d-flex">
              <DatePicker
                className="form-control "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              {checkDate === startDate ? (
                <button
                  className=" pButMr0"
                  disabled
                  onClick={() => {
                    setRerender(!rerender);
                  }}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className=" pButMr0"
                  onClick={() => {
                    setRerender(!rerender);
                  }}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "35vh",
            left: "45vw",
          }}
        >
          <img src={nodatafound} alt="" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            marginTop: "10px",
            overflowX: "scroll",
            overflowY: "hidden",
            marginBottom: "15px",
          }}
          className="kiosk"
        >
          <div style={{ textAlignLast: "center" }} className="top">
            <h4 style={{ color: "#463B3B" }}>History</h4>
            <div className="buttons">
              <div style={{ alignItems: "center" }} className="d-flex">
                <DatePicker
                  className="form-control "
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  maxDate={new Date(startDate)}
                />

                {checkDate === startDate ? (
                  <button
                    className=" pButMr0"
                    disabled
                    onClick={() => {
                      setRerender(!rerender);
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className=" pButMr0"
                    onClick={() => {
                      setRerender(!rerender);
                    }}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>

          <table ref={tableRef} className="tablee">
            <thead>
              <tr>
                {/* <th style={{padding: '10px', maxWidth: 'fitContent', textAlign: 'center', fontSize: '8px',}}>Location</th>
                      <th style={{padding: '10px', maxWidth: 'fitContent', textAlign: 'center', fontSize: '8px',}}>Quantity</th> */}
                {header.map((tabl, index) => {
                  return (
                    <th
                      style={{
                        padding: "10px",
                        maxWidth: "fitContent",
                        textAlign: "center",
                        fontSize: "8px",
                      }}
                      key={index}
                    >
                      {tabl}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    {/* <td style={{textAlign: 'center',}}>{tabl.location}</td>
                        <td style={{textAlign: 'center',}}>{tabl.quantity}</td> */}

                    {header.map((tabl2, index) => {
                      return (
                        <td style={{ textAlign: "center" }} key={index}>
                          {tabl[tabl2]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: "12px" }}>
            {/* <DownloadTableExcel
                    filename={FileDate}
                    sheet="Production"
                    currentTableRef={tableRef.current}
                >

                   <button style={{ width:'120px'}} className="pBut"> Download </button>

                </DownloadTableExcel> */}
            <CSVLink
              style={{ padding: "6.5px 35px" }}
              {...csvReport}
              className="b1"
            >
              Download
            </CSVLink>
          </div>
        </div>
      </>
    );
  }
}
