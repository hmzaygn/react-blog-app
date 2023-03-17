import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import useBlogCalls from "../../hooks/useBlogCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export default function ProfileBlogModal({ open, setOpen, blog_id }) {
  const [modalInfo, setModalInfo] = React.useState("");
  const { updateBlog, getBlogDetail } = useBlogCalls();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setModalInfo({ ...modalInfo, [name]: value });
  };

  React.useEffect(() => {
    getBlogDetail(blog_id, setModalInfo);
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            type="text"
            name="title"
            variant="filled"
            label="Title"
            value={modalInfo?.title || ""}
            onChange={handleChange}
          />
          <TextField
            type="text"
            multiline
            name="content"
            variant="filled"
            label="Content"
            value={modalInfo?.content || ""}
            onChange={handleChange}
          />
          <TextField
            type="url"
            name="image"
            variant="filled"
            label="Image"
            value={modalInfo?.image || ""}
            onChange={handleChange}
          />
          <Select
            labelId="demo-simple-select-label"
            name="status"
            value={modalInfo?.status || ""}
            onChange={handleChange}
          >
            <MenuItem value="P">Publish</MenuItem>
            <MenuItem value="D">Draft</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={() => (updateBlog(modalInfo), setOpen(false))}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
