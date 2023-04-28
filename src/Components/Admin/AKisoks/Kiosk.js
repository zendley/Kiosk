import "./Kisok.css";
import React, { useEffect, useState } from "react";
import lottie from "lottie-web";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";
import anim from "../../../Assets/Dashboard_SVGs/animation.json";
import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

import edit from "../../../Assets/Dashboard_SVGs/editing.svg";
import deletee from "../../../Assets/Dashboard_SVGs/delete.svg";

import { CSVLink } from "react-csv";
function MyComponent() {
  const containerRef = React.useRef(null);

  const onClose = () => {};

  React.useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim,
    });

    setTimeout(() => {
      onClose();
    }, 3000); // hide the component after 3 seconds

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: 360, // set the width to 200 pixels
        height: 340, // set the height to 200 pixels
      }}
      ref={containerRef}
    ></div>
  );
}

var Url = axiosURL.Kiosk;
var Add_Url = axiosURL.AddKiosk;
var Edit_Url = axiosURL.EditKiosk;
var Delete_Url = axiosURL.DeleteKiosk;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

var getkioskprice_url = axiosURL.GetKioskPrice;
var changekisoskprice_url = axiosURL.ChangeKioskPrice;
var getkioskbatchprice_url = axiosURL.GetKioskBatchPrice;
var setkioskbatchprice_url = axiosURL.SetKioskBatchPrice;

