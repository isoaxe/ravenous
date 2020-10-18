import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('best_match');

  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  function getSortByClass(sortByOption) {
    return ((sortBy === sortByOption) ? 'active' : '');
  }

  function handleTermChange(e) {
    if (e.target.value !== '') {
      document.getElementById("term").style.outline = 0;
    }
    setTerm(e.target.value);
  }

  function handleLocationChange(e) {
    if (e.target.value !== '') {
      document.getElementById("location").style.outline = 0;
    }
    setLocation(e.target.value);
  }

  function handleSearch(e) {
    if (checkInputs(term, location)) {
      props.searchYelp(term, location, sortBy);
    }
    e.preventDefault();
  }

  function checkInputs(term, location) {
    if (term === '') {
      document.getElementById("term").style.outline = "medium solid red";
      document.getElementById("term").placeholder = "You must enter a search term";
    }
    if (location === '') {
      document.getElementById("location").style.outline = "medium solid red";
      document.getElementById("location").placeholder = "You must enter a search location";
    }
    return !(term === '' || location === '');
  }

  function renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
      <li
      key={sortByOptionValue}
      className={getSortByClass(sortByOptionValue)}
      onClick={() => setSortBy(sortByOptionValue)}
      >
        {sortByOption}
      </li>);
    });
  }

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input
        id="term"
        placeholder="Search Businesses"
        onChange={handleTermChange} />
        <input
        id="location"
        placeholder="Where?"
        onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        <button onClick={handleSearch}>Let's Go</button>
      </div>
    </div>
  );
}

export default SearchBar;
