import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import useBlogCalls from "../hooks/useBlogCalls";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const [blogInfo, setBlogInfo] = useState([]);

  console.log(blogInfo);

  useEffect(() => {
    getBlogs(setBlogInfo);
  }, []);

  return (
    <div>
      <NavBar />
      <Grid container spacing={2} p={3}>
        {blogInfo?.map((blog) => (
          <Grid item key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
