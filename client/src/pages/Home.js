import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTours,
  searchTours,
  setCurrentPage,
} from "../redux/features/tourSlice";
import {
  Box, Card,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import CardTour from "../components/CardTour";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Paging from "../components/Pagination";

const Home = () => {
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return (
      <Container
        // maxWidth="xs"
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

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ mb: 3, textAlign: { xs: "center", md: "right" } }}
        maxWidth="lg"
      >
        <TextField
          sx={{ width: { xs: "100%", md: "20%" } }}
          variant={"outlined"}
          placeholder={"Search Tour..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {tours.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Tours Found</h1>
      )}
      <Grid container justifyContent={"space-around"} spacing={5}>
        {tours &&
          tours.map((item, index) => (
            <Grid item key={index}>
              <CardTour {...item} />
            </Grid>
          ))}
      </Grid>
      {tours?.length > 0 && (
        <Paging
          setCurrentPage={setCurrentPage}
          numberOfPages={Number(numberOfPages)}
          currentPage={Number(currentPage)}
          dispatch={dispatch}
        />
      )}
    </Container>
  );
};

export default Home;
