import React, { useEffect } from "react";
import {Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography,} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour, getRelatedTours } from "../redux/features/tourSlice";
import moment from "moment";
import RelatedTours from "../components/RelatedTours";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours, loading } = useSelector((state) => ({
    ...state.tour,
  }));
  const { id } = useParams();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);

  if (relatedTours && loading) {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 5 }}>
      <Card sx={{ maxWidth: "100%", p: 1, borderRadius: 3, mb: 10 }}>
        <CardMedia
          component="img"
          alt={tour?.title}
          height="350"
          image={tour?.imageFile}
          title={tour?.title}
          sx={{ borderRadius: 3 }}
        />
        <CardContent>
          <Typography variant={"h3"} align={"center"}>
            {tour?.title}
          </Typography>
          <Typography variant={"body2"} align={"left"}>
            Created By: {tour?.name}
          </Typography>
          <Typography component={"span"}>
            {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
          </Typography>
          <Typography component={"div"} gutterBottom>
            <Grid container>
              <Grid item>
                <CalendarMonthIcon />
              </Grid>
              <Grid item>{moment(tour.createdAt).fromNow()}</Grid>
            </Grid>
          </Typography>
          <Typography variant={"body1"} align={"left"}>
            {tour?.description}
          </Typography>
        </CardContent>
      </Card>
      <RelatedTours relatedTours={relatedTours} tourId={id} />
    </Container>
  );
};

export default SingleTour;
