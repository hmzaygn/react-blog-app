import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import useBlogCalls from "../hooks/useBlogCalls";
import Box from "@mui/material/Box";
import DetailCard from "../components/DetailCard";
import { Container } from "@mui/material";

const Details = () => {
  const { id } = useParams();
  const { getBlogDetail } = useBlogCalls();
  const [blogDetailInfo, setBlogDetailInfo] = useState("");

  useEffect(() => {
    getBlogDetail(id, setBlogDetailInfo);
  }, []);

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid red",
        }}
      >
        <DetailCard
          blogDetailInfo={blogDetailInfo}
          setBlogDetailInfo={setBlogDetailInfo}
        />
      </Container>
    </>
  );
};

export default Details;
