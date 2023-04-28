import "./Sidebar.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import sidebar_bag from "../../../Assets/Dashboard_SVGs/sidebar-bag.svg";
import sidebar_text from "../../../Assets/Dashboard_SVGs/sidebar_text.svg";
import Dashboard from "../../../Assets/Dashboard_SVGs/Dashboard.svg";
import Percentage from "../../../Assets/Dashboard_SVGs/discount.svg";
import History from "../../../Assets/Dashboard_SVGs/history.svg";
import Notifications from "../../../Assets/Dashboard_SVGs/side notification icon.svg";
import logout from "../../../Assets/Dashboard_SVGs/logout.svg";
import livestatus from "../../../Assets/Dashboard_SVGs/livestatus.svg";
import Inventory from "../../../Assets/Dashboard_SVGs/Inventory.svg";
import Accessories from "../../../Assets/Dashboard_SVGs/Accessories.svg";
import Accessories_Request from "../../../Assets/Dashboard_SVGs/Accessories Request.svg";
import Add_new_accessories from "../../../Assets/Dashboard_SVGs/Add new accessories.svg";

import React, { useEffect, useState } from "react";

export default function Sidebar(props) {
  var tok = localStorage.getItem("token");
  var token = "Bearer " + tok;
  useEffect(() => {
    //
    props.getUnreadNoti(token);
  });

  const location = useLocation();

  const logoutHandler = () => {
    localStorage.clear();
    props.setToken("");
    props.setRole("");

    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <span className="">
          <img className="sidebar_bag" src={sidebar_bag} alt="" />
        </span>
        <span className="">
          <img className="sidebar_text" src={sidebar_text} alt="" />
        </span>
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <NavLink to="/" className="link">
              <li
                className={
                  window.location.pathname === "/"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Dashboard} alt="" />
                </span>
                Dashboard
              </li>
            </NavLink>
            <NavLink to="/live_status" className="link">
              <li
                className={
                  window.location.pathname === "/live_status"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={livestatus} alt="" />
                </span>
                Live Status
              </li>
            </NavLink>
            <NavLink to="/set_percentage" className="link">
              <li
                className={
                  window.location.pathname === "/set_percentage"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Percentage} alt="" />
                </span>
                Set percentage
              </li>
            </NavLink>
            <NavLink to="/history" className="link">
              <li
                className={
                  window.location.pathname === "/history"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={History} alt="" />
                </span>
                History
              </li>
            </NavLink>

            {/* <NavLink to="/inventory/fixed" className="link">
                <li className={window.location.pathname === "/inventory/fixed" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{props.getUnreadNoti(token)}}>
                    <span className="ico">
                        <img className="sico" src={Inventory} alt="" />
                    </span>
                  Inventory
                  
                </NavLink>

                <NavLink to="/inventory" className="link">
                <li className={window.location.pathname === "/inventory" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{props.getUnreadNoti(token)}}>
                    <span className="ico">
                        <img className="sico" src={Accessories} alt="" />
                    </span>
                  Accessories
                  
                </li>
                </NavLink>

                <NavLink to="/inventory/requestable" className="link">
                <li className={window.location.pathname === "/inventory/requestable" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{props.getUnreadNoti(token)}}>
                    <span className="ico">
                        <img className="sico" src={Add_new_accessories} alt="" />
                    </span>
                    Add New Accessories
                  
                </li>
                </NavLink>
                
                <NavLink to="/inventory/requested" className="link">
                <li className={window.location.pathname === "/inventory/requested" ? 'sidebarListItem active' : "sidebarListItem"} onClick={()=>{props.getUnreadNoti(token)}}>
                    <span className="ico">
                        <img className="sico" src={Accessories_Request} alt="" />
                    </span>
                    Accessories Request
                  
                </li>
                </NavLink> */}

            <NavLink to="/notifications" className="link">
              <li
                className={
                  window.location.pathname === "/notifications"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Notifications} alt="" />
                </span>
                Notifications ({props.NoUnReadNoti})
              </li>
            </NavLink>
            {/* <Link to="/" className="link"> */}
            <li
              onClick={logoutHandler}
              className="sidebarListItem"
              style={{
                minWidth: "265px",
                maxWidth: "14vw",
                marginTop: "45vh",
                backgroundColor: "white",
                color: "#00728b",
                fontWeight: "bold",
              }}
            >
              <span back className="ico">
                <img className="sico_logout" src={logout} alt="" />
              </span>
              Log out
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