export default function Kiosk() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [editisopen, setEditIsOpen] = useState(false);
  const [addisopen, setAddtIsOpen] = useState(false);

  const [editdata, setEditData] = useState([]);
  const [editindex, setEditIndex] = useState([]);
  const [adddata, setAddData] = useState([]);
  const [kioskproductprice, setKioskProductPrice] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);
  const [editpriceopen, setEditPriceOpen] = useState(false);

  const [kioskbatchprice, setKioskBatchPrice] = useState([]);
  const [editbatchprice, setEditBatchPrice] = useState(false);
  const [test, setTest] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getData();
  }, [rerender]);

  const getData = async (e) => {
    setLoaderMain(true);
    try {
      const response = await axios.get(Url, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      setTable(res);
      setLoaderMain(false);
      console.log(response);
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceEditChange = (e) => {
    const { name, value } = e.target;
    setKioskProductPrice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBatchPriceEditChange = (e) => {
    const { name, value } = e.target;
    setKioskBatchPrice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddComissionChange = (e) => {
    if (100 < e.target.value) {
      const { name, value } = e.target;
      setAddData((prevState) => ({
        ...prevState,
        [name]: 100,
      }));
    } else {
      const { name, value } = e.target;
      setAddData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditComissionChange = (e) => {
    if (100 < e.target.value) {
      const { name, value } = e.target;
      setEditData((prevState) => ({
        ...prevState,
        [name]: 100,
      }));
    } else {
      const { name, value } = e.target;
      setEditData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const AddApi = () => {
    // api Logic Here

    if (adddata.ename === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.kname === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.loc === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.timing === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.llc === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.rent === undefined && adddata.commission !== undefined) {
      alert("Missing Field. Please add comission or rent");
    } else {
      setLoaderMain(true);
      const url = Add_Url;
      axios
        .post(
          url,
          {
            emp_name: adddata.ename,
            kisok_name: adddata.kname,
            location: adddata.loc,
            timing: adddata.timing,
            landlord: adddata.llc,
            monthly_rent: adddata.rent,
            commission: adddata.commission,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            // console.log(response.status)
            alert("Error", response.status);
          } else {
            // console.log(response.data)
            setTest(true);
            setMessage("Kiosk Updated");
            setTimeout(function () {
              setTest(false);
            }, 3000);

            setAddtIsOpen(false);
            setAddData([]);
            setRerender(!rerender);
          }
        });
    }
  };

  const GetKioskProductPrice = () => {
    // api Logic Here

    setLoaderMain(true);
    const url = getkioskprice_url;
    axios
      .post(
        url,
        {
          location: editdata.loc,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status !== 201 && response.status !== 200) {
          // console.log(response.status)
          alert("Error", response.status);
        } else {
          setKioskProductPrice(response.data);
          setLoaderMain(false);
        }
      });
  };

  const EditKioskPrice = () => {
    // api Logic Here
    var errors = false;
    Object.entries(kioskproductprice).map(([key, value]) => {
      if (!value) {
        errors = true;
      }
    });

    if (errors) {
      alert("Missing Field. Please complete the form");
    } else {
      setLoaderMain(true);
      const url = changekisoskprice_url;

      axios
        .post(
          url,
          {
            kiosk: editdata.kname,
            data: kioskproductprice,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            // console.log(response.status)
            alert("Error", response.status);
          } else {
            setTest(true);
            setMessage("Kiosk Updated");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setKioskProductPrice(response.data);
            setLoaderMain(false);
          }
        });
    }
  };

  const GetKioskBatchPrice = () => {
    // api Logic Here

    setLoaderMain(true);
    const url = getkioskbatchprice_url;
    axios
      .post(
        url,
        {
          location: editdata.loc,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        if (response.status !== 201 && response.status !== 200) {
          // console.log(response.status)
          alert("Error", response.status);
        } else {
          // setKioskProductPrice(response.data)

          setKioskBatchPrice(response.data);
          setEditPriceOpen(false);
          setLoaderMain(false);
        }
      });
  };

  const EditKioskBatchPrice = () => {
    // api Logic Here

    var errors = false;
    Object.entries(kioskbatchprice).map(([key, value]) => {
      if (!value) {
        errors = true;
      }
    });

    if (errors) {
      alert("Missing Field. Please complete the form");
    } else {
      setLoaderMain(true);
      const url = setkioskbatchprice_url;

      axios
        .post(
          url,
          {
            kiosk: editdata.kname,
            data: kioskbatchprice,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            // console.log(response.status)
            alert("Error", response.status);
          } else {
            setTest(true);
            setMessage("Kiosk Batch Price Updated");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setKioskProductPrice(response.data);
            setEditBatchPrice(false);
            setLoaderMain(false);
          }
        });
    }
  };

  const hadleEditModel = (index) => {
    setEditData((prevState) => ({
      ...prevState,
      ename: table.length !== 0 ? table[index].emp_name : "",
      kname: table.length !== 0 ? table[index].kisok_name : "",
      loc: table.length !== 0 ? table[index].location : "",
      timing: table.length !== 0 ? table[index].timing : "",
      llc: table.length !== 0 ? table[index].landlord : "",
      rent: table.length !== 0 ? table[index].monthly_rent : "",
      commission: table.length !== 0 ? table[index].Commission : "",
    }));

    setEditIsOpen(true);
  };

  const EditApi = (id) => {
    // api Logic Here

    if (editdata.ename === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.kname === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.loc === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.timing === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.llc === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.rent === undefined && adddata.commission !== undefined) {
      alert("Missing Field. Please add comission or rent");
    } else {
      setLoaderMain(true);

      const url = Edit_Url + `/${id}`;
      axios
        .post(
          url,
          {
            emp_name: editdata.ename,
            kisok_name: editdata.kname,
            location: editdata.loc,
            timing: editdata.timing,
            landlord: editdata.llc,
            monthly_rent: editdata.rent,
            commission: editdata.commission,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 200) {
            // console.log(response.status)
            alert("Error", response.status);
          } else {
            // console.log(response.data)
            setTest(true);
            setMessage("Kiosk Updated");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setEditIsOpen(false);
            setEditData([]);
            setRerender(!rerender);
          }
        });
    }
  };

  const handleDeleteApi = (id) => {
    setLoaderMain(true);
    const url = Delete_Url + `/${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Error", response.status);
        } else {
          setRerender(!rerender);
        }
      });
  };

  const headers = [
    { label: "EMPLOYEE NAME", key: "emp_name" },
    { label: "KIOSK NAME", key: "kisok_name" },
    { label: "LOCATION", key: "location" },
    { label: "TIMINGS", key: "timing" },
    { label: "LANDLORD CONTACT", key: "landlord" },
    { label: "MONTHLY RENT / COMISSION (PKR)", key: "monthly_rent" },
  ];

  const data = table;

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Kiosks.csv",
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
            <h4 style={{ color: "#463B3B" }}>Kiosk</h4>
            <div className="buttons">
              <CSVLink
                style={{ padding: "6.5px 35px" }}
                {...csvReport}
                className="b1"
              >
                Download
              </CSVLink>
              <button className="b2">
                <Link
                  style={{ all: "unset", cursor: "pointer" }}
                  to="/kiosk"
                  onClick={() => {
                    setAddtIsOpen(true);
                  }}
                >
                  Add New Kiosk
                </Link>
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Kiosk Name</th>
                <th>Location</th>
                <th>Timings</th>
                <th>Landlord Contact</th>
                {/* <th>Inventory</th> */}
                <th>Monthly Rent(PKR)</th>
                <th>Comission(%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    <td>{tabl.emp_name}</td>
                    <td>{tabl.kisok_name}</td>
                    <td>{tabl.location}</td>
                    <td>{tabl.timing}</td>
                    <td>{tabl.landlord}</td>
                    {/* <td>Button</td> */}
                    <td>{tabl.monthly_rent}</td>
                    <td>{tabl.Commission}</td>
                    <td style={{ width: "100px" }}>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/kiosk"
                        onClick={() => {
                          hadleEditModel(index);
                          setEditIndex(index);
                        }}
                      >
                        {" "}
                        <img src={edit} alt="" />{" "}
                      </Link>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/kiosk"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          )
                            handleDeleteApi(tabl.id);
                        }}
                      >
                        {" "}
                        <img src={deletee} alt="" />{" "}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{
              display: test ? "flex" : "none",
              position: "fixed",
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: "9999999999999999999999",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "fit-content",
                backgroundColor: "white",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <MyComponent />
              {message && (
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {message}
                </span>
              )}
            </div>
          </div>
        </div>

        <Modal
          show={addisopen}
          onHide={() => {
            setAddtIsOpen(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Kiosk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  value={adddata.ename}
                  name="ename"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kiosk Name</Form.Label>
                <Form.Control
                  value={adddata.kname}
                  name="kname"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={adddata.loc}
                  name="loc"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Timings</Form.Label>
                <Form.Control
                  value={adddata.timing}
                  name="timing"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Landlord Contact No</Form.Label>
                <Form.Control
                  type="text"
                  value={adddata.llc}
                  name="llc"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Monthly Rent</Form.Label>
                <Form.Control
                  value={adddata.rent}
                  name="rent"
                  type="number"
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Comission %</Form.Label>
                <Form.Control
                  value={adddata.commission}
                  name="commission"
                  type="number"
                  onChange={handleAddComissionChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddtIsOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{
                background: "linear-gradient(180deg, #01a0c6, #015063)",
                backgroundColor: "rgb(255, 138, 165)",
                border: "none",
              }}
              onClick={() => {
                AddApi();
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={editisopen}
          onHide={() => {
            setEditIsOpen(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Kiosk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  value={editdata.ename}
                  name="ename"
                  type="text"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kiosk Name</Form.Label>
                <Form.Control
                  value={editdata.kname}
                  name="kname"
                  type="text"
                  onChange={handleEditChange}
                  disabled
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={editdata.loc}
                  name="loc"
                  type="text"
                  onChange={handleEditChange}
                  disabled
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Timings</Form.Label>
                <Form.Control
                  value={editdata.timing}
                  name="timing"
                  type="text"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Landlord Contact No</Form.Label>
                <Form.Control
                  type="number"
                  value={editdata.llc}
                  name="llc"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Monthly Comission/Rent</Form.Label>
                <Form.Control
                  value={editdata.rent}
                  name="rent"
                  type="number"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Comission</Form.Label>
                <Form.Control
                  value={editdata.commission}
                  name="commission"
                  type="number"
                  onChange={handleEditComissionChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <div>
                <Button
                  style={{
                    background: "linear-gradient(180deg, #01a0c6, #015063)",
                    backgroundColor: "rgb(255, 138, 165)",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    GetKioskBatchPrice();
                    setEditBatchPrice(true);
                    setEditIsOpen(false);
                  }}
                >
                  Edit batch price
                </Button>
                <Button
                  style={{
                    background: "linear-gradient(180deg, #01a0c6, #015063)",
                    backgroundColor: "rgb(255, 138, 165)",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    GetKioskProductPrice();
                    setEditPriceOpen(true);
                    setEditIsOpen(false);
                  }}
                >
                  Edit product price
                </Button>
              </div>
              <div>
                <Button
                  style={{ marginRight: "10px" }}
                  variant="secondary"
                  onClick={() => {
                    setEditIsOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  style={{
                    background: "linear-gradient(180deg, #01a0c6, #015063)",
                    backgroundColor: "rgb(255, 138, 165)",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    EditApi(
                      table.length !== 0
                        ? table[editindex !== "" ? editindex : 0].id
                        : ""
                    );
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          show={editpriceopen}
          onHide={() => {
            setEditPriceOpen(false);
            setEditIsOpen(true);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Kiosk Product Price</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {Object.entries(kioskproductprice).map(([key, value]) => (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    value={value}
                    name={key}
                    type="number"
                    onChange={handlePriceEditChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setEditPriceOpen(false);
                setEditIsOpen(true);
              }}
            >
              Close
            </Button>
            <Button
              style={{
                background: "linear-gradient(180deg, #01a0c6, #015063)",
                border: "none",
              }}
              onClick={() => {
                EditKioskPrice();
              }}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={editbatchprice}
          onHide={() => {
            setEditBatchPrice(false);
            setEditIsOpen(true);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Kiosk Batch Price</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {Object.entries(kioskbatchprice).map(([key, value]) => (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>{key.replace("_", " ")}</Form.Label>
                  <Form.Control
                    value={value}
                    name={key}
                    type="number"
                    onChange={handleBatchPriceEditChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setEditBatchPrice(false);
                setEditIsOpen(true);
              }}
            >
              Close
            </Button>
            <Button
              style={{
                background: "linear-gradient(180deg, #01a0c6, #015063)",
                border: "none",
              }}
              onClick={() => {
                EditKioskBatchPrice();
              }}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
