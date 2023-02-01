import React from "react";
import "./Admin.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import Projects from "./projects/projects";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
function Admin() {
  const URL = process.env.REACT_APP_API_URL;

  // category
  const [category, setCategory] = useState("NEW");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categoryImg, setCategoryImg] = useState("");
  const [projectImg, setProjectImg] = useState("");
  const [projectName, setProjectName] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [gitHub, setGithub] = useState("");
  const [display, setDisplay] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [isCategoryHidden, setIsCategoryHidden] = useState(false);
  const [ProjectDiscroption, setProjectDiscription] = useState("");
  const [isEdit, setIsEdit] = useState({ id: "", edit: false });
  const [liveCategoryImg, setLiveCategoryImg] = useState("");
  const [liveProjectImg, setLiveProjectImg] = useState("");
  //  sub category
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [subCategory, setSubcategory] = useState("");

  const [projects, setProjects] = useState({});
  //
  const [isLoading, setIsLoading] = useState(false);
  let categoryArr = [];
  let projectArr = [];
  for (const [key, value] of Object.entries(projects)) {
    categoryArr = [...categoryArr, key];
    projectArr.push(value);
  }

  useEffect(() => {
    if (categoryArr.includes(category)) {
      setCategoryImg(projectArr[categoryArr.indexOf(category)][0].categoryImg);
      setLiveCategoryImg(
        projectArr[categoryArr.indexOf(category)][0].categoryImg
      );
    }
    if (category === "NEW") {
      setCategoryImg("");
    }
  }, [category]);

  useEffect(() => {
    if (isSubcategory == false) {
      setSubcategory("");
    }
  }, [isSubcategory]);

  // fetch projects

  useEffect(() => {
    fetchProjects();
  }, []);
  // fetch  project data
  async function fetchProjects() {
    const response = await axios({
      method: "get",
      url: URL + "/api/fetchProject",
      headers: { "content-type": "application/json" }
    });
    const data = await response.data;
    setProjects(data.projects);
  }

  // category functionalities
  function funCategory(e) {
    if (e === "NEW") {
      setIsNewCategory(true);
    } else {
      setIsNewCategory(false);
      setCategory(e);
    }
  }

  // submit
  async function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    let updateCatecory = false;
    if (isEdit.edit) {
      if (
        categoryImg !=
          projectArr[categoryArr.indexOf(category)][0].categoryImg ||
        isCategoryHidden !=
          projectArr[categoryArr.indexOf(category)][0].isCategoryHidden
      ) {
        updateCatecory = true;
      } else {
        updateCatecory = false;
      }
      const projectData = {
        category,
        categoryImg,
        isCategoryHidden,
        isSubcategory,
        subCategory,
        projectImg,
        projectName,
        liveLink,
        gitHub,
        ProjectDiscroption,
        display,
        responsive
      };
      try {
        const response = await axios({
          method: "post",
          url:
            URL +
            "/api/edit_project?id=" +
            isEdit.id +
            "&updateCatecory=" +
            updateCatecory,
          headers: { "content-type": "application/json" },
          data: projectData
        });
        const data = await response.data;
        window.location.reload();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      try {
        const projectData = {
          category,
          categoryImg,
          isCategoryHidden,
          isSubcategory,
          subCategory,
          projectImg,
          projectName,
          liveLink,
          gitHub,
          ProjectDiscroption,
          display,
          responsive
        };
        console.log(projectData);
        const response = await axios({
          method: "post",
          url: URL + "/api/insert_project",
          headers: { "content-type": "application/json" },
          data: projectData
        });
        const data = await response.data;
        window.location.reload();

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  return (
    <div className="Admin">
      <div className="containerr">
        <div className="Head" style={{ margin: "2rem" }}>
          <h1>ADMIN PANEL</h1>
        </div>

        <div style={{ display: "flex" }}>
          <form onSubmit={(e) => submit(e)}>
            <label htmlFor="Category">Choose Category</label>
            <select
              name="category"
              id="category"
              onChange={(e) => funCategory(e.target.value)}
            >
              {categoryArr.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
              <option value="NEW">Add new category</option>
            </select>
            <div style={{ margin: "1rem 0" }}>
              <TextField
                id="standard-basic"
                label="Add new Category"
                variant="standard"
                sx={{ width: "50%" }}
                onChange={(e) => setCategory(e.target.value)}
                required
                value={category}
                disabled={!isNewCategory}
              />
              <div>
                <TextField
                  id="standard-basic"
                  label="Category image url"
                  variant="standard"
                  sx={{ width: "50%" }}
                  onChange={(e) => setCategoryImg(e.target.value)}
                  required
                  value={categoryImg}
                  // disabled={!isNewCategory}
                />
              </div>
            </div>

            {/* categdory Display */}
            <div
              style={{
                backgroundColor: isCategoryHidden ? "red" : "green",
                width: ""
              }}
            >
              <input
                id="catedgory_display"
                type="checkbox"
                checked={isCategoryHidden}
                onChange={() => setIsCategoryHidden(!isCategoryHidden)}
              />
              <label htmlFor="catedgory_display">Hide whole category</label>
            </div>

            {/* categoryimg */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="AdminImage">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={categoryImg ? categoryImg : liveCategoryImg}
                  alt="category img"
                />
              </div>
              <IconButton onClick={() => setCategoryImg("")}>
                <ReplayIcon />
              </IconButton>

              {isEdit.edit ? (
                <IconButton onClick={() => setCategoryImg(liveCategoryImg)}>
                  reset to live
                </IconButton>
              ) : null}
            </div>

            {/* subcategory */}

            <input
              id="subcategory"
              type="checkbox"
              checked={isSubcategory}
              onChange={() => setIsSubcategory(!isSubcategory)}
            />
            <label htmlFor="subcategory">Subcategory</label>
            {isSubcategory ? (
              <div style={{ margin: "1rem 0" }}>
                <TextField
                  id="standard-basic"
                  label="Subcategory"
                  variant="standard"
                  sx={{ width: "50%" }}
                  required
                  value={subCategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                />
              </div>
            ) : null}
            <Divider sx={{ marginTop: "2rem", width: "30rem" }} />
            {/* project name */}

            <div style={{ margin: "1rem 0" }}>
              <TextField
                id="standard-basic"
                label="Project Name"
                variant="standard"
                sx={{ width: "50%" }}
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            {/* live link */}

            <div style={{ margin: "1rem 0" }}>
              <TextField
                id="standard-basic"
                label="Live link"
                variant="standard"
                sx={{ width: "50%" }}
                required
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
              />
            </div>
            {/* git link */}
            <div style={{ margin: "1rem 0" }}>
              <TextField
                id="standard-basic"
                label="Git Hub link"
                variant="standard"
                sx={{ width: "50%" }}
                value={gitHub}
                required
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            {/* project img */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="AdminImage">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={projectImg ? projectImg : liveProjectImg}
                  alt="project img"
                />
              </div>
              <IconButton onClick={() => setProjectImg()}>
                <ReplayIcon />
              </IconButton>
              {isEdit.edit ? (
                <IconButton onClick={() => setProjectImg(liveProjectImg)}>
                  reset to live
                </IconButton>
              ) : null}
            </div>

            <TextField
              id="standard-basic"
              label="Project Image URL"
              variant="standard"
              sx={{ width: "50%" }}
              value={projectImg}
              required
              onChange={(e) => setProjectImg(e.target.value)}
            />

            <div style={{ marginTop: "1rem" }}>
              <label htmlFor="project_description">project description</label>
              <textarea
                rows={5}
                value={ProjectDiscroption}
                onChange={(e) => setProjectDiscription(e.target.value)}
                id="project_description"
                style={{ display: "block" }}
              ></textarea>
            </div>

            <div>
              <input
                id="display"
                type="checkbox"
                checked={display}
                onChange={() => setDisplay(!display)}
              />
              <label htmlFor="display">Display</label>

              <input
                type="checkbox"
                id="responsive"
                name="vehicle1"
                checked={responsive}
                onChange={() => setResponsive(!responsive)}
              />
              <label htmlFor="responsive">responsive</label>
              <br></br>
            </div>

            <div style={{ margin: "4rem" }}>
              <input type="submit" />
              {isLoading ? <CircularProgress /> : null}
            </div>
          </form>

          <div className="rightSection">
            <h1>All Projects</h1>
            <Projects
              projects={projects}
              setCategory={setCategory}
              setIsNewCategory={setIsNewCategory}
              setCategoryImg={setCategoryImg}
              setProjectName={setProjectName}
              setLiveLink={setLiveLink}
              setGithub={setGithub}
              setProjectImg={setProjectImg}
              setDisplay={setDisplay}
              setResponsive={setResponsive}
              setIsEdit={setIsEdit}
              setLiveCategoryImg={setLiveCategoryImg}
              setLiveProjectImg={setLiveProjectImg}
              setIsSubcategory={setIsSubcategory}
              setSubcategory={setSubcategory}
              setProjectDiscription={setProjectDiscription}
              setIsCategoryHidden={setIsCategoryHidden}
              categoryImg={categoryImg}
              isCategoryHidden={isCategoryHidden}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
