import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";

const useBlogCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const { currentUser } = useAuthContext();

  const getBlogs = async (setBlogInfo) => {
    try {
      if (currentUser) {
        const { data } = await axios.get(`${BASE_URL}api/blog/`, {
          headers: { Authorization: `Token ${currentUser?.key}` },
        });
        setBlogInfo(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}api/blog/`);
        setBlogInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogDetail = async (id, setBlogDetailInfo) => {
    try {
      const { data } = await axios.get(`${BASE_URL}api/blog/${id}`, {
        headers: { Authorization: `Token ${currentUser?.key}` },
      });
      setBlogDetailInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const like = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}api/like/`,
        { blog_id: id },
        {
          headers: { Authorization: `Token ${currentUser?.key}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { getBlogs, getBlogDetail, like };
};

export default useBlogCalls;
