import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BarChartIcon from "@mui/icons-material/BarChart";
import cardStyle from "./styles/BlogCard.module.css";
import { Box } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DetailCard({ blogDetailInfo }) {
  //   const { like, getBlogs } = useBlogCalls();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(blogDetailInfo);

  const handleClick = () => {
    // like(blog?.id);
    // getBlogs(setBlogInfo);
  };

  return (
    <Card sx={{ width: "70%" }}>
      <CardMedia
        component="img"
        height="194"
        image={blogDetailInfo?.image}
        alt={blogDetailInfo?.title}
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blogDetailInfo?.author?.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={blogDetailInfo?.author?.toUpperCase()}
        subheader={new Date(blogDetailInfo?.published_date).toDateString()}
      />

      <CardContent>
        <Typography variant="h5">{blogDetailInfo?.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {blogDetailInfo?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <FavoriteIcon sx={{ color: blogDetailInfo?.has_liked && "red" }} />
          <Typography variant="body2" color="text.secondary">
            {blogDetailInfo?.like_count}
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <BarChartIcon />
          <Typography variant="body2" color="text.secondary">
            {blogDetailInfo?.get_view_count}
          </Typography>
        </IconButton>
      </CardActions>
      <Box>
        <Typography variant="h5">Comments</Typography>
        {blogDetailInfo?.comments?.map((item, index) => (
          <Box
            key={index}
            sx={{
              background: grey[300],
              margin: ".5rem",
              padding: ".5rem",
              display: "flex",
            }}
          >
            <Box>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {item.user.slice(0, 1).toUpperCase()}
              </Avatar>
            </Box>
            <Box>
              <Typography paragraph>{item.user}</Typography>
              <hr />
              <Typography paragraph>{item.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
