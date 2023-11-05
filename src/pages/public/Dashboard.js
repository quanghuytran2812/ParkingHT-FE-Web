import React from "react";
import "assets/css/dashboard.css";
import { Sidebar, Topbar } from "components";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import UsersProfile from "./UsersProfile";
import path from "ultils/path"
// import ProtectedRoute from "components/ProtectedRoute";
import { UserList } from "pages/admin";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="container">
        <Topbar />
        {/* <ProtectedRoute allowedRoles={['ROLE_ADMIN']} paths={path.HOME} itemElements={<Home />}/>
        <ProtectedRoute allowedRoles={['ROLE_MANAGER']} paths={path.HOME} itemElements={<UserList />}/> */}
        {/* <ProtectedRoute allowedRoles={['ROLE_ADMIN','ROLE_MANAGER']} paths={path.USERPROFILE} itemElements={<UsersProfile />}/> */}
        <Routes>          
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.USERLIST} element={<UserList />} />
          <Route path={path.USERPROFILE} element={<UsersProfile />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
