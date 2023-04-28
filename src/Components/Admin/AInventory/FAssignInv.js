import React, { useEffect, useState } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { json, Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import backk from "../../../Assets/Dashboard_SVGs/back.svg";

var dataURL = axiosURL.Kiosk;
var AddInv = axiosURL.FixedInventoryAdd;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function FAssignInv() {
  const [rerender, setRerender] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("Select Branch");
  const [inputFields, setInputFields] = useState([{ item: "", quantity: "" }]);
  const [loadermain, setLoaderMain] = useState(true);

  useEffect(() => {
    getData();
  }, [rerender]);

  const getData = async (e) => {
    setLoaderMain(true);

    try {
      const response = await axios.get(dataURL, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      // console.log(res);
      setLoaderMain(false);

      setList(res);
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

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { item: "", quantity: "" };

    setInputFields([...inputFields, newfield]);
  };

  const handleSubmit = async () => {
    if (inputFields[0].item === "" || inputFields[0].quantity === "") {
      alert("All Fields are Required");
    } else if (selected === "Select Branch") {
      alert("Kiosk Is Required");
    } else {
      setLoaderMain(true);

      try {
        const response = await axios.post(
          AddInv,
          {
            data: JSON.stringify(inputFields),
            kiosk: selected,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        var res = response.data;

        // console.log(res);

        setInputFields([{ item: "", quantity: "" }]);

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

      // console.log(JSON.stringify(inputFields));
      // alert("Submitted SuccessFully")
    }
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
            <div style={{ display: "flex" }}>
              <Link to={"/inventory/fixed"}>
                <h4>
                  <img style={{ marginRight: "10px" }} src={backk} alt="" />
                </h4>
              </Link>
              <h4 style={{ color: "#463B3B" }}>Assign Inventory</h4>
            </div>
            <div className="buttons">
              {/* <button className="b1">Download</button> */}
              <button
                style={{ width: "180px" }}
                onClick={addFields}
                className="b2"
              >
                Add Item
              </button>
            </div>
          </div>

          <div>
            <select
              className="form-control"
              name="cars"
              id="cars"
              value={selected}
              onChange={handleLocChange}
            >
              <option disabled value="Select Branch">
                Select Kiosk
              </option>
              {list.map((tabl, index) => {
                return (
                  <option key={tabl.id} value={tabl.location}>
                    {tabl.location}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ marginTop: "10px" }} className="row">
            {inputFields.map((input, index) => {
              return (
                <div key={index} className="col-6">
                  <div className="cucard">
                    <div style={{ width: "48%" }}>
                      <input
                        type="text"
                        placeholder="Item"
                        className="form-control"
                        name="item"
                        value={input.item}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                    <div style={{ width: "48%", marginLeft: "20px" }}>
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="form-control"
                        name="quantity"
                        value={input.quantity}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              style={{ width: "180px" }}
              onClick={handleSubmit}
              className="b2"
            >
              Assign
            </button>
          </div>
        </div>
      </>
    );
  }
}
