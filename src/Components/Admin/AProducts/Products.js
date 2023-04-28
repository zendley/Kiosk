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

import Select from "react-select";
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

var Url = axiosURL.Products;
var AddUrl = axiosURL.AddProducts;
var addCategory = axiosURL.AddCategory;
var adddeal = axiosURL.AddDeal;
var getdeal = axiosURL.GetDeal;
var EditUrl = axiosURL.EditProducts;
var DeleteUrl = axiosURL.DeleteProducts;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Products() {
  const [rerender, setRerender] = useState(false);
  const [table, setTable] = useState([]);
  const [editisopen, setEditIsOpen] = useState(false);
  const [addisopen, setAddtIsOpen] = useState(false);

  const [editdata, setEditData] = useState([]);
  const [editimage, setEditImage] = useState([]);
  const [editindex, setEditIndex] = useState([]);
  const [adddata, setAddData] = useState([]);
  const [addcategorydata, setAddCategoryData] = useState([]);
  const [addimage, setAddImage] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  const [addcategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState([]);

  const [isProduction, setIsProduction] = useState(false);

  const [isDealOpen, setIsDealOpen] = useState(false);

  const [dealData, setDealData] = useState({ items: [] });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  const [selectData, setSelectData] = useState([]);
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
      var cate_option = [];
      Object.entries(response.data.categories).map((val) => {
        cate_option.push({ value: val[1], label: val[1] });
      });

      setCategoryOptions(cate_option);

      var res = response.data.data;
      setTable(res);
      setCategory(response.data.categories);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCategory = (e) => {
    const { name, value } = e.target;
    setAddCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDeal = (e) => {
    const { name, value } = e.target;
    setDealData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const hadleEditModel = (index) => {
    setEditData((prevState) => ({
      ...prevState,
      dName: table.length !== 0 ? table[index].product_name : "",
      price: table.length !== 0 ? table[index].price : "",
      desc: table.length !== 0 ? table[index].description : "",
      image: table.length !== 0 ? table[index].picture : "",
      // percentage: table.length !== 0 ? table[index].perct_to_divide : "",
      percentage: table.length !== 0 ? table[index].perct_to_divide : "",
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

  const handleImageAdd = (e) => {
    // console.log(e.target.files)
    setAddImage(e.target.files[0]);
  };

  const handleImageEdit = (e) => {
    // console.log(e.target.files)
    setEditImage(e.target.files[0]);
  };

  const handleCheckboxChange = () => {
    setIsProduction(!isProduction);
  };

  const handleChangeCategory = (e) => {
    setSelectData((prevState) => ({
      ...prevState,
      category: e,
    }));
    var prod_option = [];
    // e.forEach(element => {

    for (const key in category) {
      if (category[key] === e.value) {
        table.map((val) => {
          if (val.product_category === key) {
            prod_option.push({
              value: val.product_name,
              label: val.product_name,
            });
          }
        });
      }
    }
    // });

    setProductOptions(prod_option);
  };

  const handleProductChange = (e) => {
    setSelectData((prevState) => ({
      ...prevState,
      products: e,
    }));
  };

  const handleAddItem = () => {
    var products = [];
    selectData.products.forEach((element) => {
      products.push(element.value);
    });

    const newitem = {
      category: selectData.category.value,
      products: products,
      quantity: 0,
    };

    setDealData((prevState) => ({
      ...prevState,
      items: [...prevState.items, newitem],
    }));

    setSelectData({ category: null, products: null });
  };

  const handleQuantityChange = (index, quantity) => {
    // Create a copy of the dealdata array using the spread operator
    setDealData((prevState) => {
      const updatedDealData = { ...prevState };

      const itemToUpdate = updatedDealData.items[index];

      itemToUpdate.quantity = quantity;

      return updatedDealData;
    });
  };

  const AddApi = () => {
    // api Logic Here

    setLoaderMain(true);

    if (!adddata.dName) {
      alert("Donut Name is Required");
    } else if (!adddata.price) {
      alert("Price is Required");
    } else if (!adddata.desc) {
      alert("Description is Required");
    } else if (!addimage) {
      alert("Image is Required");
    }
    // else if (!adddata.percentage){
    //     alert("Percentage to Divide is Required")
    // }
    else {
      setLoaderMain(true);

      let data = new FormData();
      data.append("product_name", adddata.dName);
      data.append("description", adddata.desc);
      data.append("price", adddata.price);
      // data.append('perct_to_divide', adddata.percentage);
      data.append("category", adddata.category);
      data.append("picture", addimage);

      const url = AddUrl;
      axios
        .post(url, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            alert("Error", response.status);
          } else {
            setTest(true);
            setMessage("Product Added");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            setAddtIsOpen(false);
            setAddData([]);
            setRerender(!rerender);
          }
        });
    }
    setLoaderMain(false);
  };

  const AddCategoryApi = () => {
    if (
      addcategorydata.categoryName === undefined ||
      addcategorydata.categoryName === ""
    ) {
      alert("Category Name is Required");
      return;
    } else {
      setLoaderMain(true);

      let data = new FormData();
      data.append("category_name", addcategorydata.categoryName);
      data.append("isProduction", isProduction);

      const url = addCategory;
      axios
        .post(url, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert("Error", response.status);
          } else {
            setTest(true);
            setMessage("Category Added");
            setTimeout(function () {
              setTest(false);
            }, 3000);
            alert(response.data.message);
            setLoaderMain(false);

            if (response.data.message !== "Category already exists.") {
              setAddCategory(false);
              setAddCategoryData([]);
              setRerender(!rerender);
              setAddtIsOpen(true);
            }
          }
        });
    }
  };

  const AddDealApi = () => {
    var data = dealData;

    if (!data.name) {
      alert("Deal Name is required");
    } else if (!data.price || data.price == 0) {
      alert("Deal price is required");
    } else if (!data.items.length) {
      alert("Atleast one item is required");
    } else {
      var isClear = true;
      data.items.forEach((element) => {
        if (!element.quantity || element.quantity === 0) {
          alert("item quantity must be greater then 0");
          isClear = false;
          return;
        }
      });
      if (!isClear) {
        return;
      }
      setLoaderMain(true);

      const url = adddeal;

      axios
        .post(url, dealData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            alert("Error", response.status);
          } else {
            if (response.data.message === "Deal already exists") {
              alert(response.data.message);
            } else {
              setTest(true);
              setMessage("New deal Added Succefully");
              setTimeout(function () {
                setTest(false);
              }, 3000);
              alert(response.data.message);
              setIsDealOpen(false);
              setDealData({ items: [] });
            }
          }
        });

      setLoaderMain(false);
    }
  };

  const GetDealApi = () => {
    const url = getdeal;
    axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
  };

  const EditApi = (id) => {
    // api Logic Here

    setLoaderMain(true);

    if (!adddata.dName) {
      alert("Donut Name is Required");
    } else if (!adddata.price) {
      alert("Price is Required");
    } else if (!adddata.desc) {
      alert("Description is Required");
    }
    // else if (!adddata.percentage){
    //     alert("Percentage to Divide is Required")
    // }
    else {
      let data = new FormData();
      data.append("product_name", editdata.dName);
      data.append("description", editdata.desc);
      data.append("price", editdata.price);
      // data.append('perct_to_divide', editdata.percentage);
      data.append("category", adddata.category);
      data.append("picture", editimage);

      const url = EditUrl + `/${id}`;
      axios
        .post(url, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert("Error", response.status);
          } else {
            setEditIsOpen(false);
            setEditData([]);
            setRerender(!rerender);
          }
        });
    }
    setLoaderMain(false);
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
          setMessage("Product Deleted Succesfully");
          setTimeout(function () {
            setTest(false);
          }, 3000);
          setRerender(!rerender);
        }
      });
  };

  const headers = [
    { label: "Donut Name", key: "product_name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "Price" },
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
            <h4 style={{ color: "#463B3B" }}>Deals</h4>
            <div className="buttons">
              {/* <CSVLink style={{padding: '6.5px 35px',}} {...csvReport} className="b1">Download</CSVLink> */}
              <button
                style={{
                  width: "175px",
                }}
                className="b2"
              >
                <Link
                  style={{ all: "unset", cursor: "pointer" }}
                  to=""
                  onClick={() => {
                    setIsDealOpen(true);
                  }}
                >
                  Add New Deal
                </Link>
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                {/* <th></th> */}
                <th>Deal Name</th>
                <th>Price</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {/* {table.map((tabl, index)=>{
          return(
          <tr key={tabl.id}>
            <td><img style={{width: '50px'}} src={'https://dwf.walnuthash.com/public/uploads/products/' + tabl.picture} alt={`Product`}  className="img-responsive" /></td>
            <td>{tabl.product_name}</td>
            <td>{tabl.description}</td>
            <td>{tabl.price}</td>
            <td>
            <Link style={{all: 'unset', cursor: 'pointer'}} to="/products" onClick={()=>{hadleEditModel(index); setEditIndex(index);}} ><img src={edit} alt="" /> </Link>
                
            <Link style={{all: 'unset', cursor: 'pointer'}} to="/products" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteApi(tabl.id);}} > <img src={deletee} alt="" /> </Link>
              </td>
          </tr>
          );
        })} */}
            </tbody>
          </table>
        </div>
        <div className="kiosk">
          <div className="top">
            <h4 style={{ color: "#463B3B" }}>Products</h4>
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
                  to="/products"
                  onClick={() => {
                    setAddtIsOpen(true);
                  }}
                >
                  Add New Product{" "}
                </Link>
              </button>
            </div>
          </div>

          <table className="tablee">
            <thead>
              <tr>
                {/* <th></th> */}
                <th>Product Image</th>
                <th>Donut Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    <td>
                      <img
                        style={{ width: "50px" }}
                        src={
                          "https://dwf.walnuthash.com/public/uploads/products/" +
                          tabl.picture
                        }
                        alt={`Product`}
                        className="img-responsive"
                      />
                    </td>
                    <td>{tabl.product_name}</td>
                    <td>{tabl.description}</td>
                    <td>{tabl.price}</td>
                    <td>
                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/products"
                        onClick={() => {
                          hadleEditModel(index);
                          setEditIndex(index);
                        }}
                      >
                        <img src={edit} alt="" />{" "}
                      </Link>

                      <Link
                        style={{ all: "unset", cursor: "pointer" }}
                        to="/products"
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
              zIndex: "9999999999999999999999999999999999999",
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
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Donut Name</Form.Label>
                <Form.Control
                  value={adddata.dName}
                  name="dName"
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
                  id="cars"
                  value={adddata.category}
                  onChange={handleAddChange}
                >
                  <option>Select Category</option>
                  {Object.entries(category).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price(PKR)</Form.Label>
                <Form.Control
                  value={adddata.price}
                  name="price"
                  type="number"
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Description{" "}
                  <span
                    style={{
                      color: "gray",
                      fontSize: "10px",
                      fontWeight: "100",
                    }}
                  >
                    Only 500 characters
                  </span>
                </Form.Label>
                <Form.Control
                  maxLength={500}
                  as="textarea"
                  value={adddata.desc}
                  name="desc"
                  rows={3}
                  onChange={handleAddChange}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Percentage to divide</Form.Label>
            <Form.Control
              value={adddata.percentage}
              name="percentage"
              type="number"
              onChange={handleAddChange}
            />
          </Form.Group> */}

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageAdd}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <div>
              <Button
                style={{
                  background: "linear-gradient(180deg, #01a0c6, #015063)",
                  border: "none",
                }}
                onClick={() => {
                  setAddCategory(true);
                  setAddtIsOpen(false);
                }}
              >
                Add Category
              </Button>
            </div>
            <div>
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
                  marginLeft: "10px",
                }}
                onClick={() => {
                  AddApi();
                }}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          show={addcategory}
          onHide={() => {
            setAddCategory(false);
            setAddtIsOpen(true);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  value={addcategorydata.categoryName}
                  name="categoryName"
                  type="text"
                  onChange={handleAddCategory}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Bakery Production</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    // value={addcategorydata.categoryName}
                    name="categoryName"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />{" "}
                  <Form.Label style={{ paddingLeft: "5px" }}>
                    This item produced by bakery?
                  </Form.Label>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddCategory(false);
                setAddtIsOpen(true);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#FF8AA5", border: "none" }}
              onClick={() => {
                AddCategoryApi();
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
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Donut Name</Form.Label>
                <Form.Control
                  value={editdata.dName}
                  name="dName"
                  type="text"
                  onChange={handleEditChange}
                  disabled
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
                  id="cars"
                  value={adddata.category}
                  onChange={handleAddChange}
                >
                  <option>Select Category</option>
                  {Object.entries(category).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price(PKR)</Form.Label>
                <Form.Control
                  value={editdata.price}
                  name="price"
                  type="number"
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Description{" "}
                  <span
                    style={{
                      color: "gray",
                      fontSize: "10px",
                      fontWeight: "100",
                    }}
                  >
                    Only 500 characters
                  </span>
                </Form.Label>
                <Form.Control
                  maxLength={500}
                  as="textarea"
                  value={editdata.desc}
                  name="desc"
                  rows={3}
                  onChange={handleEditChange}
                />
              </Form.Group>
              {/* 
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Percentage to divide</Form.Label>
            <Form.Control
              value={editdata.percentage}
              name="percentage"
              type="number"
              onChange={handleEditChange}
            />
          </Form.Group> */}

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleImageEdit}
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

        {/* models for deals */}

        <Modal
          show={isDealOpen}
          onHide={() => {
            setIsDealOpen(false);
          }}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deal Name</Form.Label>
                <Form.Control
                  value={dealData.name}
                  name="name"
                  type="text"
                  onChange={handleAddDeal}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deal Price</Form.Label>
                <Form.Control
                  value={dealData.price}
                  name="price"
                  type="number"
                  onChange={handleAddDeal}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deal Category</Form.Label>

                <Select
                  value={selectData.category}
                  name="category"
                  options={categoryOptions}
                  onChange={handleChangeCategory}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deal Products</Form.Label>

                <Select
                  isMulti
                  value={selectData.products}
                  options={productOptions}
                  onChange={handleProductChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <Form.Label>Add to deal</Form.Label> */}

                <button
                  class=""
                  type="button"
                  style={{
                    background: "linear-gradient(180deg, #01a0c6, #015063)",
                    border: "none",
                    color: "#FFF",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                  onClick={handleAddItem}
                >
                  add
                </button>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Deal Items</Form.Label>
                <div>
                  {
                    dealData.items.map((value, index) => {
                      return (
                        <div className="row" style={{ marginBottom: "10px" }}>
                          <div className="col-3">
                            <p style={{ fontSize: "13px" }}>{value.category}</p>
                          </div>
                          <div className="col-5">
                            {value.products.map((prod) => {
                              return (
                                <p style={{ fontSize: "13px", margin: "0" }}>
                                  {prod}
                                </p>
                              );
                            })}
                          </div>
                          <div className="col-4">
                            <Form.Control
                              value={value.quantity}
                              type="number"
                              onChange={(event) =>
                                handleQuantityChange(index, event.target.value)
                              }
                            />
                          </div>
                        </div>
                      );
                    })
                    // dealData.items.forEach(element => {
                    //   console.log(element)
                    // })

                    // console.log('test',dealData)
                    // dealData.items.map(item => {
                    //   console.log(item.category + ': ' + item.product);
                    // })
                  }
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setIsDealOpen(false);
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
                AddDealApi();
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
