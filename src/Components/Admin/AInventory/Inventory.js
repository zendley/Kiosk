import "./inventory.css";
import React, { useEffect, useState } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

import nodatafound from "../../../Assets/Dashboard_SVGs/NoContentFound.svg";

var dataURL = axiosURL.DailyInventoryGet;
// var dataUrl = axiosURL.AddProducts;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Inventory() {
  const [rerender, setRerender] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
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
        dataURL,
        {
          kiosk: selected,
          date: startDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      var res = response.data;

      // console.log(res);

      setList(res.kiosk);
      setTable(res.dinv);
      // setStartDate(Date.parse(res.date));
      setCheckDate(res.date);
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

  const handleLocChange = (e) => {
    setSelected(e.target.value);
    setRerender(!rerender);
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
            <h4 style={{ color: "#463B3B" }}>View Assigned Accessories</h4>
            <div className="buttons">
              {/* <button className="b1">Download</button> */}
              <Link to={"/inventory/Assign"}>
                <button style={{ width: "180px" }} className="b2">
                  Assign Accessories
                </button>
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div
                style={{ marginBottom: "5px", alignIitems: "center" }}
                className="d-flex"
              >
                <DatePicker
                  className="form-control "
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setRerender(!rerender);
                  }}
                  placeholderText="Select Date"
                />
                {/* {
                checkDate === startDate ? 
              <button className="mx-3 pBut" disabled onClick={() => {setRerender(!rerender) }} >
                  Confirm
              </button> 
              :
              <button className="mx-3 pBut" onClick={() => {setRerender(!rerender) }} >
                  Confirm
              </button> 
                
              } */}
              </div>
            </div>
            <div className="col-8">
              <select
                className="form-control"
                name="cars"
                id="cars"
                value={selected}
                onChange={handleLocChange}
              >
                <option>Select Kiosk</option>
                {list.map((tabl, index) => {
                  return (
                    <option key={tabl.id} value={tabl.location}>
                      {tabl.location}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* 
        <div>
        <select className='form-control' name="cars" id="cars"  value={selected}
         onChange={handleLocChange}
         >
          {list.map((tabl, index)=>{
        return(
          <option key={tabl.id} value={tabl.location} >{tabl.location}</option>
          );
        })}

        </select>
        </div> */}

          <div style={{ marginTop: "20px" }} className="top">
            <h4 style={{ color: "#463B3B" }}>Daily Inventory ({checkDate})</h4>
            <div className="buttons">
              {/* <button className="b1">Download</button>
            <button style={{width:'180px'}} className="b2">Assign Inventory</button> */}
            </div>
          </div>

          {table.length < 1 ? (
            <div
              style={{
                position: "absolute",
                top: "35vh",
                left: "45vw",
              }}
            >
              <img src={nodatafound} alt="" />
            </div>
          ) : (
            <div className="row">
              {table.map((tabl, index) => {
                return (
                  <div className="col-6">
                    <div className="cucard">
                      <div className="cuicard">
                        <div>
                          <p style={{ color: "#463B3B" }}>{tabl.item_name}</p>
                        </div>
                        <div>
                          <p>{tabl.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}
