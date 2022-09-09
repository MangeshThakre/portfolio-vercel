import "./App.css";
import { useEffect, useRef } from "react";
import Nav from "./component/navbar/nav";
import Home from "./component/Home/Home.js";
import Skills from "./component/Skills/Skills.js";
import Projects from "./component/projects/Projects.js";

import Blog from "./component/Blog/Blog";
import Admin from "./component/Admin/Admin.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProjectPage from "./component/projects/prioectPage/ProjectPage.js";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const PAGE = useSelector((state) => state.projectReducer.Page);
  const [showNavShodow, setShowNavShodow] = useState(false);
  const projectView = useRef(null);
  const [homeView, setHomeView] = useState(null);
  const blogView = useRef(null);
  const SkillsView = useRef(null);

  const observer = new IntersectionObserver((e) => {
    setShowNavShodow(!e[0].isIntersecting);
  });

  useEffect(() => {
    setHomeView(document.querySelector(".homeView"));
  }, []);

  if (homeView != null) {
    observer.observe(homeView);
  }

  const deshbord = (
    <>
      <Nav
        projectView={projectView}
        SkillsView={SkillsView}
        homeView={homeView}
        blogView={blogView}
        showNavShodow={showNavShodow}
      />

      <section className="main-section">
        {PAGE === "DASHBORD" ? (
          <>
            <div ref={homeView} className="homeView" />
            <Home />
            <div ref={SkillsView} className="SkillView" />
            <Skills />
            <div ref={projectView} className="projectView" />
            <Projects />
            <div ref={blogView} className="blogView" />
            <Blog />
          </>
        ) : null}

        {PAGE == "PROJECTS" ? <ProjectPage /> : null}
      </section>
    </>
  );

  return (
    <div className="dashbord">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={deshbord} />
        <Route path="/*" element={"error"} />
      </Routes>
    </div>
  );
}

export default App;
