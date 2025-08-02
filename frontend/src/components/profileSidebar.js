import { Link } from 'react-router-dom';
import "./profileSidebar.css";

function ProfileSidebar() {
    const user = JSON.parse(localStorage.getItem('user'));

    const username = user?.name;
    const email = user?.email;
    const profileInitial = username.charAt(0).toUpperCase();

    return (
        <div className='profileSidebar'>
            <Link to="/home" className="canova-item">
                <img src="icons/canovaLogo.png" className="canova-icon" />
                <span className="canova-text">CANOVA</span>
            </Link>
            <div className="details-item">
                <div className="profile-photo">{profileInitial}</div>
                <div className="user-info">
                    <span className="username">{username}</span>
                    <span className="email">{email}</span>
                </div>
            </div>
            <Link to="/profile" className="nav-item">
                <img src="icons/profileNavbarProfileLogo.png" className="navbar-icon" />
                <span className="navbar-text">My Profile</span>
                <img src="icons/profileNavbarRALogo.png" className="navbar-icon" />
            </Link>
            <Link to="/settings" className="nav-item">
                <img src="icons/profileNavbarSettingsLogo.png" className="navbar-icon" />
                <span className="navbar-text">Settings</span>
                <img src="icons/profileNavbarRALogo.png" className="navbar-icon" />
            </Link>
            <Link to="/" className="nav-item" onClick={() => localStorage.clear()}>
                <img src="icons/profileNavbarLogoutLogo.png" className="navbar-icon" />
                <span className="navbar-text">Logout</span>
            </Link>
        </div>
    );
}

export default ProfileSidebar;