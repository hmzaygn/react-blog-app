import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
// import { useAuthContext } from "../contexts/AuthProvider";
import useBlogCalls from "../hooks/useBlogCalls";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const [blogInfo, setBlogInfo] = useState([]);
  const navigate = useNavigate();

  // const { currentUser } = useAuthContext();

  // console.log(blogInfo);

  useEffect(() => {
    getBlogs(setBlogInfo);
  }, []);

  // console.log(currentUser);

  return (
    <div>
      <NavBar />
      <Grid container spacing={2} p={3}>
        {blogInfo?.map((blog) => (
          <Grid
            item
            key={blog.id}
            onClick={() => navigate(`/details/${blog?.id}`)}
          >
            <BlogCard blog={blog} setBlogInfo={setBlogInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
