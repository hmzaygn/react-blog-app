import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import loginStyle from "./styles/Login.module.css";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const Login = () => {
  return (
    <Box className={loginStyle["login-main"]}>
      <Box component="form" className={loginStyle["form"]}>
        <Box sx={{ textAlign: "center" }}>
          <img src="./assets/blog.png" alt="blog" width={"150px"} />
        </Box>
        <TextField
          required
          type="email"
          name="email"
          variant="outlined"
          label="Email"
          // value=""
        />
        <TextField
          required
          type="password"
          name="password"
          variant="outlined"
          label="Password"
          // value=""
        />
        <Button type="submit" variant="contained" endIcon={<FingerprintIcon />}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
