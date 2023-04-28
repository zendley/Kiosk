import "./ASideBar.css";
import { NavLink } from "react-router-dom";
import Attendance from "../../../Assets/Dashboard_SVGs/attendancew.svg";
import Attendance1 from "../../../Assets/Dashboard_SVGs/Attendance.svg";
import Dashboard from "../../../Assets/Dashboard_SVGs/Dashboard.svg";
import sidebar_bag from "../../../Assets/Dashboard_SVGs/sidebar-bag.svg";
import sidebar_text from "../../../Assets/Dashboard_SVGs/sidebar_text.svg";
import Dashboard1 from "../../../Assets/Dashboard_SVGs/Dashboardwhite.svg";
import Employee from "../../../Assets/Dashboard_SVGs/Employeew.svg";
import Employee1 from "../../../Assets/Dashboard_SVGs/Employee.svg";
import Inventory from "../../../Assets/Dashboard_SVGs/inventoryw.svg";
import Inventory1 from "../../../Assets/Dashboard_SVGs/Inventory.svg";
import kiosk from "../../../Assets/Dashboard_SVGs/kioskw.svg";
import kiosk1 from "../../../Assets/Dashboard_SVGs/kiosk.svg";
import logout from "../../../Assets/Dashboard_SVGs/logout.svg";
import Products from "../../../Assets/Dashboard_SVGs/Productsw.svg";
import Products1 from "../../../Assets/Dashboard_SVGs/Products.svg";
import Sale_Channel from "../../../Assets/Dashboard_SVGs/Sale_Channelw.svg";
import Sale_Channel1 from "../../../Assets/Dashboard_SVGs/Sale_Channel.svg";
import Settings from "../../../Assets/Dashboard_SVGs/settingsw.svg";
import Settings1 from "../../../Assets/Dashboard_SVGs/Settings.svg";
import FoodPanda from "../../../Assets/Dashboard_SVGs/f_panadaw.svg";
import FoodPanda1 from "../../../Assets/Dashboard_SVGs/FoodPanda.svg";
import Kiosk2 from "../../../Assets/Dashboard_SVGs/onlinew.svg";
import Kiosk3 from "../../../Assets/Dashboard_SVGs/Kiosk2.svg";
import Online_Sale from "../../../Assets/Dashboard_SVGs/onlinew.svg";
import Online_Sale1 from "../../../Assets/Dashboard_SVGs/Online_Sale.svg";
import open from "../../../Assets/Images/open.svg";
import close from "../../../Assets/Images/close.svg";
import baskyt from "../../../Assets/Dashboard_SVGs/Baskyt.png";
import bykea from "../../../Assets/Dashboard_SVGs/Bykea.png";
import pandago from "../../../Assets/Dashboard_SVGs/PandaGo.png";
import overalll from "../../../Assets/Dashboard_SVGs/sales.svg";
import Accessories from "../../../Assets/Dashboard_SVGs/Accessories.svg";
import Accessories_Request from "../../../Assets/Dashboard_SVGs/requestw.svg";
import Accessories_Request1 from "../../../Assets/Dashboard_SVGs/Accessories Request.svg";
import Add_new_accessories from "../../../Assets/Dashboard_SVGs/addassw.svg";
import Add_new_accessories1 from "../../../Assets/Dashboard_SVGs/Add new accessories.svg";
import damaged_package from "../../../Assets/Dashboard_SVGs/damaged-package.svg";

import Notifications from "../../../Assets/Dashboard_SVGs/side notification icon.svg";

import React, { useEffect, useState } from "react";
var tok = localStorage.getItem("token");
var token = "Bearer " + tok;

