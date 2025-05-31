import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";

import "./styles.css";

function TopBar({ userName, userNamePhoto }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              Trịnh Quang Lâm - B22DCCN482
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
