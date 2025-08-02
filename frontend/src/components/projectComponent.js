import './projectComponent.css';

function ProjectComponent({ projectName, onClick }) {

    return (
        <div className="projectcomponent-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="pctop-part">
                <img src="icons/projectComponentLogo.png" className="pclogo" />
            </div>
            <div className="pcbottom-part">
                <span className='pcproject-name'>{projectName}</span>
            </div>
        </div>
    )
}

export default ProjectComponent;