import "./App.css";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail/UserDetail";
import UserList from "./components/UserList/UserList";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import AddPhoto from "./components/AddPhoto";

const App = () => {
  const [user, setUser] = useState();
  const checkCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/user/me", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking current user:", error);
      setUser(null);
    }
  };
  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar setUser={setUser} user={user} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            {user && <UserList />}
          </Grid>
          <Grid item sm={9}>
            <Routes>
              <Route path="/api/user/:userId" element={<UserDetail />} />
              <Route
                path="/api/user/photosOfUser/:userId"
                element={<UserPhotos userLogin={user} />}
              />
              <Route path="/users" element={<UserList />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/addPhotos"
                element={<AddPhoto userLogin={user} />}
              />
              <Route path="/" element={<Login setUser={setUser} />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
