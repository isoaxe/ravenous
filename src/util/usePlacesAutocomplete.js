import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = (props) => {
  // API response and params of the form:
  // const returnObj = usePlacesAutocomplete(parameterObj);
  const {
    ready,
    suggestions: { status, data },
    value,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e);
  };

  const handleSelect = (description) => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    props.onChange(description);
    clearSuggestions();
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput id="location" value={value} onChange={handleChange} placeholder="Where?" disabled={!ready} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, structured_formatting: { main_text, secondary_text } }) => (
              <ComboboxOption key={place_id} value={main_text + ' ' + secondary_text}>
                <span>{main_text}</span> <span>{secondary_text}</span>
              </ComboboxOption>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
