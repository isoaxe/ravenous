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

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

    return (
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput id="location" value={value} onChange={handleChange} placeholder="Where?" disabled={!ready} />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };

export default PlacesAutocomplete;
