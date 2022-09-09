import React from "react";
import "./projects.css";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrowRight.svg";
import ProjectCard from "./ProjectCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryArr, ProjectsArr } from "./ProjectSplice";
import axios from "axios";

function Projects() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [projectContainer, setProjectContainer] = useState("");
  const firstView = document.getElementById("firstView");
  const lastView = document.getElementById("lastView");

  const [isFetchProjectLoading, setIsFetchProjectLoading] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [porjectsArr, setProjectsArr] = useState([]);

  const CATEGORYARR = useSelector((state) => state.projectReducer.CategoryArr);
  const PROJECTARR = useSelector((state) => state.projectReducer.ProjectsArr);

  useEffect(() => {
    setProjectContainer(document.getElementById("project-container"));
    setPrevious(document.getElementById("previous"));
    setNext(document.getElementById("next"));
    fetchProjects();
  }, []);

  //   fetch all projects
  async function fetchProjects() {
    setIsFetchProjectLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/fetchProject",
        headers: { "content-type": "application/json" },
      });
      const data = await response.data.projects;
      let carr = [];
      let parr = [];
      for (const [key, value] of Object.entries(data)) {
        carr.push(key);
        parr.push(value);
      }
      // setCategories(carr);
      // setProjectsArr(parr);
      dispatch(CategoryArr(carr));
      dispatch(ProjectsArr(parr));

      setIsFetchProjectLoading(false);
    } catch (error) {
      setIsFetchProjectLoading(false);
      console.log(error);
    }
  }
  //  fetch all projects end

  //  privious next ////
  function funPrev() {
    projectContainer.scrollBy({
      left: -835,
      behavior: "smooth",
    });
  }

  function funNext() {
    projectContainer.scrollBy({
      // top: 0,
      left: +835,
      behavior: "smooth",
    });
  }

  let observer1 = new IntersectionObserver((e) => {
    if (e[0].isIntersecting == true) {
      previous.style.display = "none";
    } else {
      previous.style.display = "block";
    }
  });
  let observer2 = new IntersectionObserver((e) => {
    if (e[0].isIntersecting == true) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  });

  window.onload = function () {
    observer1.observe(firstView);
    observer2.observe(lastView);
  };

  //  end previous next ////

  return (
    <div className="Project-section">
      <div className="head">
        <p>PROJECTS</p>
        <h1>What I've Build</h1>
      </div>
      <div className="project-container" id="project-container">
        {isFetchProjectLoading ? (
          <Skeleton
            variant="rounded"
            width={400}
            height={200}
            sx={{ margin: "0 2rem" }}
          />
        ) : (
          <>
            {CATEGORYARR.length > 3 ? (
              <div className="previous" id="previous">
                <IconButton onClick={() => funPrev()}>
                  <img src={arrowLeft} alt="arrowLefit" />
                </IconButton>
              </div>
            ) : null}

            {CATEGORYARR.map((e, i, a) => {
              const projectImage = URL + "/" + PROJECTARR[i][0].categoryImg;
              const projectsNo = PROJECTARR[i].length;
              return (
                <ProjectCard
                  key={e}
                  type={"category"}
                  category={e}
                  projectImg={projectImage}
                  projectsNo={projectsNo}
                />
              );
            })}
          </>
        )}

        {CATEGORYARR.length > 3 ? (
          <div className="next" id="next">
            <IconButton onClick={() => funNext()}>
              <img src={arrowRight} alt="arrowLefit" />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Projects;
