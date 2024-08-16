/*import React, { useState } from 'react';
import CreateProblem from './createproblem'
import Problemset from './problemset'
import Users from './users'

const AdminPage = () => {
  const [component, setComponent] = useState(<CreateProblem />);

  const handleComponentChange = (newComponent) => {
    setComponent(newComponent);
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <aside>
        <div onClick={() => handleComponentChange(<CreateProblem />)}>
          Upload Problems
        </div>
        <div onClick={() => handleComponentChange(<Problemset />)}>
          Problemset
        </div>
        <div onClick={() => handleComponentChange(<Users />)}>
          All users
        </div>
      </aside>
      <div>
        <div>DASHBOARD</div>
        <div>{component}</div>
      </div>
    </div>
  );
};

export default AdminPage;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //http://localhost:3001/api/admin/home
      const result = await axios.get('http://3.110.249.20:3001/api/admin/home');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Home Page</h2>
      {/* Render admin-specific data */}
    </div>
  );
};

export default AdminPage;

