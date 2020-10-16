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

  function handleSortByChange(sortByOption) {
    setSortBy(sortByOption);
  }

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleSearch(e) {
    props.searchYelp(term, location, sortBy);
    e.preventDefault();
  }

  function renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      console.log(sortByOptionValue);
      return (
      <li
      key={sortByOptionValue}
      className={getSortByClass(sortByOptionValue)}
      onClick={() => handleSortByChange(sortByOptionValue)}
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
        placeholder="Search Businesses"
        onChange={handleTermChange} />
        <input
        placeholder="Where?"
        onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        <a onClick={handleSearch}>Let's Go</a>
      </div>
    </div>
  );
}

export default SearchBar;
