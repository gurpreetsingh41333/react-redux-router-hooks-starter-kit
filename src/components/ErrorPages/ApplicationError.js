import React from 'react';
import { useHistory } from 'react-router-dom';

import { images } from '../../config/Images';

const ApplicationError = props => {
  const history = useHistory();

  return (
    <div className="container-fluid maincontainer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="errorOuterContainer">
              <div className="errorInnerContainer">
                <div className="imageIcon">
                  <img src={images.applicationErrorImage} width="175" height="200" alt="" />
                </div>
                <h2 className="errorHeading">Application error</h2>
                <p className="errorDescription">An error occurred in the application and your page could not be served. Please try in a few moment.<br />
                  Please contact your administrator.</p>
                <div className="buttonDiv">
                  <button className="btn btn-danger btn-red"
                    onClick={() => { history.goBack() }}>Back</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationError;
