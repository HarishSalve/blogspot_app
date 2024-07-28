import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { defaultImage } from "../resources/images/index";

const BlogPostItem = ({ articleData, title, description, author, image }) => {
  return (
    <>
      <Card className={"card"}>
        <CardMedia
          component="img"
          height="140"
          image={image || defaultImage}
          className={{ cardDefaultImg: !image }}
          alt={articleData?.source?.name ?? "noimage"}
        />
        <CardContent className="cardContentDesign">
          <Typography variant="h6" className={"cardTitle"}>
            {title}
          </Typography>
          <div className={"description"}>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </div>
          <Typography variant="caption" color="text.primary">
            {author}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default BlogPostItem;
