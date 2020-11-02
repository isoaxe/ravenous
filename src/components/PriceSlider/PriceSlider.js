import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './PriceSlider.css';


function PriceSlider(props) {

  return (
    <div className="price-slider">
      <Typography id="slider-title">
        Price Range
      </Typography>
      <Slider
        value={props.price}
        onChange={props.onChange}
        valueLabelDisplay="auto"
        valueLabelFormat={label}
        aria-labelledby="range-slider-custom"
        min={1}
        max={4}
      />
    </div>
  );
}

function label(index) {
  if (index === 1) {
    return '$';
  } else if (index === 2) {
    return '$$';
  } else if (index === 3) {
    return '$$$';
  } else {
    return '$$$$';
  }
}

export default PriceSlider;
