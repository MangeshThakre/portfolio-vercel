import React from "react";
import "./projects.css";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import { useSelector, useDispatch } from "react-redux";
import { Category, Page } from "./ProjectSplice.js";
function ProjectCard({
  projectImg,
  gitURL,
  ProjectURL,
  category = "",
  type,
  projectsNo = "",
  projectName = "",
}) {
  const dispatch = useDispatch();

  const CATEGORY = useSelector((state) => state.projectReducer.Category);

  function click() {
    if ((type = "category")) {
      dispatch(Category(category));
      dispatch(Page("PROJECTS"));
    }
  }

  return (
    <>
      {type == "category" ? (
        <div className="category-box" onClick={() => click()}>
          <div>
            <img src={projectImg} alt="project 14" />
            <div className="category-box-cover">
              <p>See All {projectsNo} Projects</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="porjects-box" onClick={() => click()}>
          <div>
            <div className="porjects-box-cover">
              <a href={ProjectURL} target="_blank">
                <IconButton color="primary">
                  <LinkIcon fontSize="large" />
                </IconButton>
              </a>
              <a href={gitURL} target="_blank">
                <IconButton color="primary">
                  <GitHubIcon fontSize="large" />
                </IconButton>
              </a>
            </div>
            <img src={projectImg} alt="project 14" />
            <h5>{projectName}</h5>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
