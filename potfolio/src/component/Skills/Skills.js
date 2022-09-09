import React from "react";
import "./Skills.css";
import expressJsIcon from "../../assets/expressjs.svg";
import cssIcon from "../../assets/css.svg";
import cssIcon2 from "../../assets/css2.svg";
import javascriptIcon from "../../assets/javascript.svg";
import reactjsIcon from "../../assets/reactjs.svg";
import nodejsIcon from "../../assets/nodejs.svg";
import htmlIcom from "../../assets/html.svg";
import mongodbIcom from "../../assets/mongodb.svg";
function Skills() {
  return (
    <div className="skill-section">
      <div className="head">
        <p>SKILLS</p>
        <h1>What I Can Do</h1>
      </div>
      <div className="skillsContainer">
        <div className="skillBox">
          <div>
            <img src={htmlIcom} alt="" />
            <h3>HTML</h3>
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={cssIcon} alt="" />
            <h3>CSS</h3>
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={javascriptIcon} alt="" />
            <h3>Javascript</h3>
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={reactjsIcon} alt="" />
            <h3>react js</h3>
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={nodejsIcon} alt="nodejs" />
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={mongodbIcom} alt="mangodb" />
          </div>
        </div>
        <div className="skillBox">
          <div>
            <img src={expressJsIcon} alt="express" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
