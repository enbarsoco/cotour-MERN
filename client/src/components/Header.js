import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SailingIcon from "@mui/icons-material/Sailing";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import decode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#4f5ea8" }}>
      <Box width={"94%"} margin={"auto"}>
        <Toolbar disableGutters>
          <SailingIcon sx={{ mr: 1 }} style={{ color: "#ffffff" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
            }}
            style={{
              color: "#ffffff",
              letterSpacing: ".2rem",
              textDecoration: "none",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            Cotour
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
            }}
          >
            <Button
              href={"/"}
              style={{
                color: "white",
                display: "block",
                textTransform: "none",
              }}
            >
              Home
            </Button>
            {user?.result?._id && (
              <>
                <Button
                  href={"/dashboard"}
                  style={{
                    color: "white",
                    display: "block",
                    textTransform: "none",
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  href={"/addTour"}
                  style={{
                    color: "white",
                    display: "block",
                    textTransform: "none",
                  }}
                >
                  Add Tour
                </Button>
              </>
            )}
            {user?.result?._id ? (
              <Button
                onClick={handleLogout}
                href={"/login"}
                style={{
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                href={"/login"}
                style={{
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
