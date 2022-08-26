import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      maxWidth={"md"}
      sx={{ mt: 8, display: "flex", flexDirection: "column" }}
    >
      <Typography variant={"h2"} align={"center"}>
        Page Not Found 404
      </Typography>
      <Button variant={"contained"} sx={{ margin: "5vh auto " }} href={"/"}>
        Back To Home page
      </Button>
    </Container>
  );
};

export default NotFound;
