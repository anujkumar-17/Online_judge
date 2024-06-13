// Dashboard.jsx
import React, { useState } from 'react';
import CreateProblem from './CreateProblem';
import Problemset from './Problemset';
import Users from './Users';
import DeleteProblem from './DeleteProblem';
import Logout from './Logout'; // Import Logout component
import './Dashboard.css'; // Import your custom styles for Dashboard

const Dashboard = () => {
  const [component, setComponent] = useState(<CreateProblem />);

  return (
    <div className="dashboard-container">
      <div className="admin-page">
        <aside className="admin-aside">
          <div className="admin-aside-div">
            <div className="admin-aside-question-upload" onClick={() => setComponent(<CreateProblem />)}>
              Add New Problems
            </div>
            <div className="admin-aside-all-questions" onClick={() => setComponent(<Problemset />)}>
              Problemset
            </div>
            <div className="admin-aside-delete-problem" onClick={() => setComponent(<DeleteProblem />)}>
              Delete Problem
            </div>
          </div>
        </aside>
        <div>
          <div className="admin-dashboard">
            <span className="admin-dashboard-tag">DASHBOARD</span>
          </div>
          <div className="admin-dashboard-components">
            {component}
            <Logout /> {/* Include the Logout component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
