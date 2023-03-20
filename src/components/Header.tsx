import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
  const headerStyle = {
    background: "#3f3d6b",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={headerStyle} position="fixed" data-testid="APPBAR">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Propylon Front-end Challenge
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
