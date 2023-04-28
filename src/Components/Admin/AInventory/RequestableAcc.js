import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";
import anim from "../../../Assets/Dashboard_SVGs/animation.json";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import edit from "../../../Assets/Dashboard_SVGs/editing.svg";
import deletee from "../../../Assets/Dashboard_SVGs/delete.svg";

import { CSVLink } from "react-csv";
// import { response } from 'express';

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

var Url = axiosURL.Requestable_get;
var AddUrl = axiosURL.Requestable_add;
var AddCategoryUrl = axiosURL.AddItemsCategory;
var GetCategoryUrl = axiosURL.GetItemsCategory;
var EditUrl = axiosURL.Requestable_edit;
var DeleteUrl = axiosURL.Requestable_delete;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function RequestableAcc() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [editisopen, setEditIsOpen] = useState(false);
  const [addisopen, setAddtIsOpen] = useState(false);
  const [addcategoryisopen, setAddCategoryIsOpen] = useState(false);

  const [editdata, setEditData] = useState([]);
  const [editindex, setEditIndex] = useState([]);
  const [adddata, setAddData] = useState([]);
  const [addcategorydata, setAddCategoryData] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  const [category, setCategory] = useState([]);
  const [test, setTest] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getData();
  }, [rerender]);
  useEffect(() => {
    //
  }, [editdata]);

  const getData = async (e) => {
    setLoaderMain(true);
    try {
      const response = await axios.get(Url, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      var data = [];
      Object.keys(res).map((category) => {
        res[category].map((item) => {
          data.push({
            id: item.id,
            Item_Name: item.Item_Name,
            Date: item.Date,
          });
        });
      });
      console.log(data);

      setTable(data);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const hadleEditModel = (index) => {
    setEditData((prevState) => ({
      ...prevState,
      IName: table.length !== 0 ? table[index].IName : "",
    }));

    setRerender(!rerender);
    setEditIsOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCategoryChange = (e) => {
    const { name, value } = e.target;
    setAddCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const AddApi = () => {
    // api Logic Here

    if (!adddata.IName) {
      alert("Item Name is Required");
    } else if (!adddata.category) {
      alert("Category is Required");
    } else {
      setLoaderMain(true);
      const url = AddUrl;
      axios
        .post(
          url,
          {
            IName: adddata.IName,
            Category: adddata.category,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201) {
            // console.log(response.status)
            alert("Error", response.status);
          } else {
            // console.log(response.data)
            setTest(true);
            setMessage("Item Added successfully");
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

  const AddCategoryApi = () => {
    setLoaderMain(true);
    if (!addcategorydata.categoryname) {
      alert("Category Name Is Required");
    } else {
      const url = AddCategoryUrl;
      axios
        .post(
          url,
          {
            categoryName: addcategorydata.categoryname,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response);

          if (response.status !== 201 && response.status !== 200) {
            alert("Error", response.status);
          } else if (response.data.message === "Category already exist") {
            alert("Category already exist");
          } else {
            setTest(true);
            setMessage("New Category Added successfully");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setAddCategoryIsOpen(false);
            setAddCategoryData([]);
            GetCategoryApi();
          }
        });
    }
    setLoaderMain(false);
  };

  const GetCategoryApi = () => {
    const url = GetCategoryUrl;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCategory(response.data);
      });
  };

  const EditApi = (id) => {
    // api Logic Here

    if (!adddata.IName) {
      alert("Item Name is Required");
    }
    // else if(!adddata.category){
    //   alert("Category is Required")
    // }
    else {
      const url = EditUrl + `/${id}`;
      axios
        .post(
          url,
          {
            IName: editdata.IName,
            // Category: adddata.category
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
            setMessage("Edit successfully");
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
          setTest(true);
          setMessage("Deleted successfully");
          setTimeout(function () {
            setTest(false);
          }, 3000);
          setRerender(!rerender);
        }
      });
  };

  const headers = [
    { label: "Item Name", key: "Item_Name" },
    { label: "Date", key: "Date" },
  ];

  const data = table;

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Products.csv",
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
            <h4 style={{ color: "#463B3B" }}>Requestable Accessories</h4>
            <div className="buttons">
              <button
                style={{
                  width: "175px",
                  marginRight: "18px",
                }}
                className="b2"
              >
                <Link
                  style={{ all: "unset", cursor: "pointer" }}
                  to=""
                  onClick={() => {
                    setAddCategoryIsOpen(true);
                  }}
                >
                  Add New Category{" "}
                </Link>
              </button>
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
                  marginRight: "18px",
                }}
                className="b2"
              >
                <Link
                  style={{ all: "unset", cursor: "pointer" }}
                  to="/inventory/requestable"
                  onClick={() => {
                    setAddtIsOpen(true);
                    GetCategoryApi();
                  }}
                >
                  Add New Item{" "}
                </Link>
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Item Name</th>
                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    <td>{index + 1}</td>
                    <td>{tabl.Item_Name}</td>
                    <td>{tabl.Date}</td>
                    <td>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/inventory/requestable"
                        onClick={() => {
                          hadleEditModel(index);
                          setEditIndex(index);
                        }}
                      >
                        <img src={edit} alt="" />{" "}
                      </Link>

                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/inventory/requestable"
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
            <Modal.Title>Add New Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  value={adddata.IName}
                  name="IName"
                  type="text"
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Assign Category</Form.Label>

                <select
                  className="form-control"
                  name="category"
                  value={addcategorydata.category}
                  onChange={handleAddChange}
                >
                  <option>Select Category</option>
                  {category.map((value) => {
                    return (
                      <option
                        key={value.item_category_name}
                        value={value.item_category_name}
                      >
                        {value.item_category_name}
                      </option>
                    );
                  })}
                </select>
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
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  value={editdata.IName}
                  name="IName"
                  type="text"
                  onChange={handleEditChange}
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

        <Modal
          show={addcategoryisopen}
          onHide={() => {
            setAddCategoryIsOpen(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Items Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  value={addcategorydata.categoryname}
                  name="categoryname"
                  type="text"
                  onChange={handleAddCategoryChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddCategoryIsOpen(false);
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
                AddCategoryApi();
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
