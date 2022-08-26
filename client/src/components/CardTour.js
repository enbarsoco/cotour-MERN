import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ThumbUpOutlined, ThumbUpAlt } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";
import { Tooltip } from "@mui/material";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const userId = user?.result?._id;
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          {likes.length > 2 ? (
            <Tooltip
              title={`You and ${likes.length - 1} other people likes`}
              arrow
            >
              <Button
                size="small"
                style={{ float: "right", textTransform: "none" }}
                startIcon={<ThumbUpAlt color={"primary"} />}
                color={"primary"}
                onClick={handleLike}
              >
                {likes.length} Likes
              </Button>
            </Tooltip>
          ) : (
            <Tooltip
              arrow
              title={`${
                likes.length > 1
                  ? `You and ${likes.length - 1} other people likes`
                  : "You Liked it"
              }`}
              arrow
            >
              <Button
                size="small"
                style={{ float: "right", textTransform: "none" }}
                startIcon={<ThumbUpAlt color={"primary"} />}
                color={"primary"}
                onClick={!user?.result ? null : handleLike}
              >
                {`${likes.length} Like${likes.length > 1 ? "s" : ""}`}
              </Button>
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <Tooltip
            arrow
            title={`${user?.result ? "" : "Please login to like this tour"}`}
          >
            <Button
              size="small"
              style={{ float: "right", textTransform: "none" }}
              startIcon={<ThumbUpOutlined color={"primary"} />}
              color={"primary"}
              onClick={!user?.result ? null : handleLike}
            >
              {`${likes.length} ${likes.length === 1 ? "Like" : "Likes"}`}
            </Button>
          </Tooltip>
        </>
      );
    }
    return (
      <>
        <Tooltip
          arrow
          title={`${user?.result ? "" : "Please login to like this tour"}`}
        >
          <Button
            size="small"
            style={{ float: "right", textTransform: "none" }}
            startIcon={<ThumbUpOutlined color={"primary"} />}
            color={"primary"}
            onClick={!user?.result ? null : handleLike}
          >
            Like
          </Button>
        </Tooltip>
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <Card>
      <CardActionArea
        href={`/tour/${_id}`}
        style={{ width: "300px", height: "300px" }}
      >
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imageFile}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{tags.map((item) => `#${item} `)}</Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {excerpt(description)}
            <span style={{ color: "#556abe" }}>Read More</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Likes />
    </Card>
  );
};

export default CardTour;
