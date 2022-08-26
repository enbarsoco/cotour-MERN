import { Paper, Container, Typography, Box, Link, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword)
      return toast.error("password should match");
    if (email && password && firstName && lastName && confirmPassword)
      dispatch(register({ formValue, navigate, toast }));
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
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          paddingBottom: 8,
          borderRadius: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="first name"
                autoFocus
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="last name"
                onChange={onInputChange}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirm Password"
            type="password"
            id="confirmPassword"
            onChange={onInputChange}
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
              "Register"
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
            <Link href="/Login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
