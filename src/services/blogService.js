import { BLOG_URL, API_KEY } from "../constant";

export const fetchData = async (page = 1) => {
  try {
    const url = `${BLOG_URL}page=${page}&pageSize=${12}&apiKey=${API_KEY}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBlogDetail = async (id) => {
  try {
    const url = `${BLOG_URL}apiKey=${API_KEY}`;
    const response = await fetch(`${url}`);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const article = data?.articles?.filter((blog) => blog?.url === id);
    return article;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
