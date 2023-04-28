import "./Attendance.css";
import React, { useEffect, useState } from "react";

import tick from "../../../Assets/Dashboard_SVGs/check.svg";
import cross from "../../../Assets/Dashboard_SVGs/cross.svg";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import clock from "../../../Assets/Dashboard_SVGs/clock.svg";
import loc from "../../../Assets/Dashboard_SVGs/location.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

var Url = axiosURL.Attendance;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Attendance() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState("");
  const [emp, setEmp] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  const [attenisopen, setAttenIsOpen] = useState(false);
  const [attendata, setAttenData] = useState([]);

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

      setTable(res);

      setEmp(response.data.employee);

      setStartDate(Date.parse(res.date));
      setCheckDate(Date.parse(res.date));

      console.log(response);
      setLoaderMain(false);
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

  const exportPdf = () => {
    html2canvas(document.querySelector(".attable")).then((canvas) => {
      //  document.body.appendChild(canvas);  // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("download.pdf");
    });
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
          <div className="top">
            <h4 style={{ color: "#463B3B" }}>Attendance</h4>
            <div className="buttons">
              <div
                style={{ alignItems: "center", alignIitems: "center" }}
                className="d-flex"
              >
                <div className="controls">
                  <button
                    style={{
                      background: "linear-gradient(180deg, #01a0c6, #015063)",
                      width: "150px",
                    }}
                    className="pBut"
                    onClick={() => {
                      exportPdf();
                    }}
                  >
                    Download CSV
                  </button>
                </div>
                <DatePicker
                  className="form-control "
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMMM-yyyy"
                  showMonthYearPicker
                />
                {checkDate === startDate ? (
                  <button
                    style={{
                      background: "linear-gradient(180deg, #01a0c6, #015063)",
                      width: "150px",
                    }}
                    className="pButMr0"
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
                      width: "150px",
                    }}
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

          <div className="tape">
            <table className="attable">
              <thead>
                <tr>
                  <th className="name-col">Employee Name</th>

                  {(() => {
                    let td = [];
                    for (let i = 1; i <= table.days; i++) {
                      td.push(<th key={i}>{i}</th>);
                    }
                    return td;
                  })()}

                  <th className="missed-col">Total</th>
                </tr>
              </thead>
              <tbody>
                {emp.map((tabl, index) => {
                  return (
                    <tr key={index} className="student">
                      <td className="name-col">{tabl.name}</td>

                      {(() => {
                        let td = [];
                        for (let i = 1; i <= table.days; i++) {
                          td.push(
                            <td key={i} className="attend-col">
                              {tabl.attendance[i - 1].attendance === "1" ? (
                                <Link
                                  onClick={() => {
                                    setAttenData(tabl.attendance[i - 1]);
                                    setAttenIsOpen(true);
                                  }}
                                >
                                  <img src={tick} alt="" />
                                </Link>
                              ) : (
                                <img src={cross} alt="" />
                              )}
                            </td>
                          );
                        }
                        return td;
                      })()}

                      <td className="missed-col">
                        {tabl.total}/{table.days}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          show={attenisopen}
          onHide={() => {
            setAttenIsOpen(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Attendance Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h5>{attendata.user}</h5>
                <p
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  {attendata.Location}
                </p>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
                className="row"
              >
                <div className="col-6">
                  <p
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    Date - {attendata.ci_date}
                  </p>
                  <div
                    style={
                      {
                        // textAlign: '-webkit-center',
                      }
                    }
                  >
                    <div
                      style={{
                        // width: '95%',
                        marginBottom: "15px",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                          }}
                        >
                          Clock In
                        </p>
                        <p
                          style={{
                            marginBottom: "0px",
                          }}
                        >
                          {attendata.ci_time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "25px",
                      marginBottom: "25px",
                    }}
                  >
                    <div
                      style={{
                        border: "8px solid #017D9A",
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h6
                        style={{
                          marginBottom: "0px",
                        }}
                      >
                        {attendata.Duration}
                      </h6>
                    </div>
                  </div>

                  <div
                    style={
                      {
                        // textAlign: '-webkit-center',
                      }
                    }
                  >
                    <div
                      style={{
                        // width: '95%',
                        marginBottom: "15px",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                          }}
                        >
                          Clock Out
                        </p>
                        <p
                          style={{
                            marginBottom: "0px",
                          }}
                        >
                          {attendata.co_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <p
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    Activity
                  </p>
                  <div
                    style={
                      {
                        // textAlign: '-webkit-center',
                      }
                    }
                  >
                    <div
                      style={{
                        // width: '95%',
                        height: "284px",
                        marginBottom: "15px",
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                          marginLeft: "30px",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          Clock In
                        </p>

                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "12px",
                          }}
                        >
                          <span>
                            <img
                              className="sico1"
                              style={{ height: "12px" }}
                              src={clock}
                              alt=""
                            />
                          </span>{" "}
                          {attendata.ci_date} {attendata.ci_time}{" "}
                          <span>
                            <img
                              className="sico1"
                              style={{ height: "12px" }}
                              src={loc}
                              alt=""
                            />
                          </span>{" "}
                          {attendata.ci_location}
                        </p>
                      </div>

                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "30px",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          Clock Out
                        </p>

                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "12px",
                          }}
                        >
                          <span>
                            <img
                              className="sico1"
                              style={{ height: "12px" }}
                              src={clock}
                              alt=""
                            />
                          </span>{" "}
                          {attendata.ci_date} {attendata.co_time}
                          {/* <span><img style={{height: '12px'}} src={loc} alt="" /></span> G15 Islamabad */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAttenIsOpen(false);
              }}
            >
              Close
            </Button>
            {/* <Button variant="success" onClick={()=>{EditApi(table.length !== 0 ? table[editindex !== '' ? editindex : 0].id : "")}} >Update</Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
