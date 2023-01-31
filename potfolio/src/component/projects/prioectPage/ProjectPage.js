import React from "react";
import IconButton from "@mui/material/IconButton";

import arrowLeft from "../../../assets/arrowLeft.svg";
import arrowRight from "../../../assets/arrowRight.svg";
import "./projectPage.css";
import Button from "@mui/material/Button";
import ProjectCard from "../ProjectCard";
import { useSelector, useDispatch } from "react-redux";
import { Category, Page } from "../ProjectSplice.js";
import Divider from "@mui/material/Divider";
function ProjectPage() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const CATEGORY = useSelector((state) => state.projectReducer.Category);
  const CATEGORYARR = useSelector((state) => state.projectReducer.CategoryArr);
  const PROJECTARR = useSelector((state) => state.projectReducer.ProjectsArr);
  const projectImage =
    PROJECTARR[CATEGORYARR.indexOf(CATEGORY)][0]?.categoryImg;

  ////////////////////////////////////////
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] ??= [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const projectsGrouping = groupBy(
    PROJECTARR[CATEGORYARR.indexOf(CATEGORY)],
    "subCategory"
  );

  const subCategoryTitle = [];
  const subProjects = [];
  for (let [key, value] of Object.entries(projectsGrouping)) {
    subCategoryTitle.push(key);
    subProjects.push(value);
  }

  function projectCard(category, index) {
    const selectedProjectArr = subProjects[index];
    return (
      <>
        {selectedProjectArr.length > 3 ? (
          <div className="previous" id="previous">
            <IconButton onClick={() => funPrev(index)}>
              <img src={arrowLeft} alt="arrowLefit" />
            </IconButton>
          </div>
        ) : null}

        {selectedProjectArr.map((e, i) => {
          if (!e.display) return;
          return (
            <ProjectCard
              key={e + i}
              projectImg={e.projectImg}
              gitURL={e.gitRepoLink}
              ProjectURL={e.liveLink}
              type="projects"
              category={e.category}
              projectName={e.projectName}
            />
          );
        })}
        {selectedProjectArr.length > 3 ? (
          <div className="next" id="next">
            <IconButton onClick={() => funNext(index)}>
              <img src={arrowRight} alt="arrowLefit" />
            </IconButton>
          </div>
        ) : null}
      </>
    );
  }
  ///////////////////////////////////////////////

  //  privious next ////
  function funPrev(i) {
    const className = "projects-container" + i;
    document.getElementById(className).scrollBy({
      left: -835,
      behavior: "smooth"
    });
  }

  function funNext(i) {
    const className = "projects-container" + i;
    document.getElementById(className).scrollBy({
      // top: 0,
      left: +835,
      behavior: "smooth"
    });
  }

  // categoryButton
  function categoryButton(category) {
    dispatch(Category(category));
    dispatch(Page("PROJECTS"));
  }

  return (
    <div className="ProjectPage">
      <div className="project-Category-Img">
        <img src={projectImage} alt="img" />
      </div>

      <div className="Project-body">
        <div className="selectedProjectsContainer">
          {subCategoryTitle.map((e, i) => {
            return (
              <div key={e} style={{ marginBottom: "2rem" }}>
                <h1
                  className="projectPg-heading"
                  style={{ marginBottom: "1em" }}
                >
                  {e ? e : CATEGORY}
                </h1>

                <div
                  className="project-container"
                  id={`projects-container${i}`}
                >
                  {projectCard(e, i)}
                </div>
              </div>
            );
          })}
          <Divider />
        </div>

        <div className="Projects-category">
          <h1 className="projectPg-heading"> Categories</h1>

          {CATEGORYARR.map((e, i) => {
            if (e == CATEGORY) return;
            if (PROJECTARR[i][0].isCategoryHidden) return;
            return (
              <Button
                key={e}
                variant="contained"
                onClick={() => categoryButton(e)}
              >
                {e}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
