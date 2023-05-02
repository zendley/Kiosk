import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import bg from "./Assets/Images/bg.png";

//Bakery
import Sidebar from "./Components/Bakery/SideBar/Sidebar";
import Topbar from "./Components/Bakery/Topbar/Topbar";
import Rtable from "./Components/Bakery/DashBoard/Rtable";
import Login from "./Components/Auth/Login/Login";

import Index from "./Components/Auth/Index/Index";
import Register from "./Components/Auth/Register/Register";
import SetPerct from "./Components/Bakery/SetPerct/SetPerct";
import History from "./Components/Bakery/History/History";
import Notifications from "./Components/Bakery/Notifications/Notifications";
import LiveStatus from "./Components/Bakery/LiveStatus/LiveStatus";
import AddProd from "./Components/Bakery/DashBoard/AddProd";
// import BakeryInventory from "./Components/Bakery/Inventory/Inventory";

//Admin
import ATopBar from "./Components/Admin/ATopBar/ATopBar";
import ASideBar from "./Components/Admin/ASideBar/ASideBar";
import Adash from "./Components/Admin/ADashBoard/Adash";
import Kiosk from "./Components/Admin/AKisoks/Kiosk";
import Employee from "./Components/Admin/AEmployee/Employee";
import Attendance from "./Components/Admin/AAttendance/Attendance";
import Inventory from "./Components/Admin/AInventory/Inventory";
import Products from "./Components/Admin/AProducts/Products";
import Settings from "./Components/Admin/ASettings/Settings";
import SKiosk from "./Components/Admin/ASaleChannel/Kiosk";
import SFoodPanda from "./Components/Admin/ASaleChannel/FoodPanda";
import SOnlineSale from "./Components/Admin/ASaleChannel/OnlineSale";
import AssignInv from "./Components/Admin/AInventory/AssignInv";
import AccessReq from "./Components/Admin/AInventory/AccessReq";
import Demo from "./Components/Admin/ADashBoard/Demo";
import Finv from "./Components/Admin/AInventory/Finv";
import FAssignInv from "./Components/Admin/AInventory/FAssignInv";
import PandaGo from "./Components/Admin/ASaleChannel/PandaGo";
import Basket from "./Components/Admin/ASaleChannel/Basket";
import Bykea from "./Components/Admin/ASaleChannel/Bykea";
import Overall from "./Components/Admin/ASaleChannel/Overall";
import Demage from "./Components/Admin/ASaleChannel/Demage";
import ANotifications from "./Components/Admin/Notification/Notifications";

// import { getFirebaseToken, onForegroundMessage } from "./firebase";
// import { getDatabase, ref, set } from "firebase/database";
import RequestableAcc from "./Components/Admin/AInventory/RequestableAcc";

import axios from ".//Api/Axios";
// import axios from '.;
import * as axiosURL from ".//Api/AxiosUrls";
var Unread_Notification = axiosURL.Unread_Notification;

