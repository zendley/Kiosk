import "./Rtable.css";
import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import { getDatabase, ref, set } from "firebase/database";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import download from "../../../Assets/Dashboard_SVGs/DownloadIcon.svg";
import addmovementimg from "../../../Assets/Dashboard_SVGs/AddMovementIcon.svg";

var EditUrl = axiosURL.Edit;
var BakeryData = axiosURL.Bakery_Data;
var BakeryDataEdit = axiosURL.Bakery_Data_Edit;
var BakeryTable = axiosURL.Bakery_Table;
var AddMovement = axiosURL.Add_Movement;
var getkiosk = axiosURL.bakery_Kiosk;
var Submit = axiosURL.Submit;
var Clear_Url = axiosURL.clear_production;
var flavs_Url = axiosURL.flav_name;
var branch_Url = axiosURL.branch_name;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

const { ExportCSVButton } = CSVExport;

export default function Rtable() {
  const [totalProd, setTotalProd] = useState();
  const [date, setDate] = useState();
  const [remainingProd, setRemainingProd] = useState();
  const [columns, setColumns] = useState([]);
  // const [table, setTable] = useState([]);
  const [data, setData] = useState([]);
  const [edata, setEData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [rerender2, setRerender2] = useState(false);
  const [rerender3, setRerender3] = useState(false);
  const [loadermain, setLoaderMain] = useState(true);
  const [skiosks, setkiosk] = useState([]);
  const [movementisopen, setMovementIsOpen] = useState(false);
  const [from, setFrom] = useState("Select From");
  const [to, setTo] = useState("Select To");
  const [flavour, setFlavour] = useState("Select Flavour");
  const [flavlist, setFlavList] = useState([]);
  const [flavamt, setFlavAmt] = useState([]);
  const [butt, setButt] = useState("");
  const [red, setRed] = useState([]);
  const [isred, setIsRed] = useState();
  const [isSubmit, setIsSUBMIT] = useState();
  const [submitbuttshow, setSubmitButtShow] = useState(false);
  const [showwarningalert, setSshowWarningAlert] = useState(false);
  const [warningmesg, setWarningMesg] = useState(
    "Kindly submit assigned donuts"
  );
  const [decimalwarning, setDecimalWarning] = useState(false);
  const [productions, setProductions] = useState("");
  const [production_no, setProduction_no] = useState("os");
  const [new_production, setNewProduction] = useState();

  const [inputFields, setInputFields] = useState([
    { flavour: "", quantity: "" },
  ]);

  // const handleFormChange = (index, event) => {
  //     let data = [...flavamt];
  //     data[index][event.target.name] = event.target.value;
  //     setFlavAmt(data);
  // }

  // const handleFormChange = e => {
  //     const { name, value } = e.target;
  //     setFlavAmt(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   };

  const handleFormChange = (e, val) => {
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

  useEffect(() => {
    getData();
  }, [rerender]);

  useEffect(() => {
    handleRemainingProd();
  }, [totalProd, rerender]);

  useEffect(() => {
    // console.log("Hey");
  }, [remainingProd, rerender2]);

  // useEffect(()=>{
  //     const getData = setTimeout(() => {
  //         const url = EditUrl
  //         axios.post(url, {
  //             totalprod: totalProd,
  //         },
  //         {
  //             headers: {
  //               'Authorization': token,
  //             }
  //         }
  //         )
  //         .then(response=>{
  //             if(response.status !== 200)
  //             {
  //                 alert("Error", response.status)
  //             }
  //             else
  //             {
  //                 // console.log('Done')
  //                 // setRerender(!rerender);
  //             }
  //         })
  //     }, 2000)

  //     return () => clearTimeout(getData)

  // }, [rerender3])

  var rp = 0;

  const getData = async () => {
    setLoaderMain(true);
    rp = remainingProd;

    // console.log(rp);
    await axios
      .post(
        BakeryData,
        {
          production_no: production_no,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        var da = JSON.parse(res.data.data.data);
        setTotalProd(res.data.data.total_prod);
        setDate(res.data.date);
        setData(da);
        setButt(res.data.data.today);
        setRed(res.data.red);
        setIsRed(res.data.isRed);
        setIsSUBMIT(res.data.isSubmit);
        setProductions(res.data.productions);

        setNewProduction(JSON.parse(res.data.data.data));

        let quant = 0;

        for (let i = 0; i < da.length; i++) {
          var val = da[i].quantity;
          let num = parseInt(val, 10);
          // console.log(num);
          quant = quant + num;
        }

        setRemainingProd(res.data.data.total_prod - quant);
      });

    await axios(BakeryTable, {
      headers: {
        Authorization: token,
      },
    }).then(async (res) => {
      // setTable(res.data);
      var col = [];

      for (let i = 0; i < res.data.length; i++) {
        var data = {
          text:
            res.data[i].perct_to_divide != null
              ? res.data[i].text + " (" + res.data[i].perct_to_divide + "%)"
              : res.data[i].text,
          dataField: res.data[i].datafield,
          editable: res.data[i].editable,
          headerAlign: "center",
          editorClasses: "editing-name",
          headerStyle: {
            fontSize: "13px",
            fontWeight: 100,
            backgroundColor: "#463B3B",
            color: "white",
            width: "100px",
          },
          validator: (newValue, row, column) => {
            if (isNaN(newValue))
              return {
                valid: false,
                message: "Please Enter Numeric Value",
              };
            if (newValue === "" || newValue === null)
              return {
                valid: false,
                message: "Field can't be left blank",
              };

            // if(rp - newValue < 0)
            // return{
            //     valid:false,
            //     message:"You don't have enough Stock"
            // }

            return true;
          },
        };
        col.push(data);
      }
      setColumns(col);
    });
    setLoaderMain(false);

    try {
      const kioskss = await axios.get(getkiosk, {
        headers: {
          Authorization: token,
        },
      });

      var kiosks = kioskss.data;

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

  const handleAfterSave = () => {
    // setLoaderMain(true);
    // console.log(data)
    var dataaa = JSON.stringify(data);
    // console.log(dataaa)

    setEData(dataaa);
    setSubmitButtShow(false);
    handleRemainingProd();
  };

  const HandleSaveButt = () => {
    if (remainingProd < 0) {
      alert("Production limit has been exceeded.");
    } else {
      setLoaderMain(true);
      const url = BakeryDataEdit;
      axios
        .post(
          url,
          {
            data: edata,
            totalprod: totalProd,
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
            // setData(response.data.data);
            setSshowWarningAlert(true);
            setRerender(!rerender);
            setSubmitButtShow(true);
            setLoaderMain(false);
          }
        });
    }
  };

  const HandleSubmitButt = () => {
    if (isred === 1) {
      alert("Please fix the highlighted row(s)!");
    } else {
      if (remainingProd < 0) {
        alert("Production limit has been exceeded.");
      } else {
        for (var i = 0; i < new_production.length; i++) {
          if (
            parseInt(new_production[i].quantity) !==
            parseInt(new_production[i].sum)
          ) {
            alert("Dounts quantity and total sum must be equal.");
            return false;
          }
        }

        setLoaderMain(true);

        const url = Submit;
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
              setSshowWarningAlert(false);
              setRerender(!rerender);
              setLoaderMain(false);
              alert(response.data.message);

              // writeUserData();
            }
          });

        const url2 = branch_Url;
        axios
          .get(url2, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            if (response.status !== 200) {
              alert("Error", response.status);
            } else {
              var list = response.data;
              // console.log(list.length)

              // for(var i = 0 ; i <= list.length; i++)

              // {
              // writeUserData(list);
              // }
            }
          });
      }
    }
  };

  function writeUserData(list) {
    var date1 = new Date().getHours();
    var date2 = new Date().getMinutes();
    var date3 = new Date().getSeconds();
    var datet = date.concat(date1, date2, date3);
    var list_cnt = list.length;

    const db = getDatabase();
    set(ref(db, "notification/" + datet), {
      date: datet,
      count: list_cnt,
      branches: list,
    });
  }

  const handleBeforeSave = () => {
    setRerender2(!rerender);
  };

  const handleTotalChange = async (event) => {
    setTotalProd(event.target.value);
    setRerender3(!rerender);

    handleRemainingProd();
  };

  const handleRemainingProd = () => {
    let quant = 0;
    for (let i = 0; i < data.length; i++) {
      var val = data[i].quantity;
      let num = parseInt(val, 10);
      quant = quant + num;
    }

    setRemainingProd(totalProd - quant);
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

  const rowStyle2 = (row, rowIndex) => {
    const style = {};

    if (submitbuttshow) {
      if (row["quantity"] != row["sum"]) {
        style.backgroundColor = "#c2172e";
        // alert('test')
      }
    }

    for (let i = 3; i < columns.length; i++) {
      // if(row[columns[i].quantity] !=row[columns[i].sum]){
      //     alert('test')
      // }
      if (
        !isNaN(row[columns[i].dataField]) &&
        row[columns[i].dataField].toString().indexOf(".") != -1 &&
        row[columns[i].dataField] != 0
      ) {
        style.backgroundColor = "#c2172e";
        style.color = "#FFF";
        // setDecimalWarning('true')
        setSshowWarningAlert(true);
      }
    }

    // if(){
    //     console.log('testtttttttttt')
    //     setSshowWarningAlert(true)
    //     setWarningMesg('Please fix decimal points')
    // }
    // else{
    //     console.log('--------------------------')
    //     setWarningMesg('Kindly submit assigned donuts')
    // }

    for (let i = 0; i < red.length; i++) {
      if (row.id === red[i]) {
        style.backgroundColor = "#c2172e";
      }
    }

    style.textAlign = "center";
    style.verticalAlign = "middle";

    return style;
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
          setSshowWarningAlert(false);
          setRerender(!rerender);
          setLoaderMain(false);
        }
      });
  };

  const handleproduction_no = (val) => {
    setProduction_no(val);
    // console.log(val)
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
        <div className="px-3 py-3">
          <div className="a">
            <h2>
              Total Production ={" "}
              <span>
                {isSubmit === 0 ? (
                  <input
                    onChange={handleTotalChange}
                    value={totalProd}
                    type="number"
                  />
                ) : (
                  totalProd
                )}
              </span>
            </h2>

            <h2>{date}</h2>
          </div>
          <div className="a">
            <h2>Remaining = {remainingProd}</h2>
            <div className="buttons">
              {isSubmit === 0 ? (
                <button
                  style={{ width: "130px" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you wish to Clear today's production?`
                      )
                    )
                      handleClear();
                  }}
                  className="pBut"
                >
                  Clear
                </button>
              ) : (
                ""
              )}

              <ToolkitProvider
                keyField="id"
                data={data}
                columns={columns}
                exportCSV={{
                  fileName: `${date}.csv`,
                }}
              >
                {(props) => (
                  <>
                    <ExportCSVButton className="pButMr0" {...props.csvProps}>
                      {" "}
                      <span>
                        <img
                          style={{
                            height: "10px",
                            marginRight: "5px",
                            marginLeft: "10px",
                          }}
                          src={download}
                          alt=""
                        />
                      </span>{" "}
                      Download
                    </ExportCSVButton>

                    <div style={{ display: "none" }}>
                      <BootstrapTable
                        style={{ display: "none" }}
                        {...props.baseProps}
                      />
                    </div>
                  </>
                )}
              </ToolkitProvider>
              {isSubmit === 0 ? (
                ""
              ) : (
                <div className="float-end">
                  <Link to="/new_production">
                    <button className="pBut">Add New Production</button>
                  </Link>
                </div>
              )}

              {/* <button style={{width:'140px'}} onClick={()=>{setMovementIsOpen(true);} } className="pBut">
                          <span>
                            <img style={{height: '10px'}} src={addmovementimg} alt="" />
                            </span>  Add Movement
                        </button> */}
            </div>
          </div>

          <div
            className="row "
            style={{
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <div className="col-2">
              <Link onClick={() => handleproduction_no("os")}>
                {production_no === "os" ? (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      backgroundColor: "rgb(70, 59, 59)",
                      height: "45px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      border: "3px solid #01A0C6",
                    }}
                  >
                    Overall Production
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      backgroundColor: "rgb(70, 59, 59)",
                      height: "45px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    Overall Production
                  </div>
                )}
              </Link>
            </div>

            {[...Array(productions)].map((x, i) => (
              <div key={i} className="col-2">
                <Link onClick={() => handleproduction_no(i + 1)}>
                  {production_no === i + 1 ? (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "#FF8AA5",
                        height: "45px",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        border: "2px solid rgb(70, 59, 59)",
                      }}
                    >
                      Production {i + 1}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "#FF8AA5",
                        height: "45px",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Production {i + 1}
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {showwarningalert ? (
            <div className="alert alert-danger " role="alert">
              {warningmesg}
            </div>
          ) : (
            ""
          )}

          <div className="table">
            {columns.length === 0 ? (
              "Hello"
            ) : data.length === 0 ? (
              "Hello"
            ) : (
              <BootstrapTable
                id="toCsv"
                keyField="id"
                data={data}
                columns={columns}
                striped
                hover
                condensed
                rowStyle={rowStyle2}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  beforeSaveCell: handleBeforeSave,
                  afterSaveCell: handleAfterSave,

                  // nonEditableRows: () => [1, 2, 3],
                })}
              />
            )}
          </div>

          {
            isSubmit === 0 ? (
              <div className="float-end">
                {submitbuttshow === true ? (
                  " "
                ) : butt === 1 ? (
                  <button
                    onClick={() => {
                      HandleSaveButt();
                    }}
                    className="pBut"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      HandleSaveButt();
                    }}
                    className="pBut"
                  >
                    Assign
                  </button>
                )}

                {submitbuttshow === true ? (
                  <button
                    onClick={() => {
                      HandleSubmitButt();
                    }}
                    className="pBut"
                  >
                    Submit
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )
            //   <div className="float-end">
            //     <Link to="/new_production" >
            //     <button className="pBut">
            //         Add New Production
            //     </button>
            //     </Link>
            //   </div>
          }

          <Modal
            show={movementisopen}
            onHide={() => {
              setMovementIsOpen(false);
            }}
            size="lg"
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
                          {kis.flavour_name} ({kis.production - kis.sold})
                        </p>
                      </div>
                      <div className="col-6">
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Control
                            value={flavamt[kis.flavour_name]}
                            name={kis.flavour_name}
                            type="number"
                            placeholder="Enter amount or leave empty for no movement"
                            onChange={(event) => {
                              handleFormChange(
                                event,
                                kis.production - kis.sold
                              );
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
      </>
    );
  }
}
