import axios from "axios";

const useBlogCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";

  const getBlogs = async (setBlogInfo) => {
    try {
      const { data } = await axios.get(`${BASE_URL}api/blog/`);
      setBlogInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getBlogs };
};

export default useBlogCalls;
