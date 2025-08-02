import ReactDOM from 'react-dom/client';
import './index.css';
import PrivateRoute from './components/privateRoute.js';
import Analysis from './jspages/analysis.js'
import Login from './jspages/login.js';
import Home from './jspages/home.js';
import Formdesign from './jspages/formdesign.js';
import Projects from './jspages/projects.js';
import Profile from './jspages/profile.js';
import Settings from './jspages/settings.js';
import reportWebVitals from './reportWebVitals';
import Forms from './jspages/forms.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
      <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
      <Route path="/forms/:projectId" element={<PrivateRoute><Forms /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/formdesign/:formId" element={<PrivateRoute><Formdesign /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
