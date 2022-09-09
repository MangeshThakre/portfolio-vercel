import React from "react";

function BlogCard({ title, coverImage, brief, slug }) {
  const Post_URL = "https://mangeshthakre.hashnode.dev/" + slug;

  return (
    <div className="blogCard" id="blogCard">
      <div>
        <a className="postUrl" href={Post_URL} target="_blank">
          <img className="blogimg" src={coverImage} alt={slug} />
        </a>

        <div className="blogCard-content">
          <h4>{title}</h4>
          <p>
            {brief.slice(0, 90)} .......
            <a className="postUrl" href={Post_URL} target="_blank">
              Read More...
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
