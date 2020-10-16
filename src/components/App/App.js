import React, { useState } from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Yelp from '../../util/Yelp.js';


function App() {
  const [businesses, setBusinesses] = useState([]);

  function searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      setBusinesses(businesses);
    });
  }

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={searchYelp}/>
      <BusinessList businesses={businesses}/>
    </div>
  );
}


export default App;
