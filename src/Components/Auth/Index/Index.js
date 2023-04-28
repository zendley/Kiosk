import "./Index.css";
import ll2 from "../../../Assets/Images/login_bag.svg";
import { Link } from "react-router-dom";

import React from "react";

export default function Index() {
  return (
    <>
      <div className="row ">
        <div style={{ height: "100vh" }} className="col-6 left">
          <div>
            <img src={ll2} alt="" />
            <span>
              <h1 class="left_text">Zendley KIOSK</h1>
            </span>
            <span>
              <h4 class="left_text">Kiosk Management System</h4>
            </span>
          </div>
        </div>

        <div className="col-6 right">
          <h2 className="my-4">Welcome To Dashboard</h2>

          <div className="card">
            <Link to="login">
              <button className="button2">Sign In</button>
            </Link>
            {/* <Link to="/">
            <button  className="button3">Register</button>
          </Link> */}
          </div>

          <p className="bottom">© Design & developed by SpeckPro Digital</p>
        </div>
      </div>
    </>
  );
}
