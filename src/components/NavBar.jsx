import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import { useNavigate } from "react-router";
import useAuthCalls from "../hooks/useAuthCalls";
import { useAuthContext } from "../contexts/AuthProvider";
import defaultAvatar from "../assets/blank-profile-picture-973460_1280.png";

const settings = ["Profile", "Dashboard", "Register"];

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const { logout } = useAuthCalls();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <RateReviewTwoToneIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG APP
          </Typography>

          <RateReviewTwoToneIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            BLOG APP
          </Typography>

          <Box>
            <Tooltip title="Open settings">
              {currentUser?.avatar ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar" src={currentUser.avatar} />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar" src={defaultAvatar} />
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={() => navigate("/")}>
                  Dashboard
                </Typography>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Typography>
              </MenuItem> */}

              <MenuItem>
                {currentUser ? (
                  <Typography onClick={() => logout(currentUser)}>
                    LogOut
                  </Typography>
                ) : (
                  <Typography onClick={() => navigate("/login")}>
                    LogIn
                  </Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
