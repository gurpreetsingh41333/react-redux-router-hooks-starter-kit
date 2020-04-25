import React, { } from 'react';

const Dashboard = () => {
  return (
    <main>
      <div className="container-fluid">
        <h3 className="my-4">Dashboard</h3>
        <div className="bg-white-custom mb-3">
          <div className="row dashboardRow1">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="white-box analytics-info">
                <h3 className="box-title">Dashboard Contents</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
