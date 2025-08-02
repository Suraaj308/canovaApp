import "../jsstyles/home.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSidebar from '../components/homeSidebar.js';
import ProjectComponent from '../components/projectComponent.js'
import FormComponent from '../components/formComponent.js';

function Home() {
  const [overlayType, setOverlayType] = useState('');
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [formName, setFormName] = useState('');
  const [projectsArray, setProjectsArray] = useState([]);
  const [formsArray, setFormsArray] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user')) || null;

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

  const handleCreateCardClick = (type) => {
    setOverlayType(type);
    setShowOverlay(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      projectName: overlayType === 'project' ? projectName : null,
      projectCreator: overlayType === 'project' ? userData.email : null,
      formName: formName,
      formCreator: userData.email
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/createprojectorform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to create project or form');
      }

      const gotoForm = await response.json();

      const fetchProjectsAndForms = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/getprojectandformdata`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailId: userData.email }),
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
        }
      };

      await fetchProjectsAndForms();

      setShowOverlay(false);
      setProjectName('');
      setFormName('');
      setOverlayType('');
      navigate(`/formdesign/${gotoForm.form.formId}`);
    } catch (error) {
      console.error('Error creating project or form:', error);
      alert('Failed to create project or form. Please try again.');
    }
  };

  const handleClose = () => {
    setShowOverlay(false);
    setProjectName('');
    setFormName('');
    setOverlayType('');
  };

  return (
    <div className="homepage-container">
      <HomeSidebar />
      <div className="right-container">
        <div className='title-container'>
          <p className='title-text'>WELCOME TO CANOVA</p>
        </div>
        <div className='homebody-container'>
          <div className='create-container'>
            <div className="card" onClick={() => handleCreateCardClick('project')}>
              <div className="card-content">
                <div className="icon-wrapper">
                  <img src="icons/homeProjectLogo.png" className="icon inner" />
                  <img src="icons/homeFormOuterLogo.png" className="icon outer" />
                </div>
                <p className="card-text">Start from Scratch</p>
                <p className="card-subtext">Create your first project now</p>
              </div>
            </div>
            <div className="card" onClick={() => handleCreateCardClick('form')}>
              <div className="card-content">
                <div className='icon-wrapper'>
                  <img src="icons/homeFormLogo.png" className="icon inner" />
                  <img src="icons/homeFormOuterLogo.png" className="icon outer" />
                </div>
                <p className="card-text">Create Form</p>
                <p className="card-subtext">Create your first form now</p>
              </div>
            </div>
          </div>
          <span className='sub-headings1'>Recent Works</span>
          <div className='saved-container'>
            {projectsArray.length > 0 && (
              projectsArray.slice(0, 2).map((project, index) => (
                <ProjectComponent key={index} projectName={project.projectName} />
              ))
            )}
            {formsArray.length > 0 && (
              formsArray.slice(0, 2).map((form, index) => (
                <FormComponent key={index} formName={form.formName} />
              ))
            )}
          </div>
          <div className='sharedwork-container'>
            <p className='sub-headings1'>Shared Works</p>
          </div>
        </div>
      </div>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-card">
            <div className='card-tops'>
              <div className="icon-wrapper">
                <img src="icons/createProjectOuterLogo.png" className="icon outer" />
                <img src="icons/createProjectLogo.png" className="icon inner" />
              </div>
              <button className="close-button" onClick={handleClose}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <p className='sub-headings1'>Create Project</p>
              <p className='sub-text'>Provide the names and start with your journey</p>
              {overlayType === 'project' && (
                <div className="input-group">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                    placeholder='Project Name'
                  />
                </div>
              )}
              <div className="input-group">
                <label htmlFor="formName">Form Name</label>
                <input
                  type="text"
                  id="formName"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder='Form Name'
                />
              </div>
              <button type="submit" className="submit-button">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;