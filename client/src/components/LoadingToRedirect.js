import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <Container maxWidth={"md"} sx={{ mt: 8 }}>
      <Typography variant={"h5"} align={"center"}>
        Redirecting you in {count}
      </Typography>
    </Container>
  );
};

export default LoadingToRedirect;
