# PIVO-CHECK 🍻 [![Build Status](https://travis-ci.org/bvellek/pivo-check.svg?branch=master)](https://travis-ci.org/bvellek/pivo-check)

[PIVO-CHECK](https://pivo-check.herokuapp.com/) is a full-stack JavaScript web application designed to help users discover all the breweries! It provides a responsive, intuitive experience for users to add cities and track all the breweries they visit.


## Usage 👩‍💻
In order to get started clone this repo. The PIVO-CHECK frontend is created with [create-react-app](https://github.com/facebookincubator/create-react-app) found in the `client` directory. The API is in the root folder and the entry point is `server.js`. Enter the commands below in your terminal:
```bash
git clone https://github.com/bvellek/pivo-check.git
cd pivo-check
yarn install
cd client
yarn install
cd ..
```

- __Development__: to run the app locally you need 3 terminal windows/tabs. Open your browser to `localhost:3000`. The API is being served to `localhost:3001` but all app requests are proxied through `localhost:3000`.
```bash
# tab 1
mongod

# tab 2
yarn start

# tab 3
cd client
yarn start
```
- __Testing__: there are two sets of tests: server tests and client tests. Run `yarn test` in the root directory for the server tests and `yarn test` in in the `/client` directory to run the client tests.

- __Build/Production__: create-react-app optimizes and bundles everything for production. JavaScript bundle and compiles CSS are injected into the `index.html` file. All files are built to the `/client/build` folder.
```bash
cd client
yarn build
```

<!--
## Project Summary 🌅
Lumen Spot is a web application that I designed and developed to help inspire photographers. Light is the most important aspect of any photo. In order to find the light that best suits a photographer's vision, it is crucial to know the times at which the sun is rising and setting. This application helps users find out detailed sun times for a specific location and also provides current weather conditions. To further aid in the photographer's vision process, I include example photos taken by other photographers at the same location.
-->

## Screenshots 📸
| ![Landing Page Screenshot](https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-landing.png?raw=true) |
|:---:|
| Landing Page |

| <img alt="Login Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-login.png?raw=true" width="350"> | <img alt="Registration Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-registration.png?raw=true" width="350"> | <img alt="Cities List Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-cities.png?raw=true" width="350"> | <img alt="Filtered Brewery List Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-visited.png?raw=true" width="350"> |
|:---:|:---:|:---:|:---:|
| Login | Registration | Cities List | Filtered Brewery List |

<!--
## Design Process 📐
In the design phase of this application, I started by writing user stories to determine the key features. The primary user features are to search for a location (either by entering an address, place of interest, or using current location), see sunrise, sunset, twilight times for the location, see weather for the location, and see photos from other photographers at the same location. After determining the user-critical features, I added some other features to improve the user experience. These include a link to a map of the location, a link to extended forecast weather, and photo settings with links to photographer's profiles. With these features in mind, I created wireframes of the app using [Sketch](https://www.sketchapp.com/). I tackled the design process with a mobile-first approach, because I know the majority of users will be using this app on location, on their phones. Using this approach also greatly improves the responsive design process.


## Development Process 🛠
In the development phase of this application, I began with an HTML first approach to make a quick mockup of the app. I prefer to develop this way as it promotes progressive enhancement.

One of the great features of React with JSX is that a lot of the HTML was reusable when I began building my React components. Babel is used to compile all JSX and ES6. Another notable feature of React is that one can have a single set of code that runs both on the client-side and on the node server. I decided to take advantage of this by server side rendering my React application so that the client receives HTML markup from the start. This shortens the time of the initial load and also makes the majority of the application work without JavaScript enabled on the client-side.

One difficulty of an isomorphic React app is maintaining the state of the app on reload. In order to remedy this issue, I stored all vital aspects of the state (namely the search coordinates for locations) in the url query string. This allowed me to fetch data from APIs on the server side and pass the 'preloaded state' to the client-side application. This prevents a fetch on the server and a redundant fetch on the client. Another issue I encountered was maintaining history support. With no simple React/Redux solution for history support that met all my needs, I decided to implement my own history using the History API's pushState() and onpopstate().

Flexbox was used to create the mobile-first, responsive layout. For maintainability and easy understanding for other developers, I used Jest and Enzyme to test all components, actions, and reducers. This was coupled with Travis CI for continuous integration in the deployment process.

This app utilizes the following three APIs for data:

- [Sunrise Sunset](http://sunrise-sunset.org/api): provides all of the sun times data. I had to proxy this request through my server because Sunrise Sunset only offers an insecure source.
- [Weather Underground](http://api.wunderground.com/api/): provides the weather data and weather icons.
- [500px](https://github.com/500px/api-documentation): provides all of the inspiration photos.


## Accessibility 🌏
Using a progressive enhancement strategy with an HTML first approach and within the constraints of web standards offered an implicit level of accessibility. This application was also tested for screen reader accessibility. Other accessibility improvements include:

- WCAG 2.0 Level AA Compliance
- VoiceOver Context: in order to maintain context for non-sighted users, I added longer descriptions certain features like the Search link on the landing page and the inspiration images on the Location Search Page. To maintain visual styles, I used a `.visually-hidden` class from the [A11Y Project](http://a11yproject.com/posts/how-to-hide-content/) to hide this extra context from sighted users who have more visual context.
- VoiceOver Rotor: the Rotor is a commonly used feature that allows for more efficient web browsing by listing common elements like headings, links, and sections. To maximize this feature I ensured that all pages had proper heading structure.
- Details and Summary Elements: use of the details and summary elements provide interactivity without the use of JavaScript to hide content.
- Contrast on all text elements to match Web Contact Accessibility Guidelines.
-->

## Tech Used 💻
### Front-End

 - HTML5
 - CSS3
 - [Sass](http://sass-lang.com/)
 - [React](https://facebook.github.io/react/)
 - [Redux](http://redux.js.org/)

### Back-End

 - [Node](https://nodejs.org)
 - [Express](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)
 - [Mongoose ODM](http://mongoosejs.com/)
 - [Passport](http://passportjs.org/) - middleware for local authentication
 - [Bcrypt](https://www.npmjs.com/package/bcryptjs) - middleware for password hashing
 - JSON Web Tokens - for authentication

### Testing and Deployment
 - [Jest](https://facebook.github.io/jest/) - testing frontend framework
 - [Enzyme](http://airbnb.io/enzyme/) - testing frontend framework
 - [Nock](https://github.com/node-nock/nock) - HTTP test mocking
 - [Mocha](https://mochajs.org/) - testing backend framework
 - [Chai](http://chaijs.com/) - assertion library for Node
 - [Travis CI](https://travis-ci.org/) - continuous integration service
 - [Heroku](https://www.heroku.com/) - cloud PaaS
 - [mLab](https://mlab.com/) - cloud database service
 - [ESLint](http://eslint.org/) - linting utility
