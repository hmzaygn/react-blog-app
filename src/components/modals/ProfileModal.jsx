import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const ProfileModal = ({
  open,
  setOpen,
  updatedUser,
  setUpdatedUser,
  handleUpdate,
}) => {
  const handleChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Your Profile
        </Typography>
        <TextField
          label="Display Name"
          type="text"
          name="display_name"
          value={updatedUser.display_name || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Bio"
          type="text"
          name="bio"
          multiline
          value={updatedUser.bio || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Avatar URL"
          name="avatar"
          type="url"
          value={updatedUser.avatar || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpdate} sx={{ mr: 2 }}>
          Kaydet
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)}>
          İptal
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
