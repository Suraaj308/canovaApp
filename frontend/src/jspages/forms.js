import HomeSidebar from '../components/homeSidebar.js';
import '../jsstyles/forms.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../components/formComponent.js';

function Forms() {

    const [projectsArray, setProjectsArray] = useState([]);
    const [formsArray, setFormsArray] = useState([]);
    const { projectId } = useParams();
    const [projectName, setProjectName] = useState('PROJECT NAME');

    useEffect(() => {
        const fetchProjectsAndForms = async () => {
            try {
                const emailId = JSON.parse(localStorage.getItem('user')).email
                const response = await fetch('http://localhost:5000/auth/getprojectandformdata', {
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
                const getProjectName = data.projects
                const sortedForms = (data.forms || [])
                    .filter((form) => form.sourceProject === projectId)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const project = sortedProjects.find((proj) => proj.projectId === projectId);
                setProjectName(project ? project.projectName : 'PROJECT NAME');

                setProjectsArray(sortedProjects);
                setFormsArray(sortedForms);
            } catch (error) {
                console.error('Error fetching projects and forms:', error);
                setProjectsArray([]);
                setFormsArray([]);
            }
        };

        fetchProjectsAndForms();
    }, [projectId]);


    return (
        <div className="formspage-container">
            <HomeSidebar />
            <div className="right-container">
                <div className='title-container'>
                    <p className='title-text'>SEARCH BAR HERE</p>
                </div>
                <div className='body-container'>
                    <div className='top-part'>
                        <h2>{projectName}</h2>
                    </div>
                    <div className='middle-part'>
                        {formsArray.length > 0 && (
                            formsArray.map((form, index) => (
                                <FormComponent key={form.formId || index} formName={form.formName} />
                            ))
                        )}
                    </div>
                    <div className='bottom-part'>
                        <button>ADD NEW FORM</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forms;