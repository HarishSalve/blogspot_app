import { Button, Typography } from "@mui/material";
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

  useEffect(() => {
    const getDetail = async () => {
      const article = await fetchBlogDetail(id);
      setBlogDetail(article[0]);
    };
    getDetail();
  }, [id]);

  const { title, author, publishedAt, description, urlToImage, url, source } =
    blogDetail || {};
    const articleDate = publishedAt?.split("T")[0];
console.log(blogDetail)
    if(!Object.keys(blogDetail)){
      return <BlogPostDetailSkeleton />
    }

  return (
    <>
      <div>
        <div className={"header"}>
          <img src={computerIcon} alt="blogDetail" className="blogIcon" />
          <Typography variant="h3" fontFamily={"roboto"}>
            Tech Blogs!
          </Typography>
        </div>
        <div className="backBtn">
          <Button variant="text" onClick={() => navigate("/")}>
            <img src={backIcon} alt={"back"} className="backIcon" />
          </Button>
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
          By
          <Typography variant="caption" color={"#E94E1B"}>
            &nbsp;{author}
          </Typography>
          &nbsp; |
          <Typography variant="caption"> Published at {articleDate}</Typography>
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
