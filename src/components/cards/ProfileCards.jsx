import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, IconButton } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import ProfileBlogModal from "../modals/ProfileBlogModal";
import useBlogCalls from "../../hooks/useBlogCalls";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ProfileCards({ blog }) {
  const [blogInfo, setBlogInfo] = React.useState(blog);
  const [open, setOpen] = React.useState(false);

  const { getBlogDetail } = useBlogCalls();
  console.log(blog, "render");

  //   React.useEffect(() => {
  //     getBlogDetail(blogInfo.id, setBlogInfo);
  //   }, [blogInfo]);

  return (
    <Card
      sx={{
        minWidth: 275,
        display: "flex",
        justifyContent: "space-between",
        background: blogInfo.status === "D" ? grey[400] : lightGreen[400],
        p: "0 .5rem",
      }}
    >
      <IconButton sx={{ p: 0 }}>
        <Avatar alt="avatar" src={blogInfo?.image} />
      </IconButton>
      <CardContent>
        <Typography variant="body2">{blogInfo?.title}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpen(true)}>
          <EditIcon />
        </Button>
        <ProfileBlogModal
          open={open}
          setOpen={setOpen}
          setBlogInfo={setBlogInfo}
          blogInfo={blogInfo}
        />
      </CardActions>
    </Card>
  );
}
