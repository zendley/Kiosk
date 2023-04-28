import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import anim from "../../../Assets/Dashboard_SVGs/animation.json";

import edit from "../../../Assets/Dashboard_SVGs/editing.svg";
import deletee from "../../../Assets/Dashboard_SVGs/active.svg";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

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

var Url = axiosURL.Employee;
var AddUrl = axiosURL.AddEmployee;
var EditUrl = axiosURL.EditEmployee;
var DeleteUrl = axiosURL.DeleteEmployee;
var dataURL = axiosURL.Kiosk;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Employee() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [list, setList] = useState([]);
  const [editisopen, setEditIsOpen] = useState(false);
  const [addisopen, setAddtIsOpen] = useState(false);
  const [imgisopen, setImgtIsOpen] = useState(false);
  const [imgurl, setImgUrl] = useState("");

  const [editdata, setEditData] = useState([]);
  const [editimage, setEditImage] = useState("");
  const [editimage2, setEditImage2] = useState("");
  const [editindex, setEditIndex] = useState([]);
  const [adddata, setAddData] = useState([]);
  const [addimage, setAddImage] = useState("");
  const [addimage2, setAddImage2] = useState("");

  const [loadermain, setLoaderMain] = useState(true);
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

      // console.log(res)
      setTable(res);
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

    try {
      const response = await axios.get(dataURL, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      // console.log(res);

      setList(res);

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

  const hadleEditModel = (index) => {
    setEditData((prevState) => ({
      ...prevState,
      name: table.length !== 0 ? table[index].name : "",
      email: table.length !== 0 ? table[index].email : "",
      address: table.length !== 0 ? table[index].address : "",
      cnic: table.length !== 0 ? table[index].cnic : "",
      phone: table.length !== 0 ? table[index].phone : "",
      salary: table.length !== 0 ? table[index].salary : "",
      joining: table.length !== 0 ? table[index].joining_date : "",
      branch_name: table.length !== 0 ? table[index].branch_name : "",
    }));

    setEditIsOpen(true);
  };

  const EditApi = (id) => {
    // api Logic Here

    if (editdata.name === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.address === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.salary === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.phone === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.salary === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.joining === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (editdata.branch_name === undefined) {
      alert("Missing Field. Please complete the form");
    } else {
      setLoaderMain(true);
      let data = new FormData();
      data.append("name", editdata.name);
      data.append("email", editdata.email);
      data.append("address", editdata.address);
      data.append("salary", editdata.salary);
      data.append("phone", editdata.phone);
      data.append("joining_date", editdata.joining);
      data.append("branch", editdata.branch_name);
      data.append("cnic_f", editimage);
      data.append("cnic_b", editimage2);

      const url = EditUrl + `/${id}`;
      axios
        .post(url, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data)
            setEditIsOpen(false);
            setEditData([]);
            setTest(true);
            setMessage("Record updated successfully");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setEditImage("");
            setEditImage2("");
            setRerender(!rerender);
          } else {
            // console.log(response.status)
            alert("Error", response.status);
            setLoaderMain(false);
          }
        });
    }
  };

  const handleEditChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageEdit = (e) => {
    // console.log(e.target.files)
    setEditImage(e.target.files[0]);
  };

  const handleImageEdit2 = (e) => {
    // console.log(e.target.files)
    setEditImage2(e.target.files[0]);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageAdd = (e) => {
    // console.log(e.target.files)
    setAddImage(e.target.files[0]);
  };

  const handleImageAdd2 = (e) => {
    // console.log(e.target.files)
    setAddImage2(e.target.files[0]);
  };

  const AddApi = () => {
    // api Logic Here

    if (adddata.name === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.email === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.password === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.branch_name === "Select Kiosk") {
      alert("Missing Field. Please complete the form");
    } else if (adddata.address === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.phone === undefined || adddata.phone === "") {
      alert("Missing Field. Please complete the form");
    } else if (adddata.salary === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (adddata.joining === undefined) {
      alert("Missing Field. Please complete the form");
    } else if (addimage === "") {
      alert("Missing Field. Please Upload Cnic image");
    } else if (addimage2 === "") {
      alert("Missing Field. Please Upload Cnic image");
    } else {
      setLoaderMain(true);
      console.log(adddata.email);
      let data = new FormData();
      data.append("name", adddata.name);
      data.append("email", adddata.email);
      data.append("password", adddata.password);
      data.append("branch_name", adddata.branch_name);
      data.append("address", adddata.address);
      data.append("phone", adddata.phone);
      data.append("salary", adddata.salary);
      data.append("joining_date", adddata.joining);
      data.append("cnic_f", addimage);
      data.append("cnic_b", addimage2);

      // console.log(addimage)

      const url = AddUrl;
      axios
        .post(url, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.status)
            setTest(true);
            setMessage("New Employe Added");
            setTimeout(function () {
              setTest(false);
            }, 5000);
            alert(response.data.message);
            setAddtIsOpen(false);
            setAddData([]);
            setAddImage("");
            setAddImage2("");
            setRerender(!rerender);
          } else if (response.status !== 201) {
            alert("Error", response.status);
            setLoaderMain(false);
            // console.log(response.data)
          } else {
            alert(response.data.message);
            setAddtIsOpen(false);
            setAddData([]);
            setAddImage("");
            setAddImage2("");
            setRerender(!rerender);
            // console.log(response.status)
          }
        });
    }
  };

  const handleDeleteApi = (id) => {
    setLoaderMain(true);
    const url = DeleteUrl + `/${id}`;
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
    { label: "Employee Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone No", key: "phone" },
    { label: "Salary", key: "salary" },
    { label: "Joining Date", key: "joining_date" },
  ];

  const data = table;

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Employee.csv",
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
            <h4 style={{ color: "#463B3B" }}>Employee</h4>
            <div className="buttons">
              <CSVLink
                style={{ padding: "6.5px 35px" }}
                {...csvReport}
                className="b1"
              >
                Download
              </CSVLink>
              <button
                style={{
                  width: "175px",
                }}
                className="b2"
              >
                <Link
                  style={{ all: "unset", cursor: "pointer" }}
                  to="/employee"
                  onClick={() => {
                    setAddtIsOpen(true);
                  }}
                >
                  Add New Employee{" "}
                </Link>
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Address</th>
                <th>CNIC</th>
                <th>Phone #</th>
                <th>Salary(PKR)</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                const statusStyle =
                  tabl.status === "Active"
                    ? { color: "#52C21C" }
                    : tabl.status === "In-Active"
                    ? { color: "red" }
                    : {};
                return (
                  <tr key={index}>
                    <td>{tabl.name}</td>
                    <td>{tabl.address}</td>

                    <td>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/employee"
                        onClick={() => {
                          setImgUrl(
                            "https://dwf.walnuthash.com/public/uploads/employee/" +
                              tabl.cnic_f
                          );
                          setImgtIsOpen(true);
                        }}
                      >
                        <img
                          style={{ margin: "2px", width: "50px" }}
                          src={
                            "https://dwf.walnuthash.com/public/uploads/employee/" +
                            tabl.cnic_f
                          }
                          alt={`Employee Cnic`}
                          className="img-responsive"
                        />
                      </Link>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/employee"
                        onClick={() => {
                          setImgUrl(
                            "https://dwf.walnuthash.com/public/uploads/employee/" +
                              tabl.cnic_b
                          );
                          setImgtIsOpen(true);
                        }}
                      >
                        <img
                          style={{ margin: "2px", width: "50px" }}
                          src={
                            "https://dwf.walnuthash.com/public/uploads/employee/" +
                            tabl.cnic_b
                          }
                          alt={`Employee Cnic`}
                          className="img-responsive"
                        />
                      </Link>
                    </td>
                    <td>{tabl.phone}</td>
                    <td>{tabl.salary}</td>
                    <td>{tabl.joining_date}</td>
                    <td style={statusStyle}>
                      <b>{tabl.status}</b>
                    </td>
                    <td style={{ minWidth: "100px" }}>
                      <div
                        style={{
                          borderRadius: "5px",
                          textAlign: "center",
                          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                          padding: "3px",
                        }}
                      >
                        <Link
                          style={{ all: "unset", cursor: "pointer" }}
                          to="/employee"
                          onClick={() => {
                            hadleEditModel(index);
                            setEditIndex(index);
                          }}
                        >
                          <img src={edit} alt="" />{" "}
                        </Link>
                        <Link
                          style={{ all: "unset", cursor: "pointer" }}
                          to="/employee"
                          onClick={() => {
                            handleDeleteApi(tabl.id);
                          }}
                        >
                          {" "}
                          <img src={deletee} alt="" />{" "}
                        </Link>
                      </div>
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
          {/* <div style={{ position: "absolute" }}>test</div> */}
        </div>

        {/* Edit */}
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
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editdata.name}
                  name="name"
                  type="text"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={editdata.email}
                  name="email"
                  type="text"
                  onChange={handleEditChange}
                  // disabled
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Assign Kiosk</Form.Label>

                <select
                  className="form-control"
                  name="branch_name"
                  id="cars"
                  value={editdata.branch_name}
                  onChange={handleEditChange}
                >
                  <option>Select Kiosk</option>
                  {list.map((tabl, index) => {
                    return (
                      <option
                        key={tabl.id}
                        selected={tabl.location === editdata.location}
                        value={tabl.location}
                      >
                        {tabl.location}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={editdata.address}
                  name="address"
                  type="text"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={editdata.phone}
                  name="phone"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Salary(PKR)</Form.Label>
                <Form.Control
                  value={editdata.salary}
                  name="salary"
                  type="number"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  value={editdata.joining}
                  name="joining"
                  type="date"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>CNIC Front</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageEdit}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>CNIC Back</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageEdit2}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
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
                border: "none",
              }}
              onClick={() => {
                EditApi(
                  table.length !== 0
                    ? table[editindex !== "" ? editindex : 0].id
                    : ""
                );
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Employee */}

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
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={adddata.name}
                  name="name"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={adddata.email}
                  name="email"
                  type="email"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={adddata.password}
                  name="password"
                  type="password"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Assign Kiosk</Form.Label>

                <select
                  className="form-control"
                  name="branch_name"
                  id="cars"
                  value={adddata.branch_name}
                  onChange={handleAddChange}
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
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={adddata.address}
                  name="address"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={adddata.phone}
                  name="phone"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Salary(PKR)</Form.Label>
                <Form.Control
                  value={adddata.salary}
                  name="salary"
                  type="number"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  value={adddata.joining}
                  name="joining"
                  type="date"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>CNIC Front</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageAdd}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>CNIC Back</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageAdd2}
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

        {/* image */}

        <Modal
          show={imgisopen}
          onHide={() => {
            setImgtIsOpen(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <img src={imgurl} alt="EMPLOYEE CNIC" />
        </Modal>
      </>
    );
  }
}
