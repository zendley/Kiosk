import "./ATopBar.css";

import React, { useState } from "react";

import logo from "../../../Assets/Images/Logo.png";
import Notifications from "../../../Assets/Dashboard_SVGs/notification.svg";
import unreadNotifications from "../../../Assets/Dashboard_SVGs/notification red.svg";
import loaderr from "../../../Assets/Dashboard_SVGs/loader.gif";
import nodatafound from "../../../Assets/Dashboard_SVGs/NoContentFound.svg";
import logout from "../../../Assets/Dashboard_SVGs/logout.svg";
import emp from "../../../Assets/Dashboard_SVGs/employe_img.svg";

import { Link } from "react-router-dom";

import axios from "../../../Api/Axios";
import * as axiosURL from "../../../Api/AxiosUrls";

var Admin_Notification = axiosURL.Notifications;

var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function ATopBar(props) {
  const [notiisopen, setNotiIsOpen] = useState(false);

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const getNoti = () => {
    setLoader(true);

    const url = Admin_Notification;
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
          console.log(response.data);
          // return
          setData(response.data.slice(0, 5));
          setLoader(false);
          // if(response.data.unread){
          //   setUnRead(true)
          // }

          console.log(response.data);
        }
      });
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
          className="topRight"
        >
          {/* <div className="topbarIconContainer">
                1
                <span className="topIconBadge">2</span>
              </div> */}
          <h4
            style={{
              margin: "0px",
              marginLeft: "18px",
              color: "#463b3b",
            }}
          >
            Super Admin
          </h4>
          <div className="topbarIconContainer">
            <Link
              onClick={() => {
                getNoti();
                notiisopen === true
                  ? setNotiIsOpen(false)
                  : setNotiIsOpen(true);
              }}
            >
              {props.unread ? (
                <img
                  style={{ width: "25px", marginRight: "15px" }}
                  src={unreadNotifications}
                  alt=""
                />
              ) : (
                <img
                  style={{ width: "25px", marginRight: "10px" }}
                  src={Notifications}
                  alt=""
                />
              )}
            </Link>
            <img
              style={{
                marginRight: "20px",
              }}
              className="sico_logout"
              src={logout}
              alt=""
            />
            <img
              style={{
                marginRight: "20px",
              }}
              className=""
              src={emp}
              alt=""
            />
          </div>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>

      {/* NOTIFICATIONS BOX */}

      {notiisopen === true ? (
        <div
          style={{
            width: "200px",
            height: "fit-content",
            position: "relative",
            left: "76%",
            background: "white",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "15px",
          }}
        >
          {loader === true ? (
            <div
              style={{
                height: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "50px", height: "50px" }}
                src={loaderr}
                alt=""
              />
            </div>
          ) : data.length < 1 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "170px", height: "170px" }}
                src={nodatafound}
                alt=""
              />
            </div>
          ) : (
            data.map((tabl, index) => {
              // console.log(tabl)
              if (tabl.read_at) {
                return (
                  <div>
                    <p
                      style={{
                        marginBottom: "0px",
                      }}
                      className="text-truncate"
                    >
                      {tabl.desc}
                    </p>
                    <p
                      style={{
                        marginBottom: "0px",
                        fontSize: "9px",
                        color: "gray",
                      }}
                    >
                      {tabl.date_time}
                    </p>
                    <hr style={{ margin: "0.3rem 0" }} />
                  </div>
                );
              } else {
                return (
                  <div className="bg-light ">
                    <p
                      style={{
                        marginBottom: "0px",
                      }}
                      className="text-truncate"
                    >
                      {tabl.desc}
                    </p>
                    <p
                      style={{
                        marginBottom: "0px",
                        fontSize: "9px",
                        color: "gray",
                      }}
                    >
                      {tabl.date_time}
                    </p>
                    <hr style={{ margin: "0.3rem 0" }} />
                  </div>
                );
              }
            })
          )}
          {data.length ? (
            <div className="d-flex align-item-center justify-content-center">
              <Link
                to={"/notifications"}
                onClick={() => {
                  setNotiIsOpen(false);
                }}
              >
                see all
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* <div style={{
                width: '200px',
                height: '240px',
                position: 'relative',
                left: '85%',
                background: 'white',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                padding: '15px',
              }}>

                <div>
                  <p
                  style={{
                    marginBottom: '0px',
                  }}
                  >Hello</p>
                  <p
                  style={{
                    marginBottom: '0px',
                    fontSize: '9px',
                    color: 'gray',
                  }}
                  >25-10-2022</p>
                  <hr style={{margin: '0.3rem 0',}} />
                </div>



              </div> */}
    </div>
  );
}
