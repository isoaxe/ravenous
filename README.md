# Ravenous

[Ravenous](https://www.lucasoconnell.net/ravenous) is a single page React app that interacts with the Yelp API to search for restaurants and was initially developed as part of the Web Development career path at Codecademy. However, it was greatly expanded since that and now has considerably greater functionality.


## Technologies

The app boilerplate was created via the Node.js [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) command which abstracts away preprocessing (via Babel) and bundling (via Webpack) automatically. This is in contrast to the way my [personal website](https://www.lucasoconnell.net/) was developed. Originally made with the old class-based syntax, it was refactored to take advantage of React hooks.


## Functions

This app allows the user to search for restaurants via the Yelp API. There is a field for a **Search Term**, a **Price Range** slider (1 to 4 based off Yelp's star system for pricing) and finally a **Location** field. The **Location** field utilises the [use-places-autocomplete](https://www.npmjs.com/package/use-places-autocomplete) node package to suggest and autocomplete location, which in turn uses the [Google Maps Places](https://developers.google.com/maps/documentation/javascript/places) API.

Clicking the 'Let's Go' button or pressing enter will trigger a search. Results will be displayed below, with addresses clickable and triggering a Google Maps search on a new browser tab. Photos are also clickable, and open the restaurant's Yelp profile on a seperate tab.

Lastly, there is a **Sorting** function whereby the user can select from 'Best Match', 'Highest Rated' and 'Most Reviewed'. Clicking between these sorting options will send subsequent GET requests to the Yelp API and update the results below appropriately.


## Local Setup

The project can be forked and set up locally by the following CLI commands from the **ravenous directory**.

### `npm install`

Install all of the Node dependencies for React and other third party packages used in this project.

### `npm start`

Runs the app in development mode via `node server.js`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits to the source code. You will also see any linting errors in the console.

### `npm serve`

Builds the app via `npm run build` and then opens a Firebase hosting instance via `firebase emulators:start` making it available on port `5000`. This is similar to `npm start`, except for a production build rather than development. Unlike the `start` command, any changes made after running `serve` will not be incorporated. The emulator will have to be terminated and restarted to see changes. Used to test that everything is working as expected prior to deployment.


![Ravenous Screenshot](./Ravenous%20Screenshot.png?raw=true)

## Remote Hosting

This section describes how to host the project with Firebase.

1. Fork this repository.
2. Create a new [Firebase](https://firebase.google.com/) account if you don't already have one.
3. Install the Firebase CLI by running `npm install -g firebase-tools`.
4. Log into Firebase using your Google account credentials with `firebase login` in the terminal.
5. From the Firebase console in your browser, create a new project. Give it a name and `project-id`.
6. Replace the value of the `default` field in [`.firebaserc`](https://github.com/Isoaxe/ravenous/blob/master/.firebaserc#L3) with your `project-id`.
7. Execute the shell command `npm run deploy` to make a production build of the project and deploy to Firebase.