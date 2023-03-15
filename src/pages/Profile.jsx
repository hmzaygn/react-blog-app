import { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../contexts/AuthProvider";
import defaultAvatar from "../assets/blank-profile-picture-973460_1280.png";

const Profile = () => {
  const { currentUser } = useAuthContext();
  console.log(currentUser);
  // kullanıcının mevcut bilgilerini state olarak tutuyoruz
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://via.placeholder.com/150",
  });

  // modalın açılıp kapanmasını kontrol etmek için state kullanıyoruz
  const [open, setOpen] = useState(false);

  // kullanıcının bilgilerini güncellemek için state kullanıyoruz
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    image: user.image,
  });

  // kullanıcının bilgilerini güncelliyoruz ve modalı kapatıyoruz
  const handleUpdate = () => {
    setUser(updatedUser);
    setOpen(false);
  };

  // kullanıcının bilgilerini güncellemek için form içindeki inputların onChange metodunu kullanıyoruz
  const handleChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Avatar
          alt={currentUser?.first_name}
          src={currentUser.avatar || defaultAvatar}
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography variant="h5" sx={{ mb: 2 }}>
          {currentUser?.first_name} {currentUser?.last_name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {currentUser?.email}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {currentUser?.display_name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {currentUser?.bio}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Update Infos
        </Button>
        {/* <Modal open={open} onClose={() => setOpen(false)}>
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
              Bilgileri Güncelle
            </Typography>
            <TextField
              label="Ad Soyad"
              name="name"
              defaultValue={user.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="E-posta"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Resim URL"
              name="image"
              defaultValue={user.image}
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
        </Modal> */}
      </Box>
    </>
  );
};

export default Profile;
