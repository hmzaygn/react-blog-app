import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import useBlogCalls from "../hooks/useBlogCalls";
import DetailCard from "../components/cards/DetailCard";
import { Container } from "@mui/material";
import UpdateModal from "../components/modals/UpdateModal";

const Details = () => {
  const { id } = useParams();
  const { getBlogDetail } = useBlogCalls();
  const [blogDetailInfo, setBlogDetailInfo] = useState("");
  const [open, setOpen] = React.useState(false);

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
        <UpdateModal
          open={open}
          setOpen={setOpen}
          blogDetailInfo={blogDetailInfo}
          setBlogDetailInfo={setBlogDetailInfo}
        />
        <DetailCard
          blogDetailInfo={blogDetailInfo}
          setBlogDetailInfo={setBlogDetailInfo}
          setOpen={setOpen}
          open={open}
        />
      </Container>
    </>
  );
};

export default Details;
