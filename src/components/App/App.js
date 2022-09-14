import React, { useState } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import searchYelp from '../../util/searchYelp.js';


function App() {
  const [businesses, setBusinesses] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function yelpBusinesses(term, location, priceString, sortBy) {
    setIsLoading(true);
    const response = await searchYelp(term, location, priceString, sortBy);
    setIsLoading(false);
    setBusinesses(response);
    setHasRun(true);
  }

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar yelpBusinesses={yelpBusinesses} hasRun={hasRun} isLoading={isLoading} />
      <BusinessList businesses={businesses} hasRun={hasRun} />
    </div>
  );
}

export default App;
