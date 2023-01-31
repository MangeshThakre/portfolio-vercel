import React from "react";
//131313
import "./nav.css";
import IconButton from "@mui/material/IconButton";
// import hashnode from "../../assets/hashnode white.png";
// import hashnodeDark from "../../assets/hashnode.png";
import { useState, useCallback } from "react";
import hashnodePrimary from "../../assets/hashnode primary .png";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CodeIcon from "@mui/icons-material/Code";
import skills from "../../assets/skillsimg.png";
import { Page } from "../projects/ProjectSplice.js";
import { useSelector, useDispatch } from "react-redux";
function Nav({
  projectView,
  homeView,
  SkillsView,
  blogView,
  showNavShodow,
  aboutView,
}) {
  const dispatch = useDispatch();
  const PAGE = useSelector((state) => state.projectReducer.Page);

  const styleShadow = showNavShodow
    ? { boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }
    : null;

  return (
    <div className="nav" style={styleShadow}>
      <div className="container">
        <div
          className="nav-left"
          onClick={() => {
            dispatch(Page("DASHBORD"));
            homeView?.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }}
        >
          🤖
        </div>

        {PAGE == "DASHBORD" ? (
          <ul className="nav-right">
            <li
              className="home"
              onClick={() =>
                homeView.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                })
              }
            >
              <HomeIcon color="primary" />
            </li>

            <li
              className="About"
              onClick={() =>
                aboutView.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <AccountCircleIcon color="primary" />
            </li>
            <li
              className="skills"
              onClick={() =>
                SkillsView.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <img src={skills} alt="skills" />
            </li>
            <li
              className="projects"
              onClick={() =>
                projectView.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              <CodeIcon color="primary" />
            </li>
            <li
              className="hashnode"
              onClick={() => {
                blogView.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <img src={hashnodePrimary} alt="hashnode" />
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Nav;