export default function ASideBar(props) {
  const [channel, setChannel] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    //
    props.getUnreadNoti(token);
  }, [rerender]);

  const logoutHandler = () => {
    localStorage.clear();
    props.setToken("");
    props.setRole("");
    window.location.href = "/";
  };
  const [channel1, setChannel1] = useState(false);
  const [channel2, setChannel2] = useState(false);

  const channelHandler1 = () => {
    setChannel1(!channel);
  };

  const channelHandler2 = () => {
    setChannel2(!channel);
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
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Dashboard} alt="" />
                </span>
                Dashboard
              </li>
            </NavLink>
            <NavLink to="/kiosk" className="link">
              <li
                className={
                  window.location.pathname === "/kiosk"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={kiosk1} alt="" />
                </span>
                Kiosks
              </li>
            </NavLink>
            <NavLink to="/employee" className="link">
              <li
                className={
                  window.location.pathname === "/employee"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Employee1} alt="" />
                </span>
                Employees
              </li>
            </NavLink>
            <NavLink to="/attendance" className="link">
              <li
                className={
                  window.location.pathname === "/attendance"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Attendance1} alt="" />
                </span>
                Attendance
              </li>
            </NavLink>
            {/* <Link to="/salechannel" className="link"> */}
            <li className="sidebarListItem" onClick={channelHandler1}>
              <span className="ico">
                <img className="sico" src={Sale_Channel1} alt="" />
              </span>
              Sales Channel
              <span className="arrow">
                <img src={channel ? open : close} alt="" />
              </span>
            </li>
            {/* </Link> */}

            {channel1 ? (
              <>
                <NavLink to="/salechannel/kiosk" className="link">
                  <li
                    className={
                      window.location.pathname === "/salechannel/kiosk"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={kiosk1} alt="" />
                    </span>
                    Kiosk
                  </li>
                </NavLink>

                <NavLink to="/salechannel/food_panda" className="link">
                  <li
                    className={
                      window.location.pathname === "/salechannel/food_panda"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={FoodPanda1} alt="" />
                    </span>
                    Food Panda
                  </li>
                </NavLink>
                <NavLink to="/salechannel/online_store" className="link">
                  <li
                    className={
                      window.location.pathname === "/salechannel/online_store"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={Online_Sale1} alt="" />
                    </span>
                    Online Sale
                  </li>
                </NavLink>

                {/* <NavLink to="/salechannel/panda_go" className="link">
                <li className={window.location.pathname === "/salechannel/panda_go" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={pandago} alt="" />
                    </span>
                    Panda go Sale
                </li>
                </NavLink>
                <NavLink to="/salechannel/basket" className="link">
                <li className={window.location.pathname === "/salechannel/basket" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={baskyt} alt="" />
                    </span>
                    Basket Sale
                </li>
                </NavLink>
                <NavLink to="/salechannel/bykea" className="link">
                <li className={window.location.pathname === "/salechannel/bykea" ? 'sidebarListItem subitem active' : "sidebarListItem subitem"} onClick={()=>{setRerender(!rerender)}}>
                    <span className="ico">
                        <img className="sico" src={bykea} alt="" />
                    </span>
                    Bykea Sale
                </li>
                </NavLink> */}
                <NavLink to="/salechannel/overall" className="link">
                  <li
                    className={
                      window.location.pathname === "/salechannel/overall"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={overalll} alt="" />
                    </span>
                    Overall Sales
                  </li>
                </NavLink>
              </>
            ) : (
              ""
            )}
            <NavLink to="/salechannel/demage" className="link">
              <li
                className={
                  window.location.pathname === "/salechannel/demage"
                    ? "sidebarListItem active"
                    : "sidebarListItem "
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={damaged_package} alt="" />
                </span>
                Damage & Lost
              </li>
            </NavLink>

            {/* <Link to="/salechannel" className="link"> */}
            <li className="sidebarListItem" onClick={channelHandler2}>
              <span className="ico">
                <img className="sico" src={Sale_Channel1} alt="" />
              </span>
              Inventory Management
              <span className="arrow">
                <img src={channel ? open : close} alt="" />
              </span>
            </li>
            {/* </Link> */}

            {channel2 ? (
              <>
                <NavLink to="/inventory/fixed" className="link">
                  <li
                    className={
                      window.location.pathname === "/inventory/fixed"
                        ? "sidebarListItem  subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={Inventory1} alt="" />
                    </span>
                    Inventory Fixed
                  </li>
                </NavLink>

                <NavLink to="/inventory" className="link">
                  <li
                    className={
                      window.location.pathname === "/inventory"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={Accessories} alt="" />
                    </span>
                    Accessories
                  </li>
                </NavLink>

                <NavLink to="/inventory/requestable" className="link">
                  <li
                    className={
                      window.location.pathname === "/inventory/requestable"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={Add_new_accessories1} alt="" />
                    </span>
                    Add New Accessories
                  </li>
                </NavLink>

                <NavLink to="/inventory/requested" className="link">
                  <li
                    className={
                      window.location.pathname === "/inventory/requested"
                        ? "sidebarListItem subitem active"
                        : "sidebarListItem subitem"
                    }
                    onClick={() => {
                      setRerender(!rerender);
                      props.getUnreadNoti(token);
                    }}
                  >
                    <span className="ico">
                      <img className="sico" src={Accessories_Request1} alt="" />
                    </span>
                    Accessories Request
                  </li>
                </NavLink>
              </>
            ) : (
              ""
            )}

            <NavLink to="/products" className="link">
              <li
                className={
                  window.location.pathname === "/products"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Products1} alt="" />
                </span>
                Products
              </li>
            </NavLink>
            <NavLink to="/settings" className="link">
              <li
                className={
                  window.location.pathname === "/settings"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => {
                  setRerender(!rerender);
                  props.getUnreadNoti(token);
                }}
              >
                <span className="ico">
                  <img className="sico" src={Settings1} alt="" />
                </span>
                Settings
              </li>
              <NavLink to="/notifications" className="link">
                <li
                  className={
                    window.location.pathname === "/notifications"
                      ? "sidebarListItem active"
                      : "sidebarListItem"
                  }
                  onClick={() => {
                    setRerender(!rerender);
                    props.getUnreadNoti(token);
                  }}
                >
                  <span className="ico">
                    <img className="sico" src={Notifications} alt="" />
                  </span>
                  Notifications ({props.NoUnReadNoti})
                </li>
              </NavLink>
            </NavLink>
            {/* <Link to="/" className="link"> */}
            <li
              onClick={logoutHandler}
              className="sidebarListItem"
              style={{
                minWidth: "265px",
                maxWidth: "14vw",
                marginTop: "20vh",
                backgroundColor: "white",
                color: "#00728b",
                fontWeight: "bold",
              }}
            >
              <span className="ico">
                <img className="sico_logout " src={logout} alt="" />
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
