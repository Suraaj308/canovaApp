import '../jsstyles/settings.css';
import ProfileSidebar from '../components/profileSidebar.js';

function Settings() {
    return (
        <div className="page-container">
            <ProfileSidebar />
            <div className="content-container">
                <p>
                    ZA SETTINGS
                </p>
            </div>
        </div>
    );
}

export default Settings;