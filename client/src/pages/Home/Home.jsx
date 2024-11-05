import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import toast, { Toaster } from "react-hot-toast";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import "./home.scss";

const Home = () => {
  const user = useSelector((store) => store.user.user);
  
  const [categorizedEmails, setCategorizedEmails] = useState({});
  const [selectedDomain, setSelectedDomain] = useState();

 
  if (!user) {
    return (
      <> 
        Please Login First 
        <button>
          <Link to="/signin">Sign In</Link>
        </button>
      </>
    );
  }

  const fetchEmails = () => {
 
    const loadingToastId = toast.loading("Fetching emails...");

    axios
      .get(`https://mailmaster.onrender.com/check/${user.userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          try {
            const textData =
              response.data.categorizedEmails.candidates[0].content.parts[0]
                .text;
            const jsonMatch = textData.match(/```json\n([\s\S]+?)\n```/);
            if (jsonMatch) {
              const parsedData = JSON.parse(jsonMatch[1]);
              console.log(parsedData);
              setCategorizedEmails(parsedData);
              toast.success("Emails fetched successfully!");
            } else {
              toast.error("No JSON found in the response.");
            }
          } catch (error) {
            toast.error("Error parsing JSON data.");
          }
        }
      })
      .catch(() => toast.error("Error fetching emails"))
      .finally(() => {
    
        toast.dismiss(loadingToastId);
      });
  };

  return (
    <div className="home">
      <Toaster />
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Mail Master</h2>
          <hr />
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className="menu-item">
              <span className="icon">
                <AccountCircleOutlinedIcon />
              </span>
              <button>
                <Link to="/profile">Profile</Link>
              </button>
            </li>
            <li className="menu-item">
              <span className="icon">
                <BadgeOutlinedIcon />
              </span>{" "}
              {user.firstName} {user.lastName}
            </li>
            <li className="menu-item">
              <span className="icon">
                <MarkEmailUnreadOutlinedIcon />
              </span>
              <button>
                <Link to="/separation">Authorize Mail Id's</Link>
              </button>
            </li>
          </ul>
          <hr />
          <h3
            style={{
              fontFamily: "Rubik Wet Paint",
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            DOMAINS <span className="add-domain">+</span>
          </h3>
          <ul className="domain-list">
            {Object.keys(categorizedEmails).map((domain) => (
              <li
                key={domain}
                className={`domain-item ${
                  selectedDomain === domain ? "opened" : ""
                }`}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </li>
            ))}
          </ul>
        </nav>
        <div className="user-info">
          <div className="profile-pic">
            <img src={user.profilePhoto} alt="" />
          </div>
          <div className="user-details" style={{ textAlign: "center" }}>
            <p className="user-name">{user.username}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </aside>
      <main className="content">
        <header className="content-header">
          <h1>{selectedDomain?.toUpperCase()}</h1>
          <button className="delete-button">Delete</button>
          <hr />
        </header>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="add-button" onClick={fetchEmails}>
            Fetch Emails
          </button>
        </div>
        <div className="email-list">
          {categorizedEmails[selectedDomain]?.map((email, index) => (
            <div key={index} className="email-item">
              <div className="email-icon">●</div>
              <p className="email-content">
                <strong>Subject:</strong> {email.subject}
                <br />
                <strong>Body:</strong> {email.body}
                <br />
                <strong>
                  Gmail:{" "}
                  <a
                    href={email.urls}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="delete-icon"
                  >
                    <LinkOutlinedIcon />
                  </a>
                </strong>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
