import HomeSidebar from '../components/homeSidebar.js';
import '../jsstyles/projects.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectComponent from '../components/projectComponent.js';

function Projects() {

  const [projectsArray, setProjectsArray] = useState([]);
  const [formsArray, setFormsArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectsAndForms = async () => {
      try {
        const emailId = JSON.parse(localStorage.getItem('user')).email
        const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/getprojectandformdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects and forms');
        }

        const data = await response.json();
        const sortedProjects = (data.projects || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedForms = (data.forms || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjectsArray(sortedProjects);
        setFormsArray(sortedForms);
      } catch (error) {
        console.error('Error fetching projects and forms:', error);
        setProjectsArray([]);
        setFormsArray([]);
      }
    };

    fetchProjectsAndForms();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/forms/${projectId}`);
  };

  return (
    <div className="projectspage-container">
      <HomeSidebar />
      <div className="right-container">
        <div className='title-container'>
          <p className='title-text'>WELCOME TO CANOVA</p>
        </div>
        <div className='body-container'>
          {projectsArray.length > 0 && (
            projectsArray.map((project, index) => (
              <ProjectComponent
                key={project.projectId || index}
                projectName={project.projectName}
                onClick={() => handleProjectClick(project.projectId)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;