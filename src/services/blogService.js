import { BLOG_URL, API_KEY } from "../constant";

export const fetchData = async (page = 1) => {
  const url = `${BLOG_URL}page=${page}&pageSize=${12}&apiKey=${API_KEY}`;
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};


export const fetchBlogDetail = async (id) => {
    const url = `${BLOG_URL}apiKey=${API_KEY}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log(data);
    const article = data?.articles?.filter((blog) => blog?.url === id);
    return article;
  };
