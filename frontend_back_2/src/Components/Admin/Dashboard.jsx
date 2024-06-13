import React, { useState } from 'react'
import CreateProblem from './CreateProblem'
import Problemset from './Problemset'
import Users from './Users'

const Dashboard = () => {
  const [component,setComponent]=useState(<CreateProblem/>);
return (
  <div>
      <div className='Adminpage' >
          <aside className='AdminAside' >
              <div className='AdminAsideDiv' >
              <div className='AdminAsideQuestionUpload'  onClick={()=>setComponent(<CreateProblem/>)}>Add New Problems</div>
              <div className='AdminAsideAllQuestions' onClick={()=>setComponent(<Problemset/>)}>Problemset</div>
              <div className='AdminAsideAllUsers'  onClick={()=>setComponent(<Users/>)}>Users</div>
              </div>
          </aside>
          <div>
          <div className='AdminDashboard' >
             <span className='AdminDashboardTag' >DASHBOARD</span>  
          </div>
              <div className='AdminDashboardComponents' >
                {
                  component
                }
              </div> 
          </div>
      </div>
  </div>
)
}

export default Dashboard