import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmails } from "../../redux/emailSlice";
import { fetchDomains } from "../../redux/domainSlice";
import { clearUser } from "../../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import "./profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const emails = useSelector((state) => state.emails.emails);
  const domains = useSelector((state) => state.domains.domains);

  useEffect(() => {
    if (user) {
      dispatch(fetchEmails());
      dispatch(fetchDomains());
    }
  }, [dispatch, user]);

  const LogoutHandler = async () => {
    try {
      const response = await axios.get("https://mailmaster.onrender.com/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <>
        <p>Please log in to view your profile.</p>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </>
    );
  }

  return (
    <div className="container">
      <div className="upper">
        <div className="left1">
          <div className="profile">
            <p>Profile</p>
          </div>
        </div>
        <div className="right1">
          <div className="title">
            <p>
              <Link to="/">Mail Master</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="lower">
        <div className="left2">
          <div className="first">
            <div className="photo">
              <div className="prof">
                {user?.profilePhoto && (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="profile-photo"
                  />
                )}
              </div>
            </div>
            <div className="name">
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="status">
              <p>Undergraduate Student</p>
            </div>
          </div>
          <div className="second">
            <div className="domains">
              <span>{domains?.length || 0}</span>
              <p>Domains</p>
            </div>
            <div className="number">
              <span>20</span>
              <p>Number of mails</p>
            </div>
            <div className="emails">
              <span>
                {emails?.filter((email) => email.userId === user._id).length ||
                  0}
              </span>
              <p>Mail IDs Added</p>
            </div>
          </div>
          <div className="third">
            <div className="email">
              {user.email ? user.email : "No email provided"}
            </div>
            <div className="signout">
              <button onClick={LogoutHandler}>Sign Out</button>
            </div>
          </div>
        </div>
        <div className="right2">
          <div className="profile-header">
            <button className="edit-button" style={{ color: "black" }}>
              <Link to="/edit"> Edit</Link>
            </button>
          </div>

          <div className="profile-section">
            <div className="section-title" style={{ color: "black" }}>
              BASIC INFO
            </div>

            <div className="profile-field-fullname">
              <div className="field first-name">
                <label>FIRST NAME</label>
                <input type="text" value={user.firstName || ""} readOnly />
              </div>
              <div className="field last-name">
                <label>LAST NAME</label>
                <input type="text" value={user.lastName || ""} readOnly />
              </div>
            </div>

            <div className="profile-field username">
              <label>User Name</label>
              <input
                type="text"
                value={user.username || ""}
                style={{ borderBottom: "3px solid #e0e0e0" }}
                readOnly
              />
            </div>

            <div className="profile-field email">
              <label>EMAIL</label>
              <input
                type="text"
                value={user.email || ""}
                style={{ borderBottom: "3px solid #e0e0e0" }}
                readOnly
              />
            </div>

            <div className="section-title" style={{ color: "black" }}>
              ABOUT ME
            </div>

            <div className="profile-field about">
              <textarea
                placeholder="I'm a web designer, I work in programs like Figma, Adobe Photoshop, Adobe Illustrator"
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
