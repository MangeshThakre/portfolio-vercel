import { getAppBarUtilityClass } from "@mui/material";
import React from "react";
import "./project.css";
import { useState } from "react";
import Button from "@mui/material/Button";
function Projects({
  projects,
  setCategory,
  setIsNewCategory,
  setCategoryImg,
  setProjectName,
  setLiveLink,
  setGithub,
  setProjectImg,
  setDisplay,
  setResponsive,
  setLiveProjectImg,
  setLiveCategoryImg,
  setIsEdit,
  setIsSubcategory,
  setSubcategory,
}) {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "",
    display: false,
  });
  const URL = process.env.REACT_APP_API_URL;

  let category = [];
  let projectArr = [];

  for (const [key, value] of Object.entries(projects)) {
    category = [...category, key];
    projectArr.push(value);
  }

  function editProject(e) {
    setIsEdit({ id: e._id, edit: true });

    setCategory(e.category);
    setCategoryImg({ live: e.categoryImg });
    setProjectName(e.projectName);
    setLiveLink(e.liveLink);
    setGithub(e.gitRepoLink);
    setProjectImg({ live: e.projectImg });
    setDisplay(e.display);
    setResponsive(e.responsive);
    setLiveProjectImg(e.projectImg);
    setLiveCategoryImg(e.categoryImg);
    setIsSubcategory(e.isSubcategory);
    setSubcategory(e.subCategory);
  }

  function deleteProject(id) {
    console.log(id);
  }

  function categorys(e) {
    let categoryImg =
      URL + "/" + projectArr[category.indexOf(e)][0].categoryImg;
    let selectedProjects = projectArr[category.indexOf(e)];
    return (
      <>
        {/* category card */}
        <div
          className="category"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelectedCategory({
              category: e,
              display: !selectedCategory.display,
            })
          }
        >
          <h2 style={{ marginBottom: "1rem" }}>{e}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10%" }}>
            <img
              src={categoryImg}
              style={{ width: "10rem", height: "80px", objectFit: "cover" }}
              alt="img"
            />
            <div>
              <h3>Total Project : {projectArr[category.indexOf(e)].length}</h3>
            </div>
          </div>
        </div>
        {/* categoru card end */}
        {/* project list */}
        <div
          className={
            selectedCategory.category === e ? "show_paoject" : "hide_project"
          }
        >
          {selectedProjects.map((e, i) => {
            return (
              <div key={i} className="project_card">
                <img
                  src={URL + "/" + e.projectImg}
                  alt={e.projectName}
                  style={{ width: "10rem", height: "80px", objectFit: "cover" }}
                />
                <div>
                  {e.isSubcategory ? (
                    <h3 style={{ marginBottom: "10px" }}>
                      {" "}
                      SubCategory : {e.subCategory}
                    </h3>
                  ) : null}
                  <h4>{e.projectName}</h4>
                  <p>
                    LiveLink :
                    <a href={e.liveLink} target="_blank">
                      {e.liveLink}
                    </a>
                  </p>
                  <p>
                    Repository :
                    <a href={e.gitRepoLink} target="_blank">
                      {e.gitRepoLink}
                    </a>
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <p>Display : {String(e.display)}</p>
                      <p>Responsive : {String(e.responsive)}</p>
                    </div>
                    <div>
                      <Button
                        sx={{ marginRight: "1rem" }}
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => editProject(e)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => deleteProject(e)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* project card end */}
      </>
    );
  }

  return (
    <div className="projects">
      {category.map((e) => {
        return <div key={e}>{categorys(e)}</div>;
      })}
    </div>
  );
}

export default Projects;
