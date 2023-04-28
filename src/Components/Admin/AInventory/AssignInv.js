import React, { useEffect, useState } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import { json, Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import backk from "../../../Assets/Dashboard_SVGs/back.svg";
import { useLocation } from "react-router-dom";

var Url = axiosURL.Requestable_get;
var dataURL = axiosURL.Kiosk;
var AddInv = axiosURL.DailyInventoryAdd;
var GetCategoryUrl = axiosURL.GetItemsCategory;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function AssignInv() {
  //   constructor(props){
  //     super(props);
  //     this.state={
  //         value:this.props.location.state,
  //     }

  // }

  const [rerender, setRerender] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("Select Branch");
  const [inputFields, setInputFields] = useState([]);

  const [itemcategory, setItemCategory] = useState([]);
  // const [inputFields, setInputFields] = useState([
  //   {item: 'Box of 1', quantity:localStorage.getItem('Box of 1')?localStorage.getItem('Box of 1'):'0', disabled:true},
  //   {item: 'Box of 2', quantity:localStorage.getItem('Box of 2')?localStorage.getItem('Box of 2'):'0', disabled:true},
  //   {item: 'Box of 6', quantity: localStorage.getItem('Box of 6')?localStorage.getItem('Box of 6'):'0', disabled:true},
  //   {item: 'Box of 9', quantity: localStorage.getItem('Box of 9')?localStorage.getItem('Box of 9'):'0', disabled:true},
  //   {item: 'Box of 12', quantity: localStorage.getItem('Box of 12')?localStorage.getItem('Box of 12'):'0', disabled:true},
  //   {item: 'Bag of 6', quantity: localStorage.getItem('Box of 6')?localStorage.getItem('Box of 6'):'0', disabled:true},
  //   {item: 'Bag of 9', quantity: localStorage.getItem('Box of 9')?localStorage.getItem('Box of 9'):'0', disabled:true},
  //   {item: 'Bag of 12', quantity: localStorage.getItem('Box of 12')?localStorage.getItem('Box of 12'):'0', disabled:true},
  // ])
  const [loadermain, setLoaderMain] = useState(true);

  const { state } = useLocation();
  // console.log('testststss3232323')
  // console.log(localStorage.getItem('Bag of 12'))
  // console.log('testststss3232323')

  useEffect(() => {
    getData();
    GetItemsApi();
    GetCategoryApi();
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

  const GetItemsApi = () => {
    const url = Url;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // setCategory(response.data)

        var res = response.data;
        console.log("##############");
        console.log(res);
        var data = [];
        data["new items"] = [];
        Object.keys(res).map((category) => {
          var cate = [];
          res[category].map((item) => {
            cate.push({
              item: item.Item_Name,
              quantity: 0,
              category: item.category_name,
              disabled: true,
            });
          });

          data[category] = cate;
        });

        setInputFields(data);
        // response.data.map((value)=>{
        //   console.log({item: value.Item_Name, quantity: '0', disabled:true})
        // })
        // console.log(response)
      });
  };

  const handleLocChange = (e) => {
    setSelected(e.target.value);
    setRerender(!rerender);
  };

  // const handleFormChange = (index, event) => {
  //     let data = [...inputFields];
  //     data[index][event.target.name] = event.target.value;
  //     setInputFields(data);
  // }

  const handleFormChange = (categoryIndex, inputIndex, event) => {
    const { name, value } = event.target;

    setInputFields((prevState) => {
      // Create a copy of the inputFields object
      const newInputFields = { ...prevState };

      // Create a copy of the specific category array
      const newCategory = [...prevState[categoryIndex]];

      // Update the specific input field
      newCategory[inputIndex][name] = value;

      // Update the specific category array in the newInputFields object
      newInputFields[categoryIndex] = newCategory;

      // Return the updated inputFields object
      return newInputFields;
    });
  };

  const addFields = () => {
    // let newfield = { item: '', quantity: '',disabled:false }
    // console.log("++++++++++++")
    // console.log(inputFields[0])
    // setInputFields([...inputFields, newfield])
    // if ('new items' in inputFields) {
    const updatedInputs = [
      ...inputFields["new items"],
      { item: "", quantity: 0, category: "", disabled: false },
    ];
    const updatedInputFields = { ...inputFields, ["new items"]: updatedInputs };
    setInputFields(updatedInputFields);
    // } else {
    //   console.log('key1 does not exist in obj');
    // }
  };

  const handleSubmit = async () => {
    // if(selected === 'Select Branch')
    //   {
    //     alert("Kiosk Is Required")
    //   }

    // inputFields['new items'].map((value)=>{
    //   if(value.item && value.quantity !=="" && value.category==''){
    //     alert('Category is required')
    //   }
    //   else if(value.item && value.quantity ==="" && value.category!==''){
    //     alert('Quantity is required')
    //   }
    //   else if(value.item==='' && value.quantity !=="" && value.category!==''){
    //     alert('item name is required')
    //   }
    //   else if(value.item){
    //     alert('quantity and category is required')
    //   }
    //   else if(value.quantity){
    //     alert('item name and category is required')
    //   }
    // })
    // console.log(inputFields)
    // return

    if (selected === "Select Branch") {
      alert("Kiosk Is Required");
    } else {
      var clear = true;
      inputFields["new items"].map((value) => {
        if (value.item && value.quantity !== "" && value.category == "") {
          alert("Category is required");
          clear = false;
          return;
        } else if (
          value.item &&
          value.quantity === "" &&
          value.category !== ""
        ) {
          alert("Quantity is required");
          clear = false;
          return;
        } else if (
          value.item === "" &&
          value.quantity !== "" &&
          value.category !== ""
        ) {
          alert("item name is required");
          clear = false;
          return;
        } else if (value.item) {
          alert("quantity and category is required");
          clear = false;
          return;
        } else if (value.quantity) {
          alert("item name and category is required");
          clear = false;
          return;
        }
      });
      if (!clear) {
        return;
      }

      setLoaderMain(true);

      try {
        const keys = Object.keys(inputFields);
        var data = [];
        keys.forEach((element) => {
          inputFields[element].forEach((next) => {
            data.push(next);
          });
        });
        const response = await axios.post(
          AddInv,
          {
            data: JSON.stringify(data),
            kiosk: selected,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        var res = response.data;
        console.log("____________________________-");
        console.log(res);

        // console.log(res);

        // setInputFields([
        //   {item: 'Box of 1', quantity: '0', disabled:true},
        //   {item: 'Box of 2', quantity: '0', disabled:true},
        //   {item: 'Box of 6', quantity: '0', disabled:true},
        //   {item: 'Box of 9', quantity: '0', disabled:true},
        //   {item: 'Box of 12', quantity: '0', disabled:true},
        //   {item: 'Bag of 6', quantity: '0', disabled:true},
        //   {item: 'Bag of 9', quantity: '0', disabled:true},
        //   {item: 'Bag of 12', quantity: '0', disabled:true},
        // ])

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

  const GetCategoryApi = () => {
    const url = GetCategoryUrl;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setItemCategory(response.data);
        // category.map((value)=>{
        //   console.log(value)
        // })
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
            <div style={{ display: "flex" }}>
              <Link to={"/inventory"}>
                <h4>
                  <img style={{ marginRight: "10px" }} src={backk} alt="" />
                </h4>
              </Link>
              <h4 style={{ color: "#463B3B" }}>Assign Accessories</h4>
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
            {/* {
            Object.keys(inputFields).map((category,categoryindex) => {
            
            return <div style={{marginTop:'10px'}} className="row">
              <p>{category}</p>
              {
              inputFields[category].map((input,index) => {
              
                return (
                  <div key={index} className="col-6">
                  <div className="cucard">
                      <div style={{width:"48%"}}>
                          <input  type="text" disabled={input.disabled} placeholder='Item' className="form-control" name='item' value={input.item} onChange={event => handleFormChange(categoryindex,index, event)} />
                      </div>
                      <div style={{width:"48%", marginLeft:'20px'}}>
                          <input  type="number" placeholder='Quantity' className="form-control" name='quantity' value={input.quantity} onChange={event => handleFormChange(index, event)} />
                      </div>
                  </div>
                </div>
              )
                })
              } </div> 
            
            
            
            
              
          
            })
          } */}

            {Object.keys(inputFields).map((category, categoryIndex) => {
              return (
                <div
                  key={categoryIndex}
                  style={{ marginTop: "10px" }}
                  className="row"
                >
                  <p>{category}</p>
                  {inputFields[category].map((input, inputIndex) => {
                    return (
                      <div key={inputIndex} className="col-6">
                        <div className="cucard">
                          <div style={{ width: "48%" }}>
                            <input
                              type="text"
                              placeholder="Item"
                              className="form-control"
                              name="item"
                              value={input.item}
                              disabled={input.disabled}
                              onChange={(event) =>
                                handleFormChange(category, inputIndex, event)
                              }
                            />
                          </div>
                          <div style={{ width: "48%", marginLeft: "20px" }}>
                            <input
                              type="number"
                              placeholder="Quantity"
                              className="form-control"
                              name="quantity"
                              value={input.quantity}
                              onChange={(event) =>
                                handleFormChange(category, inputIndex, event)
                              }
                            />
                          </div>
                          {category === "new items" && (
                            <div style={{ width: "48%", marginLeft: "20px" }}>
                              <select
                                className="form-control"
                                name="category"
                                onChange={(event) =>
                                  handleFormChange(category, inputIndex, event)
                                }
                              >
                                <option>Select Category</option>
                                {itemcategory.map((value) => {
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
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* {inputFields.map((input, index) => {
                return (
                    <div key={index} className="col-6">
                    <div className="cucard">
                        <div style={{width:"48%"}}>
                            <input  type="text" disabled={input.disabled} placeholder='Item' className="form-control" name='item' value={input.item} onChange={event => handleFormChange(index, event)} />
                        </div>
                        <div style={{width:"48%", marginLeft:'20px'}}>
                            <input  type="number" placeholder='Quantity' className="form-control" name='quantity' value={input.quantity} onChange={event => handleFormChange(index, event)} />
                        </div>
                    </div>
                </div>
                )
                })} */}
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
