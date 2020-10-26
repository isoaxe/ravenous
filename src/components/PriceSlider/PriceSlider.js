import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './PriceSlider.css';

const marks = [
  {
    value: 1,
    label: '$',
  },
  {
    value: 2,
    label: '$$',
  },
  {
    value: 3,
    label: '$$$',
  },
  {
    value: 4,
    label: '$$$$',
  },
];

function valuetext(value) {
  return `${value}°C`;
}


function RangeSlider() {
  const [price, setPrice] = useState([1, 4]);

  const handleChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <div className="root">
      <Typography id="slider-title">
        Price Range
      </Typography>
      <Slider
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-custom"
        min={1}
        max={4}
        getAriaValueText={valuetext}
        marks={marks}
      />
    </div>
  );
}

export default RangeSlider;
