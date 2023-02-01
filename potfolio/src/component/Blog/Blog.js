import React from "react";
import "./Blog.css";
import BlogCard from "./BlogCard";
import axios from "axios";
import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrowRight.svg";
import IconButton from "@mui/material/IconButton";

import { useState, useEffect, useRef } from "react";

function Blog() {
  const [isLoading, setIsloading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const blogcontainer = useRef(null);
  useEffect(() => {
    hashnodeApi();
  }, []);

  async function hashnodeApi() {
    setIsloading(true);
    const query = `
    query GetUserArticles($page: Int) {
      user(username: "mangeshthakre") {
          publication {
              posts(page: $page) {
                  title
                  brief
                  slug
                  coverImage
              }
          }
      }}`;
    const variables = { page: 0 };
    try {
      const response = await axios({
        url: "https://api.hashnode.com/",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: { query, variables }
      });

      const data = await response.data;
      setIsloading(false);
      setBlogData(data.data.user.publication.posts);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  }

  // console.log(blogData.brief);

  function funPrev() {
    blogcontainer.current.scrollBy({
      left: -835,
      behavior: "smooth"
    });
  }

  function funNext() {
    blogcontainer.current.scrollBy({
      left: +835,
      behavior: "smooth"
    });
  }
  ///hello
  return (
    <div className="blog-section">
      <div className="head">
        <p>BLOGS</p>
        <h1>Technical blogs</h1>
      </div>
      <div className="blog-container" ref={blogcontainer}>
        <div className="previous" id="previous">
          <IconButton onClick={() => funPrev()}>
            <img src={arrowLeft} alt="arrowLefit" />
          </IconButton>
        </div>

        {blogData.map((e, i) => {
          return (
            <BlogCard
              key={i}
              title={e.title}
              coverImage={e.coverImage}
              brief={e.brief}
              slug={e.slug}
            />
          );
        })}

        <div className="next" id="next">
          <IconButton onClick={() => funNext()}>
            <img src={arrowRight} alt="arrowLefit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export default Blog;
