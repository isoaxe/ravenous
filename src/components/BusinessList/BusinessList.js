import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';


function BusinessList(props) {

  if (props.businesses.error) {
    return (
      <div className="BusinessList error-text">
        <div className="primary-text">Oops! An error occurred.</div>
        <div className="secondary-text">
          <span className="secondary-header">Code: </span>
          {props.businesses.error?.code}
        </div>
        <div className="secondary-text">
          <span className="secondary-header">Description: </span>
          {props.businesses.error?.description}
        </div>
      </div>
    );
  }

  if (!props.businesses.length && props.hasRun) {
    return (
      <div className="BusinessList">
        There are no search results to display.
      </div>
    );
  }
  
  return (
    <div className="BusinessList">
      {props.businesses.map(business =>
        <Business business={business} key={business.id}/>)}
    </div>
  );
}

export default BusinessList;
