import React from "react";

import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import download from "../../../Assets/Dashboard_SVGs/DownloadIcon.svg";
import nodatafound from "../../../Assets/Dashboard_SVGs/NoContentFound.svg";
import addmovementimg from "../../../Assets/Dashboard_SVGs/AddMovementIcon.svg";

var getLiveSales = axiosURL.liveSales;
var AddMovement = axiosURL.Add_Movement;
var flavs_Url = axiosURL.flav_name;
var getMovekiosk = axiosURL.bakery_movement_Kiosk;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function LiveStatus() {
  const [table, setTable] = useState([]);
  const [header, setHeader] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [loadermain, setLoaderMain] = useState(true);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [total_prod, setTotalProd] = useState(true);

  const [movementisopen, setMovementIsOpen] = useState(false);
  const [to, setTo] = useState("Select To");
  const [from, setFrom] = useState("Select From");
  const [flavlist, setFlavList] = useState([]);
  const [flavamt, setFlavAmt] = useState([]);
  const [skiosks, setkiosk] = useState([]);

  const [inputFields, setInputFields] = useState([
    { flavour: "", quantity: "" },
  ]);

  useEffect(() => {
    getData();
  }, [rerender]);

  const handleFormChange = async (e, val) => {
    // console.log(val)
    if (val < e.target.value) {
      const { name, value } = e.target;
      setFlavAmt((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      const { name, value } = e.target;
      setFlavAmt((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFromChange = async (e) => {
    setFrom(e.target.value);

    try {
      const res = await axios.post(
        flavs_Url,
        {
          branch: e.target.value,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      var list = res.data;
      //   console.log(res.data)

      setFlavList(list);
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
      //   console.log(err);
    }
  };
  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handelMovement = () => {
    // AddMovement

    if (from === "Select From") {
      alert("From is Required");
    } else if (to === "Select To") {
      alert("To is Required");
    } else {
      setLoaderMain(true);

      const url = AddMovement;
      axios
        .post(
          url,
          {
            from: from,
            to: to,
            flavours: JSON.stringify(flavamt),
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
            console.log("============================");
            console.log(response.data);
            console.log("============================");
            setFrom("Select From");
            setTo("Select To");
            setMovementIsOpen(false);
            setInputFields([]);
            setRerender(!rerender);
            setFlavList([]);
            setFlavAmt([]);
            setLoaderMain(false);
          }
        });
    }
  };

  const getData = async () => {
    await axios
      .get(getLiveSales, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Error", response.status);
        } else {
          console.log("tettstststststs");
          console.log(response.data);
          console.log("tettstststststs");

          setHeader(response.data.header);
          setTable(response.data.dataa);
          setTotalProd(response.data.total_production);
          setDate(response.data.date);
          setMessage(response.data.message);

          setLoaderMain(false);
          // console.log(response.data)
        }
      });

    try {
      const kioskss = await axios.get(getMovekiosk, {
        headers: {
          Authorization: token,
        },
      });

      var kiosks = kioskss.data;
      console.log(kiosks);

      setkiosk(kiosks);
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
      //   console.log(err);
    }
  };

  const rowStyle2 = (row, rowIndex) => {
    const style = {};

    style.textAlign = "center";
    style.verticalAlign = "middle";
    // style.backgroundColor ="red"

    return style;
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
  } else if (message === "Nothing Assigned Yet") {
    return (
      <div
        style={{
          textAlign: "center",
          height: "92vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{ height: "350px", alignSelf: "center" }}
          src={nodatafound}
          alt=""
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="px-3 py-3">
          <div className="a">
            <h2>
              Total Production = <span>{total_prod}</span>
            </h2>

            <h2>{date}</h2>
          </div>
          <div style={{ justifyContent: "right" }} className="a">
            {/* <h2>Remaining = {remainingProd}</h2> */}
            <div className="buttons">
              <button
                style={{ width: "140px", marginRight: "0px !important" }}
                onClick={() => {
                  setMovementIsOpen(true);
                }}
                className="pButMr0"
              >
                <span>
                  <img style={{ height: "10px" }} src={addmovementimg} alt="" />
                </span>{" "}
                Add Movement
              </button>
            </div>
          </div>
          <div className="table">
            {header.length === 0 ? (
              "Hello"
            ) : table.length === 0 ? (
              "Hello"
            ) : (
              <BootstrapTable
                keyField="id"
                columns={header}
                data={table}
                striped
                hover
                condensed
                rowStyle={rowStyle2}
              />
            )}
          </div>
        </div>

        <Modal
          show={movementisopen}
          onHide={() => {
            setMovementIsOpen(false);
          }}
          size="s"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Movement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>From</Form.Label>
                <Form.Control
                  value={from}
                  name="perct"
                  as="select"
                  placeholder="From"
                  onChange={handleFromChange}
                >
                  <option>Select From</option>
                  {skiosks.map((kis, index) => {
                    return (
                      <option key={index} value={kis.location}>
                        {kis.location}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>To</Form.Label>
                <Form.Control
                  value={to}
                  name="perct"
                  as="select"
                  placeholder="TO"
                  onChange={handleToChange}
                >
                  <option>Select To</option>
                  {skiosks.map((kis, index) => {
                    return (
                      <option key={index} value={kis.location}>
                        {kis.location}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              {flavlist.map((kis, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                    className="row"
                  >
                    <div className="col-6">
                      <p
                        style={{
                          marginBottom: "0px",
                        }}
                        key={index}
                      >
                        {kis.flavour_name} (Qty: {kis.production - kis.sold})
                      </p>
                    </div>
                    <div className="col-6">
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          value={flavamt[kis.flavour_name]}
                          name={kis.flavour_name}
                          type="number"
                          placeholder="Enter required quantity"
                          onChange={(event) => {
                            handleFormChange(event, kis.production - kis.sold);
                          }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                );
              })}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setMovementIsOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#FF8AA5", border: "none" }}
              onClick={() => {
                handelMovement();
              }}
            >
              Move
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
