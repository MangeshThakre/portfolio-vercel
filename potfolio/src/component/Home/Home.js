import React from "react";
import "./Home.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import HashnodePng from "../../assets/hashnode.png";
import fincCoder from "../../assets/findcoder.png";
function Home() {
  return (
    <div className="home-section">
      <p>LET'S BUILD SOMETHING</p>
      <h1>
        <span id="hifi">👋</span> I'm <span> Mangesh Thakre</span> <br /> A Full
        Stack Javascript Developer
      </h1>
      <p>
        I’m focused on building responsive applications while <br /> learning
        back-end technologies.
      </p>
      <ul className="home-section-link">
        <li>
          <a
            className="linkedInUrl"
            href="https://www.linkedin.com/in/mangesh-thakre-a55b13217"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <LinkedInIcon color="" />
            </div>
          </a>
        </li>
        <li>
          <a
            className="githubUrl"
            href="https://github.com/MangeshThakre"
            rel="noreferrer"
            target="_blank"
          >
            <div>
              <GitHubIcon />
            </div>
          </a>
        </li>
        <li>
          <a
            className="hashnodeUrl"
            target="_blank"
            href="https://mangeshthakre.hashnode.dev/"
            rel="noreferrer"
          >
            <div>
              <img
                className="HashnodePng"
                src={HashnodePng}
                alt="hashnodePng"
              />
            </div>
          </a>
        </li>

        <li>
          <a
            className="hashnodeUrl"
            target="_blank"
            href="https://www.findcoder.io/u/mangeshthakre"
            rel="noreferrer"
          >
            <div>
              <img className="HashnodePng" src={fincCoder} alt="hashnodePng" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
