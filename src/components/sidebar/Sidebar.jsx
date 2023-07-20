import { useAuth, useSidebar, useTag } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";
import { EditTagModal } from "../editTagModal/EditTagModal";
import { toast } from "react-toastify";
import { capitalizeStr } from "../../utils/capitalizeStr";
const SideBar = () => {
  const navigate = useNavigate();
  const { sidebar } = useSidebar();
  const { authDispatch } = useAuth();
  const [tagModal, setTagModal] = useState(false);
  const {
    tagState: { tags },
  } = useTag();

  const routeHandler = (path) => {
    navigate(path);
  };
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT" });
    toast.success("Successfully Logged Out");
  };

  return (
    <>
      <div className={`sidebar ${sidebar ? "active" : ""}`}>
        <ul>
          <li className="sidebarListItems">
            <i className="bx bx-bulb"></i>

            <Link to="/notes" className="sidebarText">
              Notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li
              className="sidebarListItems"
              key={tag}
              onClick={() => routeHandler(`/tags/${tag}`)}
            >
              <i className="bx bx-purchase-tag"></i>
              <span className="sidebarText">{capitalizeStr(tag)}</span>
            </li>
          ))}

          <li className="sidebarListItems" onClick={() => setTagModal(true)}>
            <i className="bx bx-edit-alt"></i>
            <span className="sidebarText">Edit Tags</span>
          </li>
          <li className="sidebarListItems">
            <i className="bx bx-archive-in"></i>
            <Link to="/archive" className="sidebarText">
              Archive
            </Link>
          </li>
          <li className="sidebarListItems">
            <i className="bx bx-trash-alt"></i>
            <Link to="/trash" className="sidebarText">
              Trash
            </Link>
          </li>
          <li className="sidebarListItems" onClick={logoutHandler}>
            <i className="bx bx-log-in-circle"></i>
            <div className="sidebarText">Logout</div>
          </li>
        </ul>
      </div>
      {tagModal ? (
        <EditTagModal tagModal={tagModal} setTagModal={setTagModal} />
      ) : null}
    </>
  );
};

export { SideBar };
