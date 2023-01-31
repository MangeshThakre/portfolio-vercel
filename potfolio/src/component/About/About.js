import React from "react";
import "./About.css";
import man from "../../assets/man.jpg";

function About() {
  return (
    <div className="about_Section">
      <div></div>
      <div className="aboutImage">
        <img src={man} alt="man" />
      </div>
    </div>
  );
}

export default About;
