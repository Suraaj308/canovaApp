import { Link } from 'react-router-dom';
import './formSidebar.css';

function FormSidebar({ pages, onAddPage, onSelectPage, selectedPageId }) {
    return (
        <div className="formSidebar">
            <Link to="/home" className="canova-item">
                <img src="/icons/canovaLogo.png" className="canova-icon" />
                <span className="canova-text">CANOVA</span>
            </Link>
            <div className="formSidebar-pages">
                {pages.map(page => (
                    <div
                        key={page.id}
                        className={`page-item ${selectedPageId === page.id ? 'active' : ''}`}
                        onClick={() => onSelectPage(page.id)}
                    >
                        {page.title}
                    </div>
                ))}
                <button className="add-page-button" onClick={onAddPage}>
                    + Add New Page
                </button>
            </div>
            <Link to="/profile" className="profile-item">
                <img src="/icons/navbarProfileLogo.png" className="profile-icon" />
                <span className="profile-text">Profile</span>
            </Link>
        </div>
    );
}

export default FormSidebar;