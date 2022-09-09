import React from "react";
import "./Admin.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import Projects from "./projects/projects";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { width } from "@mui/system";
function Admin() {
  const URL = process.env.REACT_APP_API_URL;

  // category
  const [category, setCategory] = useState("NEW");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categoryImg, setCategoryImg] = useState({});
  const [projectName, setProjectName] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [gitHub, setGithub] = useState("");
  const [projectImg, setProjectImg] = useState({});
  const [projects, setProjects] = useState({});
  const [display, setDisplay] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: "", edit: false });
  const [liveCategoryImg, setLiveCategoryImg] = useState("");
  const [liveProjectImg, setLiveProjectImg] = useState("");
  //  sub category
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [subCategory, setSubcategory] = useState("");
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
      setCategoryImg({
        live: projectArr[categoryArr.indexOf(category)][0].categoryImg,
      });
      setLiveCategoryImg(
        projectArr[categoryArr.indexOf(category)][0].categoryImg
      );
    }
    if (category === "NEW") {
      setCategoryImg({
        live: "",
        raw: "",
      });
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
      headers: { "content-type": "application/json" },
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

  // file reader
  function previewFile(e, set) {
    const file = e.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        set({
          base64: reader.result,
          raw: file,
          live: "",
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // submit
  async function submit(e) {
    e.preventDefault();
    setIsLoading(true);

    const catImg = categoryImg.raw ? categoryImg.raw : categoryImg.live;
    const pojImg = projectImg.raw ? projectImg.raw : projectImg.live;

    const oldCatImg = categoryImg.raw ? liveCategoryImg : "";
    const oldprojectImg = projectImg.raw ? liveProjectImg : "";

    const formData = new FormData();
    formData.append("category", category);
    if (categoryImg.raw) {
      formData.append("categoryImg", categoryImg.raw);
      formData.append("categoryImgRaw", true);
    } else if (categoryImg.live) {
      formData.append("categoryImg", liveCategoryImg);
      formData.append("categoryImgRaw", false);
    }

    if (projectImg.raw) {
      formData.append("projectImg", projectImg.raw);
      formData.append("projectImgRaw", true);
    } else if (projectImg.live) {
      formData.append("projectImg", liveProjectImg);
      formData.append("projectImgRaw", false);
    }
    formData.append("projectName", projectName);
    formData.append("liveLink", liveLink);
    formData.append("gitHub", gitHub);
    formData.append("display", display);
    formData.append("responsive", responsive);
    formData.append("isSubcategory", isSubcategory);
    formData.append("subCategory", subCategory);
    if (isEdit.edit) {
      try {
        const response = await axios({
          method: "post",
          url:
            URL +
            "/api/edit_project?oldCatImg=" +
            oldCatImg +
            "&oldprojectImg=" +
            oldprojectImg +
            "&id=" +
            isEdit.id,

          headers: { "content-type": "application/json" },
          data: formData,
        });
        const data = await response.data;
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }

      // console.table({
      //   category,
      //   catImg,
      //   projectName,
      //   liveLink,
      //   pojImg,
      //   gitHub,
      //   display,
      //   responsive,
      //   oldCatImg,
      //   oldprojectImg,
      // });
    } else {
      try {
        const response = await axios({
          method: "post",
          url: URL + "/api/insert_project",
          headers: { "content-type": "application/json" },
          data: formData,
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
                <Button variant="contained" component="label">
                  {!isNewCategory ? "Update img" : "Upload img"}
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => previewFile(e.target, setCategoryImg)}
                  />
                </Button>
              </div>
            </div>

            {/* categoryimg */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="AdminImage">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={
                    categoryImg.live
                      ? URL + "/" + categoryImg.live
                      : categoryImg.base64
                  }
                  alt="category img"
                />
              </div>
              <IconButton
                onClick={() => setCategoryImg({ live: "", raw: "", url: "" })}
              >
                <ReplayIcon />
              </IconButton>

              {isEdit.edit ? (
                <IconButton
                  onClick={() => setCategoryImg({ live: liveCategoryImg })}
                >
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
                  src={
                    projectImg.live
                      ? URL + "/" + projectImg.live
                      : projectImg.base64
                  }
                  alt="project img"
                />
              </div>
              <IconButton
                onClick={() => setProjectImg({ live: "", raw: "", url: "" })}
              >
                <ReplayIcon />
              </IconButton>
              {isEdit.edit ? (
                <IconButton
                  onClick={() => setProjectImg({ live: liveProjectImg })}
                >
                  reset to live
                </IconButton>
              ) : null}
            </div>
            <Button variant="contained" component="label">
              Upload img
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => previewFile(e.target, setProjectImg)}
              />
            </Button>

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
