import "./edit.scss";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchEmails, setEmails } from "../../redux/emailSlice";
import { Link } from "react-router-dom";

const EditPage = () => {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState({ email: "", password: "" });
  const { user } = useSelector((state) => state.user);

  const { emails, isLoading } = useSelector((state) => state.emails);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);
  console.log(user);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mailmaster.onrender.com/info/add-email",
        newEmail,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user ? `Bearer ${user.token}` : "",
          },
          withCredentials: true,
        }
      );
      console.log(user);
      toast.success(response.data.message);
      dispatch(setEmails([...emails, response.data.email]));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add email.");
    }
    setNewEmail({ email: "", password: "" });
  };

  return (
    <div className="edit-page">
      <div className="left">
        <p className="title" style={{ color: "black" }}>
          Added Emails ID's
        </p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="mails">
            {emails?.map((emailObj) => (
              <div className="mail fade-in" key={emailObj._id}>
                <span>{emailObj.email}</span>
                <button>
                  <RemoveCircleOutlinedIcon className="remove-icon" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <div className="desc bounce-in">
          <p style={{ color: "black" }}>Mail Master</p>
          <span style={{ fontSize: "20px" }}>
            Mail Master organizes and prioritizes your emails, transforming your
            inbox into an efficient, clutter-free space. Stay focused and
            effortlessly manage communications with ease.
          </span>
        </div>
        <div className="add zoom-in">
          <p style={{ color: "black" }}>EMAIL</p>
          <div className="search-box">
            <ForwardToInboxOutlinedIcon style={{ color: "black" }} />
            <input
              type="text"
              placeholder="extra@gmail.com"
              value={newEmail.email}
              onChange={(e) =>
                setNewEmail({ ...newEmail, email: e.target.value })
              }
            />
          </div>
          <div className="search-box">
            <PasswordOutlinedIcon style={{ color: "black" }} />
            <input
              type="password"
              placeholder="password"
              style={{ backgroundColor: "white" }}
              value={newEmail.password}
              onChange={(e) =>
                setNewEmail({ ...newEmail, password: e.target.value })
              }
            />
          </div>
          <div className="add-button">
            <button onClick={onSubmitHandler}>
              ADD <AddCircleOutlinedIcon />
            </button>

            <button style={{ marginLeft: "20px", textAlign: "center" }}>
              <Link to="/domain-option">
                Add domains
                <AddCircleOutlinedIcon />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
