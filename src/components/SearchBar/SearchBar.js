import React, { useState, useEffect, useCallback } from 'react';
import PlacesAutocomplete from '../../util/usePlacesAutocomplete.js'
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

  const priceString = priceQuery(price);
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
    // Check if e is an event
    if (e.target) {
      if (e.target.value !== '') {
        document.getElementById("location").style.outline = 0;
      }
      setLocation(e.target.value);
    } else {
      // And if e is not an event
      setLocation(e);
    }
  }

  function handlePriceChange(e, newPrice) {
    setPrice(newPrice);
  }

  const handleSearch = useCallback( (e) => {
    if (checkInputs(term, location)) {
      yelpBusinesses(term, location, priceString, sortBy);
    }
    e && e.preventDefault();
  }, [yelpBusinesses, term, location, priceString, sortBy]);

  function handleSearchKey() {
    if (checkInputs(term, location)) {
      props.yelpBusinesses(term, location, priceString, sortBy);
    }
  }

  function priceQuery(price) {
    let range = price[1] - price[0];
    let fullArray;
    if (range === 3) {
      fullArray = [price[0], price[0] + 1, price[0] + 2, price[1]];
    } else if (range === 2) {
      fullArray = [price[0], price[0] + 1, price[1]];
    } else if (range === 1) {
      fullArray = price;
    } else {
      return price[0];
    }
    return fullArray.join();
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
    if (props.hasRun) {
      handleSearch();
    }
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
        <PlacesAutocomplete
          id="location"
          location={location}
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
