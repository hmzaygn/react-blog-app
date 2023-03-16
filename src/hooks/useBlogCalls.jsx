import axios from "axios";
import { useAuthContext } from "../contexts/AuthProvider";

const useBlogCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const { currentUser } = useAuthContext();

  const getBlogs = async (setState) => {
    try {
      if (currentUser) {
        const { data } = await axios.get(`${BASE_URL}api/blog/`, {
          headers: { Authorization: `Token ${currentUser?.key}` },
        });
        setState(data);
      } else {
        const { data } = await axios.get(`${BASE_URL}api/blog/`);
        setState(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersBlogs = async (setState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}api/blog/ownblogs/`, {
        headers: { Authorization: `Token ${currentUser?.key}` },
      });
      setState(data);
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

  const postComment = async (commentData) => {
    try {
      await axios.post(`${BASE_URL}api/comment/`, commentData, {
        headers: { Authorization: `Token ${currentUser?.key}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async (blogDetailInfo) => {
    try {
      await axios.put(
        `${BASE_URL}api/blog/update/${blogDetailInfo.id}/`,
        blogDetailInfo,
        {
          headers: { Authorization: `Token ${currentUser?.key}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${BASE_URL}api/blog/delete/${id}/`, {
        headers: { Authorization: `Token ${currentUser?.key}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}api/comment/${id}/`, {
        headers: { Authorization: `Token ${currentUser?.key}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBlogs,
    getUsersBlogs,
    getBlogDetail,
    like,
    postComment,
    updateBlog,
    deleteBlog,
    deleteComment,
  };
};

export default useBlogCalls;
