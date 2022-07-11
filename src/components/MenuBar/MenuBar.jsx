import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { StyledLink } from "components/NavigationBar/NavigationBar.styled";
import { useLogOutUserMutation } from "services/serviceAPI";
import { logoutUser } from "redux/authSlice.jsx";

export default function MenuBar() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.users.user.name);
  const [logOut] = useLogOutUserMutation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledLink to="/">
            <Button color="inherit">Home</Button>
          </StyledLink>

          <StyledLink to="/contacts">
            <Button color="inherit">Contacts</Button>
          </StyledLink>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${name}`}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                logOut().then(dispatch(logoutUser()));
              }}
            >
              Log Out
            </Button>
          </Stack>
          <AccountCircle sx={{ marginLeft: "30px" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
