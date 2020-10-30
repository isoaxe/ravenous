import React, { useState, useEffect, useCallback } from 'react';
import PriceSlider from '../PriceSlider/PriceSlider.js'
import useKeyPress from '../../util/useKeyPress.js';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};


function SearchBar(props) {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('best_match');
  const [price, setPrice] = useState([1, 4]);

  const enterKey = useKeyPress('Enter');
  const { yelpBusinesses } = props;

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

  function handlePriceChange(e, newPrice) {
    setPrice(newPrice);
  }

  const handleSearch = useCallback( (e) => {
    if (checkInputs(term, location)) {
      yelpBusinesses(term, location, sortBy);
    }
    e && e.preventDefault();
  }, [yelpBusinesses, term, location, sortBy]);

  function handleSearchKey() {
    if (checkInputs(term, location)) {
      props.yelpBusinesses(term, location, sortBy);
    }
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

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

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
        <PriceSlider
          price={price}
          onChange={handlePriceChange} />
        <input
          id="location"
          placeholder="Where?"
          onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        <button onClick={handleSearch}>Let's Go</button>
        {enterKey && handleSearchKey()}
      </div>
    </div>
  );
}

// Helper function to warn user if nothing has been entered before searching.
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

export default SearchBar;
