import React, { useState, useEffect, useRef } from "react";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

import loader from "../../../Assets/Dashboard_SVGs/Spinner.gif";

var Notification = axiosURL.Notifications;
var ReadNotification = axiosURL.ReadNotifications;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function Notifications(props) {
  const [table, setTable] = useState([]);
  const [loadermain, setLoaderMain] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const handleNotification = () => {
    setLoaderMain(true);

    const url = ReadNotification;
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
          // setTable(response.data);
          props.getUnreadNoti(token);
          setLoaderMain(false);

          // console.log(response.data)
        }
      });
  };

  const getData = () => {
    setLoaderMain(true);

    const url = Notification;
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
          setTable(response.data);
          setLoaderMain(false);

          // console.log(response.data)
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
        <div style={{ marginTop: "10px" }} className="kiosk">
          <div style={{ textAlignLast: "center" }} className="top">
            <h4 style={{ color: "#463B3B" }}>Notifications</h4>

            {props.NoUnReadNoti ? (
              <button
                onClick={handleNotification}
                className="pButMr0"
                style={{ marginRight: "15px" }}
              >
                read all
              </button>
            ) : (
              ""
            )}
          </div>

          <table className="tablee" id="notification-table">
            <thead>
              <tr>
                <th>Kiosk</th>
                <th>Category</th>
                <th>Type</th>
                <th>Description</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {table.map((tabl, index) => {
                return (
                  <tr key={tabl.id}>
                    <td>{tabl.kiosk}</td>
                    <td>{tabl.cate}</td>
                    <td>{tabl.type}</td>
                    <td>{tabl.desc}</td>
                    <td
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {tabl.date_time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
