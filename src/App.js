import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail/UserDetail";
import UserList from "./components/UserList/UserList";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import models from "./modelData/models";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [userName, setUserName] = useState("");
  const [userNamePhoto, setUserNamePhoto] = useState("");
  const [user, setUser] = useState();
  const updateUserName = (userId) => {
    const users = models.userListModel();
    const user = users.find((user) => user._id === userId);
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              setUser={setUser}
              user={user}
              userNamePhoto={userNamePhoto}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            {user && <UserList />}
          </Grid>
          <Grid item sm={9}>
            <Routes>
              <Route
                path="/api/user/:userId"
                element={<UserDetail setUser={setUser} />}
              />
              <Route
                path="/api/user/photosOfUser/:userId"
                element={<UserPhotos />}
              />
              <Route path="/users" element={<UserList />} />
              <Route path="/" element={<LoginRegister setUser={setUser} />} />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
