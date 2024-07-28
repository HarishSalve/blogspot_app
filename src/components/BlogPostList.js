import { useEffect, useState, useParams } from "react";
import { NO_DATA } from "./../constant";
import BlogPostItem from "./BlogPostItem";
import BlogPostItemSkeleton from "./BlogPostItemSkeleton";
import { Link } from "react-router-dom";
import { Pagination, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { blogLogo } from "../resources/images";
import { fetchData } from "../services/blogService";

const BlogPostList = () => {
  const [blogData, setBlogData] = useState([]);
  const [page, setPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(page);
      setBlogData(data?.articles);
    //   setTotalPages(Math.ceil(data?.totalResults / 12 > 100 ? 100 : data?.totalResults / 12));
    };
    getData();
  }, [page]);

  const handleChange = (e, value) => {
    console.log(e, value);
    setPage(value);
    window.scroll({top:0, behavior:'smooth'})
  };
  if (blogData?.length === 0) {
    return <BlogPostItemSkeleton />;
  }
  return (
    <div className="container">
      <div className={"header"}>
        <img src={blogLogo} alt="blogIcon" className="blogIcon" />
        <Typography variant="h3" fontFamily={"serif"}>
          BlogSpot
        </Typography>
      </div>
      <Container className="containerClass">
      <div className="blogContainer">
        {blogData?.map((blog, index) => (
          <>
            {blog?.title !== NO_DATA ? (
              <Link
                to={`/post/${encodeURIComponent(blog?.url)}`}
                key={blog?.url}
                className={"linkClass"}
              >
                <BlogPostItem
                  articleData={blog}
                  title={blog?.title}
                  description={blog?.description}
                  author={blog?.author}
                  image={blog?.urlToImage}
                />
              </Link>
            ) : null}
          </>
        ))}
      </div>
      <div className="paginationClass">
        <Pagination
          page={page}
          count={8}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
      </Container>
    </div>
  );
};

export default BlogPostList;
