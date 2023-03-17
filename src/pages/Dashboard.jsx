import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/cards/BlogCard";
import NavBar from "../components/NavBar";
import useBlogCalls from "../hooks/useBlogCalls";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import dashboardStyle from "./styles/Dashboard.module.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const [blogInfo, setBlogInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs(setBlogInfo);
  }, [blogInfo.length]);

  return (
    <Box className={dashboardStyle["container"]}>
      <NavBar />

      <Grid container spacing={2} p={3} justifyContent="center">
        {blogInfo?.map((blog) => (
          <Grid item key={blog.id}>
            <BlogCard blog={blog} setBlogInfo={setBlogInfo} />
          </Grid>
        ))}
      </Grid>

      <Button
        className={dashboardStyle["new-blog-button"]}
        onClick={() => navigate("/newblog")}
      >
        <p>New Blog</p>
        <AddCircleIcon className={dashboardStyle["button-icon"]} />
      </Button>
    </Box>
  );
};

export default Dashboard;
