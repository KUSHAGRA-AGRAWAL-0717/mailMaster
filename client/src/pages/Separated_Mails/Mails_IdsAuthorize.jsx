import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmails } from "../../redux/emailSlice";
import "./separate.scss";

const Mails_IdsAuthorize = () => {
  const dispatch = useDispatch();
  const { emails, isLoading } = useSelector((state) => state.emails);
  const [authorizedEmails, setAuthorizedEmails] = useState([]);
  const [loadingEmail, setLoadingEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  // Add window message listener once on component mount
  useEffect(() => {
    const handleAuthorizationComplete = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data === "authorizationComplete") {
        setAuthorizedEmails((prev) => [...prev, loadingEmail]);
        setSuccessMessage(`Successfully authorized ${loadingEmail}`);
        setLoadingEmail(null);
      }
    };

    window.addEventListener("message", handleAuthorizationComplete);

    return () =>
      window.removeEventListener("message", handleAuthorizationComplete);
  }, [loadingEmail]);

  const authorizeEmail = async (email) => {
    if (!email) return;
    setLoadingEmail(email);

    try {
      window.open(
        "https://mailmaster.onrender.com/auth",
        "_blank",
        "width=600,height=600"
      );
    } catch (error) {
      console.error("Error authorizing email:", error);
      setLoadingEmail(null);
    }
  };

  return (
    <div className="contain">
      <div className="authorize-container">
        <h1>Authorize Emails</h1>
        {isLoading ? (
          <p className="loading-text">Loading emails...</p>
        ) : (
          <ul className="email-list">
            {emails.map((email) => (
              <li key={email._id} className="email-item">
                <span className="email-text">{email.email}</span>
                <button
                  onClick={() => authorizeEmail(email.email)}
                  disabled={loadingEmail === email.email}
                  className={`authorize-button ${
                    loadingEmail === email.email ? "loading" : ""
                  }`}
                >
                  {loadingEmail === email.email
                    ? "Authorizing..."
                    : "Authorize"}
                </button>
              </li>
            ))}
          </ul>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <h2>Authorized Emails</h2>
        <ul className="authorized-list">
          {authorizedEmails.length > 0 ? (
            authorizedEmails.map((email, index) => (
              <li key={index} className="authorized-item">
                {email}
              </li>
            ))
          ) : (
            <p className="no-authorized">No authorized emails yet.</p>
          )}
        </ul>
        <button className="fetch-button">
          <Link to="/">GO And Fetch</Link>
        </button>
      </div>
    </div>
  );
};

export default Mails_IdsAuthorize;
