import { Button, Typography, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  computerIcon,
  defaultImage,
  backIcon,
} from "../resources/images/index";
import { Link } from "react-router-dom";
import { fetchBlogDetail } from "../services/blogService";
import BlogPostDetailSkeleton from "./BlogPostDetailSkeleton";

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDetail, setBlogDetail] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const article = await fetchBlogDetail(id);
        setBlogDetail(article[0]);
      } catch (error) {
        setError("Oops! Failed to fetch data, Please try to refresh the page.");
      }
    };
    getDetail();
  }, [id]);

  const { title, author, publishedAt, description, urlToImage, url } =
    blogDetail || {};
  const articleDate = publishedAt?.split("T")[0];

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!Object.keys(blogDetail).length) {
    return <BlogPostDetailSkeleton />;
  }

  return (
    <>
      <div>
        <div className={"header"}>
          <img src={computerIcon} alt="blogDetail" className="blogIcon" />
          <Typography variant="h3" fontFamily={"roboto"} color={"white"}>
            Tech Blogs!
          </Typography>
        </div>
        <div className="backBtn">
          <Tooltip title={"Back To Post"}>
            <Button variant="text" onClick={() => navigate("/")}>
              <img src={backIcon} alt={"back"} className="backIcon" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="blogDetailContainer">
        <Typography variant="h5" className="blogTitle">
          {title}
        </Typography>
        <div className="articleDetail">
          <Link to={url} className="linkClass">
            <Button variant="text" className="newsBtn">
              <Typography variant="caption">NEWS</Typography>
            </Button>
          </Link>
          {author && (
            <div>
              By
              <Typography variant="caption" color={"#E94E1B"}>
                &nbsp;{author}
              </Typography>
              &nbsp; |
            </div>
          )}
          <div>
            <Typography variant="caption">
              &nbsp;Published at {articleDate}
            </Typography>
          </div>
        </div>
        <img
          src={urlToImage ?? defaultImage}
          alt="blogImg"
          className={`${"blogImg"} ${!urlToImage ? "cardDefaultImg" : ""}`}
        />
        <Typography variant="body1">{description}</Typography>
        <div className="fullBlogBtn">
          <Link to={url} className="linkClass">
            <Button variant="contained" className="newsBtn">
              <Typography variant="caption">Read Full Article..</Typography>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPostDetail;