// const db = getDatabase();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [unreadnotification, setUnreadNotification] = useState(0);
  const [unread, setUnRead] = useState(false);

  const getUreadNoti = (token) => {
    const url = Unread_Notification;
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
          if (response.data) {
            setUnRead(true);
          } else {
            setUnRead(false);
          }
          setUnreadNotification(response.data);

          console.log("----------------------");
          console.log(response.data);
        }
      });
  };

  // const [showNotificationBanner, setShowNotificationBanner] = useState(
  //   Notification.permission === "default"
  // );

  // const handleGetFirebaseToken = () => {
  //   getFirebaseToken()
  //     .then((firebaseToken) => {
  //       // console.log('Firebase token: ', firebaseToken);
  //       if (firebaseToken) {
  //         setShowNotificationBanner(false);
  //         // writeUserData( "firebaseToken");
  //       }
  //     })
  //     .catch((err) =>
  //       console.error("An error occured while retrieving firebase token. ", err)
  //     );

  //   onForegroundMessage()
  //     .then((payload) => {
  //       console.log("Received foreground message: ", payload);
  //       // const { notification: { title, body } } = payload;
  //       // toast(<ToastifyNotification title={title} body={body} />);
  //     })
  //     .catch((err) =>
  //       console.log(
  //         "An error occured while retrieving foreground message. ",
  //         err
  //       )
  //     );
  // };

  // function writeUserData(fcm_token) {
  //   const db = getDatabase();
  //   set(ref(db, `fcm-tokens-web/${fcm_token}`), {
  //     token: fcm_token,
  //   });
  //   console.log(db);
  // }

  // useEffect(() => {
  //   handleGetFirebaseToken();
  // }, []);

  useEffect(() => {
    console.log("rendered");
  }, [token]);

  //Login

  if (!token) {
    // return <Login setToken={setToken} setRole={setRole} />
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route
            path="/login"
            element={<Login setToken={setToken} setRole={setRole} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    );
  }

  //Bakery
  else if (role === "Bakery") {
    return (
      <>
        <Router>
          <Topbar unread={unread} />
          <div className="containerr">
            <Sidebar
              setToken={setToken}
              setRole={setRole}
              getUnreadNoti={getUreadNoti}
              NoUnReadNoti={unreadnotification}
            />
            <div style={{ backgroundImage: `url(${bg})` }} className="others">
              <div>
                <Routes>
                  <Route path="/" element={<Rtable />}></Route>
                  <Route path="/new_production" element={<AddProd />}></Route>
                  <Route path="/live_status" element={<LiveStatus />}></Route>
                  <Route path="/set_percentage" element={<SetPerct />}></Route>
                  <Route path="/history" element={<History />}></Route>
                  <Route path="/inventory/fixed" element={<Finv />}></Route>
                  <Route
                    path="/inventory/fixed/assign"
                    element={<FAssignInv />}
                  ></Route>
                  <Route path="/inventory" element={<Inventory />}></Route>
                  <Route
                    path="/inventory/requestable"
                    element={<RequestableAcc />}
                  ></Route>
                  <Route
                    path="/inventory/Assign"
                    element={<AssignInv />}
                  ></Route>
                  <Route
                    path="/inventory/requested"
                    element={<AccessReq />}
                  ></Route>
                  <Route
                    path="/notifications"
                    element={
                      <Notifications
                        getUnreadNoti={getUreadNoti}
                        NoUnReadNoti={unreadnotification}
                      />
                    }
                  ></Route>
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </>
    );
  }

  //Admin
  else if (role === "Admin") {
    return (
      <>
        <Router>
          <ATopBar unread={unread} />
          <div className="containerr">
            <ASideBar
              setToken={setToken}
              setRole={setRole}
              getUnreadNoti={getUreadNoti}
              NoUnReadNoti={unreadnotification}
            />
            <div style={{}} className="others">
              <div>
                <Routes>
                  <Route path="/" element={<Adash />}></Route>
                  <Route path="/kiosk" element={<Kiosk />}></Route>
                  <Route path="/employee" element={<Employee />}></Route>
                  <Route path="/attendance" element={<Attendance />}></Route>
                  <Route path="/salechannel/kiosk" element={<SKiosk />}></Route>
                  <Route
                    path="/salechannel/food_panda"
                    element={<SFoodPanda />}
                  ></Route>
                  <Route
                    path="/salechannel/online_store"
                    element={<SOnlineSale />}
                  ></Route>
                  <Route
                    path="/salechannel/panda_go"
                    element={<PandaGo />}
                  ></Route>
                  <Route
                    path="/salechannel/basket"
                    element={<Basket />}
                  ></Route>
                  <Route path="/salechannel/bykea" element={<Bykea />}></Route>
                  <Route
                    path="/salechannel/overall"
                    element={<Overall />}
                  ></Route>
                  <Route
                    path="/salechannel/demage"
                    element={<Demage />}
                  ></Route>
                  <Route path="/inventory/fixed" element={<Finv />}></Route>
                  <Route
                    path="/inventory/fixed/assign"
                    element={<FAssignInv />}
                  ></Route>
                  <Route path="/inventory" element={<Inventory />}></Route>
                  <Route
                    path="/inventory/requestable"
                    element={<RequestableAcc />}
                  ></Route>
                  <Route
                    path="/inventory/Assign"
                    element={<AssignInv />}
                  ></Route>
                  <Route
                    path="/inventory/requested"
                    element={<AccessReq />}
                  ></Route>
                  <Route path="/products" element={<Products />}></Route>
                  <Route path="/settings" element={<Settings />}></Route>
                  <Route
                    path="/notifications"
                    element={
                      <ANotifications
                        getUnreadNoti={getUreadNoti}
                        NoUnReadNoti={unreadnotification}
                      />
                    }
                  ></Route>
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </>
    );
  }

  // return (
  //   <>
  //   <Topbar/>
  //   <div className="containerr">
  //     <Sidebar />
  //     <div className="others">
  //       <Rtable />
  //     </div>
  //   </div>
  //   </>
  // );
}

export default App;
