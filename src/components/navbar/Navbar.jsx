import { useSidebar, useAuth } from "../../context";
import "./navbar.css";
import logo from "../../assets/logo-new.png"

const Navbar = () => {
  const { setSidebar } = useSidebar();

  return (
    <nav className="nav">
      <div className="nav-logo">
        <span
          className="hamburger-btn"
          onClick={() => setSidebar((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
          </svg>
        </span>
        <img className="logo-img" src={logo} />
        <h3 className="logo-text">NotesCloud</h3>
      </div>
    </nav>
  );
};
export { Navbar };
