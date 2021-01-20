# Ravenous

[Ravenous](https://www.lucasoconnell.net/ravenous) is a single page React app that interacts with the Yelp API to search for restaurants and was initially developed as part of the Web Development career path at Codecademy. However, it was greatly expanded since that and now has considerably greater functionality.


## Technologies

The app boilerplate was created via the Node.js [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) command which abstracts away preprocessing (via Babel) and bundling (via Webpack) automatically. This is in contrast to the way my [personal website](https://www.lucasoconnell.net/) was developed. Originally made with the old class-based syntax, it was refactored to take advantage of React hooks.


## Functions

This app allows the user to search for restaurants via the Yelp API. There is a field for a **Search Term**, a **Price Range** slider (1 to 4 based off Yelp's star system for pricing) and finally a **Location** field. The **Location** field utilises the [use-places-autocomplete](https://www.npmjs.com/package/use-places-autocomplete) node package to suggest and autocomplete location, which in turn uses the [Google Maps Places](https://developers.google.com/maps/documentation/javascript/places) API.

Clicking the 'Let's Go' button or pressing enter will trigger a search. Results will be displayed below, with addresses clickable and triggering a Google Maps search on a new browser tab. Photos are also clickable, and open the restaurant's Yelp profile on a seperate tab.

Lastly, there is a **Sorting** function whereby the user can select from 'Best Match', 'Highest Rated' and 'Most Reviewed'. Clicking between these sorting options will send subsequent GET requests to the Yelp API and update the results below appropriately.


## Local Setup

The project can be cloned and set up locally by the following CLI commands from the **ravenous directory**.

### `npm install`

Install all of the Node dependencies for React and other third party packages used in this project.

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits to the source code. You will also see any lint errors in the console.

![Ravenous Screenshot](./Ravenous%20Screenshot.png?raw=true)
