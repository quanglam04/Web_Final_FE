import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";

import "./styles.css";

function TopBar({ userName, user }) {
  console.log("trang topbar: ", user);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              {user ? (
                <>
                  {user.first_name} {user.last_name}
                </>
              ) : (
                <>Please Login</>
              )}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">
              {userName ? `${userName}` : ""}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
