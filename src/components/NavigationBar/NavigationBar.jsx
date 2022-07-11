import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { StyledLink } from "./NavigationBar.styled.jsx";
import { useSelector } from "react-redux";
import BackgroundLetterAvatars from "components/MenuBar/MenuBar";

export default function NavigationBar() {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!isLoggedIn ? (
        <AppBar position="static">
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <StyledLink to="/">
              <Button color="inherit">Home</Button>
            </StyledLink>

            {isLoggedIn && (
              <StyledLink to="/contacts">
                <Button color="inherit">Contacts</Button>
              </StyledLink>
            )}

            <StyledLink to="/register">
              <Button color="inherit">Register</Button>
            </StyledLink>
            <StyledLink to="/login">
              <Button color="inherit">Login</Button>
            </StyledLink>
          </Toolbar>
        </AppBar>
      ) : (
        <BackgroundLetterAvatars></BackgroundLetterAvatars>
      )}

      <Outlet />
    </Box>
  );
}
