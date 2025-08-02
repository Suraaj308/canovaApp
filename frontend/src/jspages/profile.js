import '../jsstyles/profile.css';
import ProfileSidebar from '../components/profileSidebar.js';

function Profile() {
  return (
    <div className="page-container">
      <ProfileSidebar />
      <div className="content-container">
        <p>
          Profile
        </p>
      </div>
    </div>
  );
}

export default Profile;