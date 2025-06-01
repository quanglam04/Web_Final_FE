import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import "./styles.css";

function TopBar({ user, setUser }) {
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admin/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setUser(null);

      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          {user ? (
            `Hello ${user.first_name} ${user.last_name}`
          ) : (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Please Login
              </div>
            </>
          )}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {user && (
          <Typography variant="h5" color="inherit">
            <div style={{ cursor: "pointer" }} onClick={logout}>
              Logout
            </div>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
