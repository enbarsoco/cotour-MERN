import { Paper, Container, Typography, Box, Link, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) dispatch(login({ formValue, navigate, toast }));
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          paddingBottom: 8,
          borderRadius: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress color={"inherit"} size={18} />
            ) : (
              "Sign In"
            )}
          </Button>
          <Typography
            align={"center"}
            sx={{
              borderTop: "solid",
              borderBlockStartWidth: "1px",
              borderBlockStartColor: "#cbcece",
              mt: 1,
              pt: 2,
            }}
          >
            <Link href="/Register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
