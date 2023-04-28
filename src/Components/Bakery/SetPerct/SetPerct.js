import React, { useEffect, useState } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

var Get_Url = axiosURL.Get_perct;
var Set_Url = axiosURL.Set_perct;
var Clear_Url = axiosURL.Clear_perct;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function SetPerct() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [editindex, setEditIndex] = useState("");
  // const [editid, setEditId] = useState("")
  const [editisopen, setEditIsOpen] = useState(false);
  const [editperct, setEditPerct] = useState(0);
  const [loadermain, setLoaderMain] = useState(true);
  const [totalperct, settotalPerct] = useState(0);
  const [curperct, setCurPerct] = useState(0);

  useEffect(() => {
    getData();
  }, [rerender]);

  useEffect(() => {
    //
  }, [editperct]);

  const getData = async (e) => {
    try {
      const response = await axios.get(Get_Url, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      setTable(res.data);
      settotalPerct(res.total);

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

  const EditApi = (id) => {
    // api Logic Here

    if (editperct === "") {
      alert("Percentage Required");
    } else if (totalperct - curperct + +editperct > 100) {
      alert("Percentage Exceeded 100%");
      // setCurPerct(0)
    } else {
      setLoaderMain(true);

      const url = Set_Url + `/${id}`;
      axios
        .post(
          url,
          {
            percentage: editperct,
            total: totalperct,
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
            setEditIsOpen(false);
            setRerender(!rerender);
            setLoaderMain(false);
          }
        });
    }
  };

  const handleEditChange = (e) => {
    // const { name, value } = e.target;
    setEditPerct(e.target.value);
  };
  const handleClear = () => {
    setLoaderMain(true);

    const url = Clear_Url;
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
          setLoaderMain(false);
        }
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
          <div style={{ marginRight: "10px" }} className="top">
            <h4 style={{ color: "#463B3B" }}>
              Set Percentage
              <span>
                <p
                  style={{
                    marginBottom: "0px",
                    fontSize: "18px",
                    marginTop: "7px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    Total Percentage:
                  </span>{" "}
                  {totalperct}%
                </p>
              </span>
            </h4>

            <div style={{ alignItems: "center" }} className="buttons d-flex">
              <button
                onClick={handleClear}
                className="pButMr0"
                style={{ marginRight: "5px" }}
              >
                Clear Percentage
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    <td>{tabl.product_name}</td>
                    <td>{tabl.description}</td>
                    <td>{tabl.perct_to_divide}%</td>
                    <td>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/set_percentage"
                        onClick={() => {
                          setEditPerct(tabl.perct_to_divide);
                          setCurPerct(tabl.perct_to_divide);
                          setEditIndex(index);
                          setEditIsOpen(true);
                        }}
                      >
                        Edit{" "}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
            <Modal.Title>
              Edit{" "}
              {table.length !== 0
                ? table[editindex !== "" ? editindex : 0].product_name
                : ""}{" "}
              percentage
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Percentage</Form.Label>
                <Form.Control
                  value={editperct}
                  name="perct"
                  type="number"
                  placeholder="10"
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
              to="/set_percentage"
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
      </>
    );
  }
}
