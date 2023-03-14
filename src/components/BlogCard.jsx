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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";
import cardStyle from "./styles/BlogCard.module.css";
import useBlogCalls from "../hooks/useBlogCalls";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

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

export default function BlogCard({ blog, setBlogInfo }) {
  const { like, getBlogs } = useBlogCalls();
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(blog);

  const handleClick = () => {
    like(blog?.id);
    getBlogs(setBlogInfo);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box onClick={() => navigate(`/details/${blog?.id}`)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {blog.author[0].toUpperCase()}
            </Avatar>
          }
          title={blog.author}
          subheader={new Date(blog?.published_date).toDateString()}
        />
        <CardMedia
          component="img"
          height="194"
          image={blog?.image}
          alt={blog?.title}
        />
        <CardContent>
          <Typography variant="h5">{blog?.title}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={cardStyle["content"]}
          >
            {blog?.content}
          </Typography>
        </CardContent>
      </Box>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClick}>
          <FavoriteIcon sx={{ color: blog.has_liked && "red" }} />
          <Typography variant="body2" color="text.secondary">
            {blog?.like_count}
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <BarChartIcon />
          <Typography variant="body2" color="text.secondary">
            {blog?.get_view_count}
          </Typography>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <Typography paragraph>{blog?.comments[0]}</Typography>
          <Typography paragraph>{blog?.comments[1]}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
