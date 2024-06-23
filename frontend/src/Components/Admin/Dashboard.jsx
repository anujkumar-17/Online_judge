import React, { useState } from 'react';
import CreateProblem from './CreateProblem';
import Problemset from './Problemset';
import Users from './Users';
import DeleteProblem from './DeleteProblem';
import AddTestCase from './AddTestCase'; // Import AddTestCase component
import UpdateProblem from './UpdateProblem'; // Import UpdateProblem component
import Logout from './Logout'; // Import Logout component
import Navigation from '../../Navigation'; // Import the Navigation component
import './Dashboard.css'; // Import your custom styles for Dashboard

const Dashboard = () => {
  const [component, setComponent] = useState(<CreateProblem />);

  return (
    <>
      <Navigation /> {/* Include Navigation component here */}
      <div className="dashboard-container">
        <div className="admin-page">
          <aside className="admin-aside">
            <div className="admin-aside-div">
              <div className="admin-aside-question-upload" onClick={() => setComponent(<CreateProblem />)}>
                Add New Problems
              </div>
              <div className="admin-aside-update-problem" onClick={() => setComponent(<UpdateProblem />)}>
                Update Problem
              </div>
              <div className="admin-aside-add-test-case" onClick={() => setComponent(<AddTestCase />)}>
                Add Test Case
              </div>
            </div>
          </aside>
          <div>
            <div className="admin-dashboard">
              <span className="admin-dashboard-tag">DASHBOARD</span>
            </div>
            <div className="admin-dashboard-components">
              {component}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
