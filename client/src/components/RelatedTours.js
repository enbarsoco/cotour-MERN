import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { excerpt } from "../utility";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <Typography variant={"overline"} >Related Tours:</Typography>}
          <Grid  container justifyContent={"space-between"}>
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => (
                <Grid key={item._id }>
                  <Card>
                    <CardActionArea
                      href={`./${item._id}`}
                      style={{ width: "250px", height: "250px" }}
                    >
                      <CardMedia
                        component="img"
                        alt={item.title}
                        height="140"
                        image={item.imageFile}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {excerpt(item.description, 30)}
                          <span style={{ color: "#556abe" }}>Click to enter</span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default RelatedTours;
