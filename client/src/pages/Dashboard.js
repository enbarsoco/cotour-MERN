import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  Container,
  Typography,
  Box,
  CardContent,
  CardMedia,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 44) + "...";
    }
    return str;
  };

  if (loading) {
    return (
      <Container
        sx={{ mt: 30, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress
          size={"4rem"}
          color={"info"}
          variant={"indeterminate"}
        />
      </Container>
    );
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  return (
    <Container maxWidth={"md"} sx={{ mt: 8, mb: 5 }}>
      <Typography align={"center"} variant={"h4"}>
        Dashboard: {user?.result?.name}
      </Typography>
      <hr style={{ opacity: "20%", maxWidth: "700px" }} />
      {userTours.length === 0 && (
        <Typography variant={'h5'} align={"center"}>No Tours available yet</Typography>
      )}

      {userTours &&
        userTours.map((item) => (
          <Card
            sx={{
              display: "flex",
              mb: 1.5,
              maxWidth: 650,
              margin: "10px auto",
            }}
            key={item._id}
          >
            <CardMedia
              component="img"
              sx={{
                width: 161,
                height: 140,
                borderRadius: 4,
                p: "5px 5px 5px 5px",
              }}
              image={item.imageFile}
              alt={item.title}
            />
            <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {excerpt(item.description)}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mr: 2,
                ml: 3,
              }}
            >
              <Link to={`/editTour/${item._id}`}>
                <Tooltip title={"edit"} arrow>
                  <IconButton>
                    <EditIcon fontSize={"large"} color={"info"} />
                  </IconButton>
                </Tooltip>
              </Link>
              <br />
              <Tooltip title="Delete" arrow>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <DeleteIcon fontSize={"large"} color={"warning"} />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
    </Container>
  );
};

export default Dashboard;
