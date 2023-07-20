import { useNavigate } from "react-router-dom";
import "./home.css";
import logo from "../../assets/logo-new.png"

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-container">

            <nav className="nav">
                <div className="nav-logo">
                    <img className="logo-img" src={logo} />
                    <h3 className="logo-text">NotesCloud</h3>
                </div>
            </nav>
        </div>
    );
};

export { Home };