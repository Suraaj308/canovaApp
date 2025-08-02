import { Link } from 'react-router-dom';
import './homeSidebar.css';

function HomeSidebar() {
    return (
        <div className="homeSidebar">
            <Link to="/home" className="canova-item">
                <img src="/icons/canovaLogo.png" className="canova-icon" />
                <span className="canova-text">CANOVA</span>
            </Link>
            <nav className="homeSidebar-nav">
                <Link to="/home" className="nav-item">
                    <img src="/icons/navbarHomeLogo.png" className="navbar-icon" />
                    <span className="navbar-text">Home</span>
                </Link>
                <Link to="/analysis" className="nav-item">
                    <img src="/icons/navbarAnalysisLogo.png" className="navbar-icon" />
                    <span className="navbar-text">Analysis</span>
                </Link>
                <Link to="/projects" className="nav-item">
                    <img src="/icons/navbarProjectsLogo.png" className="navbar-icon" />
                    <span className="navbar-text">Projects</span>
                </Link>
            </nav>
            <Link to="/profile" className="profile-item">
                <img src="/icons/navbarProfileLogo.png" className="profile-icon" />
                <span className="profile-text">Profile</span>
            </Link>
        </div>
    );
}

export default HomeSidebar;