import "./Adash.css";

import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";
import micon from "../../../Assets/Dashboard_SVGs/DashIcon.svg";

var Url = axiosURL.Dashboard;
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Adash() {
  const [rerender, setRerender] = useState(false);
  const [maindata, setMainData] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  useEffect(() => {
    getData();
  }, [rerender]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getData = async (e) => {
    setLoaderMain(true);
    try {
      const response = await axios.get(Url, {
        headers: {
          Authorization: token,
        },
      });

      var res = response.data;

      setMainData(res);

      console.log(res);
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

      console.log(err);
    }
  };

  const data = [
    { name: "Sold", value: maindata.Daily_sale },
    { name: "leftOver", value: maindata.Daily_leftover },
  ];
  const COLORS = ["#01A0C6", "#463B3B"];

  const data2 = [
    { name: "Kiosk Sales", value: maindata.overall_kiosk },
    { name: "Food Panda Sales", value: maindata.overall_foodpanda },
    { name: "Online Sales", value: maindata.overall_online },
  ];
  const COLORS2 = ["#01A0C6", "#2A3133", "#949798"];

  const data3 = maindata.top_four_flavs;

  const data4 = [
    {
      name: "Jan",
      sold: maindata.jan_overall_sale,
      leftover: maindata.jan_overall_leftover,
    },
    {
      name: "Feb",
      sold: maindata.feb_overall_sale,
      leftover: maindata.feb_overall_leftover,
    },
    {
      name: "March",
      sold: maindata.march_overall_sale,
      leftover: maindata.march_overall_leftover,
    },
    {
      name: "April",
      sold: maindata.april_overall_sale,
      leftover: maindata.april_overall_leftover,
    },
    {
      name: "May",
      sold: maindata.may_overall_sale,
      leftover: maindata.may_overall_leftover,
    },
    {
      name: "June",
      sold: maindata.june_overall_sale,
      leftover: maindata.june_overall_leftover,
    },
    {
      name: "July",
      sold: maindata.july_overall_sale,
      leftover: maindata.july_overall_leftover,
    },
    {
      name: "Aug",
      sold: maindata.aug_overall_sale,
      leftover: maindata.aug_overall_leftover,
    },
    {
      name: "Sept",
      sold: maindata.sept_overall_sale,
      leftover: maindata.sept_overall_leftover,
    },
    {
      name: "Oct",
      sold: maindata.oct_overall_sale,
      leftover: maindata.oct_overall_leftover,
    },
    {
      name: "Nov",
      sold: maindata.nov_overall_sale,
      leftover: maindata.nov_overall_leftover,
    },
    {
      name: "Dec",
      sold: maindata.dec_overall_sale,
      leftover: maindata.dec_overall_leftover,
    },
  ];

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
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="dashcard1">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex"
                >
                  <p>Top Selling Items</p>
                  <span>
                    <img src={micon} alt="" />
                  </span>
                </div>
                <div>
                  <h5>{maindata.Top_selling_item}</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "4px 9px",
                      borderRadius: "25px",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        marginBottom: "0px",
                      }}
                    >
                      {maindata.Top_selling_item_sold} Sold
                    </p>
                  </div>
                  <h6
                    style={{
                      marginBottom: "0px",
                      alignSelf: "center",
                      marginRight: "10px",
                      fontWeight: "300",
                      fontSize: "25px",
                    }}
                  >
                    Monthly
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="dashcard1">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex"
                >
                  <p>Total Daily Sale</p>
                  <span>
                    <img src={micon} alt="" />
                  </span>
                </div>
                <div>
                  <h5>
                    Rs{" "}
                    {maindata.Total_daily_sale.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "4px 9px",
                      borderRadius: "25px",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        marginBottom: "0px",
                      }}
                    >
                      {maindata.Total_daily_sale_sold} Sold
                    </p>
                  </div>
                  <h6
                    style={{
                      marginBottom: "0px",
                      alignSelf: "center",
                      marginRight: "10px",
                      fontWeight: "300",
                      fontSize: "25px",
                    }}
                  >
                    Daily
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="dashcard1">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex"
                >
                  <p>Total Weekly Sale</p>
                  <span>
                    <img src={micon} alt="" />
                  </span>
                </div>
                <div>
                  <h5>
                    Rs{" "}
                    {maindata.Total_weekly_sale.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "4px 9px",
                      borderRadius: "25px",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        marginBottom: "0px",
                      }}
                    >
                      {maindata.Total_weekly_sale_sold} Sold
                    </p>
                  </div>
                  <h6
                    style={{
                      marginBottom: "0px",
                      alignSelf: "center",
                      marginRight: "10px",
                      fontWeight: "300",
                      fontSize: "25px",
                    }}
                  >
                    Weekly
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="dashcard1">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex"
                >
                  <p>Total Month Sale</p>
                  <span>
                    <img src={micon} alt="" />
                  </span>
                </div>
                <div>
                  <h5>
                    Rs{" "}
                    {maindata.Total_monthly_sale.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "4px 9px",
                      borderRadius: "25px",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        marginBottom: "0px",
                      }}
                    >
                      {maindata.Total_monthly_sale_sold} Sold
                    </p>
                  </div>
                  <h6
                    style={{
                      marginBottom: "0px",
                      alignSelf: "center",
                      marginRight: "10px",
                      fontWeight: "300",
                      fontSize: "25px",
                    }}
                  >
                    Monthly
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="dashcard2">
                <p style={{ textAlign: "center" }} class="heading_text">
                  Overall Daily Sale
                </p>

                <div className="row">
                  <div style={{ textAlign: "center" }} className="col-6">
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontWeight: "500",
                      }}
                    >
                      {maindata.Daily_sale}
                    </p>
                    <p style={{ margin: "0px", padding: "0px" }}>sold</p>
                  </div>

                  <div style={{ textAlign: "center" }} className="col-6">
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontWeight: "500",
                      }}
                    >
                      {maindata.Daily_leftover}
                    </p>
                    <p style={{ margin: "0px", padding: "0px" }}>Leftover</p>
                  </div>
                </div>

                <div>
                  <PieChart width={250} height={155}>
                    <Pie
                      data={data}
                      cx={165}
                      cy={80}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={0}
                      outerRadius={70}
                      fill="#8884d8"
                      // paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    marginLeft: "90px",
                    marginRight: "90px",
                    marginTop: "10px",
                  }}
                  className="d-flex"
                >
                  <p style={{ margin: "0px", padding: "0px" }}>
                    <span
                      style={{ backgroundColor: "#01a0c6" }}
                      className="dot"
                    ></span>{" "}
                    Sold
                  </p>
                  <p style={{ margin: "0px", padding: "0px" }}>
                    <span
                      style={{ backgroundColor: "#463B3B" }}
                      className="dot"
                    ></span>{" "}
                    Leftover
                  </p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="dashcard2">
                <p class="heading_text">Overall Sales Analysis</p>

                <div className="row">
                  <div
                    style={{ paddingLeft: "60px", alignSelf: "center" }}
                    className="col-6"
                  >
                    <div>
                      <p style={{ margin: "0px", padding: "0px" }}>
                        <span
                          style={{ backgroundColor: "#01a0c6" }}
                          className="dot"
                        ></span>{" "}
                        Kiosk Sales
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: "0px", padding: "0px" }}>
                        <span
                          style={{ backgroundColor: "#463B3B" }}
                          className="dot"
                        ></span>{" "}
                        FoodPanda Sales
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: "0px", padding: "0px" }}>
                        <span
                          style={{ backgroundColor: "#949798" }}
                          className="dot"
                        ></span>{" "}
                        Online Sales
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div>
                      <PieChart width={400} height={210}>
                        <Pie
                          data={data2}
                          cx={100}
                          cy={100}
                          innerRadius={0}
                          outerRadius={90}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          fill="#8884d8"
                          // paddingAngle={5}
                          dataKey="value"
                        >
                          {data2.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS2[index % COLORS2.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div style={{ textAlign: "center" }} className="dashcard2">
                <p class="heading_text">Best Performer</p>
                <p style={{ fontSize: "10px", fontweight: "100" }}>This Week</p>

                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "900",
                    }}
                  >
                    {maindata.bestSeller.length > 15
                      ? maindata.bestSeller.substring(0, 15) + "..."
                      : maindata.bestSeller}
                  </p>
                </div>

                <div style={{ marginBottom: "2rem" }} className="row">
                  <div className="col-6">
                    <p
                      style={{
                        fontSize: "20px",
                        margin: "0px",
                        padding: "0px",
                        fontWeight: "500",
                        color: "#01566A",
                      }}
                    >
                      {maindata.bestSeller_sold}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      sold
                    </p>
                  </div>
                  <div className="col-6">
                    <p
                      style={{
                        fontSize: "20px",
                        margin: "0px",
                        padding: "0px",
                        fontWeight: "500",
                        color: "#01566A",
                      }}
                    >
                      {maindata.bestSeller_leftover}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      Leftover
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "0px",
                      padding: "0px",
                      fontWeight: "500",
                    }}
                  >
                    Rs{" "}
                    {maindata.bestSeller_total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p
                    style={{ fontSize: "16px", margin: "0px", padding: "0px" }}
                  >
                    Sales this week
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="dashcard3">
                <p
                  class="heading_text"
                  style={{
                    marginBottom: "0.5rem",

                    textAlign: "center",
                  }}
                >
                  Top Selling Flavours
                </p>

                {maindata.top_four_flavs.map((tabl, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          textAlign: "-webkit-center",
                        }}
                      >
                        <div
                          style={{
                            width: "95%",
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow:
                              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{
                                marginBottom: "0px",
                              }}
                            >
                              {tabl.name}
                            </p>
                            <p
                              style={{
                                marginBottom: "0px",
                              }}
                            >
                              {tabl.Sales}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-8">
              <div className="dashcard3">
                <p class="heading_text" style={{ textAlign: "center" }}>
                  Monthly Sales Chart
                </p>
                <div>
                  <BarChart width={740} height={250} data={data4}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sold" fill="#01566A" />
                    <Bar dataKey="leftover" fill="#463B3B" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
