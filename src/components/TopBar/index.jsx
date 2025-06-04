import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";
const BASE_API = process.env.REACT_APP_API_URL;

function TopBar({ user, setUser }) {
  console.log(user);

  const logout = async () => {
    try {
      await fetch(`${BASE_API}/api/admin/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      alert("Logout thành công");
      localStorage.removeItem("token");
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
            `Hello ${user.full_name}`
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
          <>
            <Typography variant="h5" color="inherit">
              <div style={{ cursor: "pointer" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/addPhotos"}
                >
                  Add Photo
                </Link>
              </div>
            </Typography>

            <div style={{ width: "20px" }}></div>

            <Typography variant="h5" color="inherit">
              <div style={{ cursor: "pointer" }} onClick={logout}>
                Logout
              </div>
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
