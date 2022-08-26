import { Paper, Container, Typography, Box, Link, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    console.log(tourData.tags);
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          paddingBottom: 5,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {id ? "Update Tour" : "New Tour"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Title"
            name="title"
            value={title}
            type="text"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="Description"
            type="text"
            multiline
            error={false}
          />
          <ChipInput
            margin="normal"
            name="tags"
            value={tags}
            variant="outlined"
            placeholder="tags"
            fullWidth
            required
            onAdd={(tag) => handleAddTag(tag)}
            onDelete={(tag) => handleDeleteTag(tag)}
            style={{ marginBottom: "5vh" }}
          />
          <Box
            component={"div"}
            alignItems={"left"}
            display={"flex"}
            justifyContent={"left"}
          >
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setTourData({ ...tourData, imageFile: base64 })
              }
            ></FileBase>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 6, mb: 0 }}
          >
            {id ? "Update" : "Add"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEditTour;
