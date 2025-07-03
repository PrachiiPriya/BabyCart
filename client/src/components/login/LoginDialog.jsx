import React, { useState, useContext, useCallback } from "react";
import {
  Dialog,
  TextField,
  Box,
  Typography,
  styled,
  Button,
} from "@mui/material";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateAccount = styled(Typography)`
  margin-top: 16px;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const accountInitialValue = {
  login: { view: "login" },
  signup: { view: "signup" },
};

const signupInitialValues = {
  username: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

export default function LoginDialog({ open, setopen }) {
  const [account, setAccount] = useState(accountInitialValue.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { setAccount: setContextAccount } = useContext(DataContext);

  const handleClose = () => {
    setopen(false);
    setAccount(accountInitialValue.login);
    setError("");
  };

  const toggleSignup = () => {
    setAccount(accountInitialValue.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/loginSignup/signup",
        signup
      );

      if (response.status === 200) {
        const userData = response.data.data;

        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setContextAccount(userData.username);
        }

        handleClose();
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error while calling signup API.", error);
      setError("Signup failed. Please try again.");
    }
  }, [signup, setContextAccount]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/loginSignup/login",
        login
      );

      if (response.status === 200) {
        const userData = response.data.data;
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setContextAccount(userData.username);
        }

        handleClose();
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error while calling login API.", error);
      setError("Login failed. Please try again.");
    }
  }, [login, setContextAccount]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Component>
        {account.view === "login" ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            {error && <Error>{error}</Error>}
            <TextField
              onChange={onValueChange}
              variant="standard"
              label="Enter Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
            />
            <TextField
              onChange={onValueChange}
              variant="standard"
              label="Enter Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
            />
            <Typography variant="body2" style={{ marginTop: 16 }}>
              By continuing, you agree to BabyCare's terms and policies.
            </Typography>
            <Button
              onClick={loginUser}
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
            <CreateAccount onClick={toggleSignup} variant="body2">
              New to BabyCare? Create an account.
            </CreateAccount>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              onChange={onInputChange}
              variant="standard"
              label="Enter Username"
              type="text"
              fullWidth
              name="username"
              margin="normal"
            />
            <TextField
              onChange={onInputChange}
              variant="standard"
              label="Enter Email"
              type="email"
              fullWidth
              name="email"
              margin="normal"
            />
            <TextField
              onChange={onInputChange}
              variant="standard"
              label="Enter Password"
              type="password"
              fullWidth
              name="password"
              margin="normal"
            />
            <Typography variant="body2" style={{ marginTop: 16 }}>
              By continuing, you agree to BabyCare's terms and policies.
            </Typography>
            <Button
              onClick={signupUser}
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
            >
              Signup
            </Button>
          </Box>
        )}
      </Component>
    </Dialog>
  );
}
