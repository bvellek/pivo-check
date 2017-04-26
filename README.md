# PIVO-CHECK 🍻 [![Build Status](https://travis-ci.org/bvellek/pivo-check.svg?branch=master)](https://travis-ci.org/bvellek/pivo-check)

[PIVO-CHECK](https://pivo-check.herokuapp.com/) is a full-stack JavaScript web application designed to help users discover US breweries! It provides a responsive, intuitive experience for users to add cities and track all the breweries they visit. As users visit breweries they can check them off and rate them on the app.


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

- __Build/Production__: create-react-app optimizes and bundles everything for production. The JavaScript bundle and compiles CSS are injected into the `index.html` file. All files are built to the `/client/build` folder.
```bash
cd client
yarn build
```

## Project Summary 🍺
PIVO-CHECK is designed to help beer lovers do what they love, drink beer! Users maintain a list of cities, each of which holds a comprehnsive list of breweries in the cities. The primary focus is to discover new breweries and keep track of the ones a user has visited. PIVO-CHECK also provides a 1-3 🍺 rating so the user can remember how much he or she enjoyed the brewery. It is also possible to sort the breweries by type or by whether or not they have been visited ✅.


## Screenshots 📸
| ![Landing Page Screenshot](https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-landing.png?raw=true) |
|:---:|
| Landing Page |

| <img alt="Login Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-login.png?raw=true" width="350"> | <img alt="Registration Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-registration.png?raw=true" width="350"> | <img alt="Cities List Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-cities.png?raw=true" width="350"> | <img alt="Filtered Brewery List Screenshot" src="https://github.com/bvellek/pivo-check/blob/master/design/screens/screen-visited.png?raw=true" width="350"> |
|:---:|:---:|:---:|:---:|
| Login | Registration | Cities List | Filtered Brewery List |


## Design Process 📐
In the design phase of this application, I started by writing user stories to determine the key features. The primary user features are to add a city, see all the breweries in a city, and checkoff/rate a brewery. After determining the user-critical features, I added some other features to improve the user experience. These include autocomplete suggestions for city searches, delete city confirm messages (see the Cities List screenshot above), and a filter feature for the breweries list. Authentication messages were added (see the Registration screenshot above). Error messages were also provided in situations where results return null or an unexpected event occurs. This helps users understand what is happening when there are no breweries available rather than present an empty list. The intent of the app was to make sure that keeping track or discovering breweries was an exciting experience rather than a burden. This reinforces the primary goal which was to make the experience as simple and intuitive as possible. With these features in mind, wireframes and protoypes of the app were created using [Sketch](https://www.sketchapp.com/). During the prototyping process color contrast and keyboard navigation support were branding element decisions that also maintained accessibility. The design process took a mobile-first approach because the majority of users will be using this app while searching for, and while visiting breweries.


## Development Process 🛠
In the development phase of this application, I began with an HTML first approach to make a quick mockup of the app. I prefer to develop this way as it promotes progressive enhancement. With a base, built in HTML, it was easy to choose which aspects would benefit from enhancement and which tools would be best suited for their creation. In order to maintain the goals set in my design process (with accessibility in mind), React was an obvious choice. It excels at providing contextual details. React is all about making visual components that represent the current state of the app. With data coming from an external database for brewery information, location based information coming from the Google Maps API, and user-specific data coming from my own database, I knew I would have to maintain and reason about a large amount of state. In order to handle the complexity of this issue, I utilized Redux. It helped maintain a single source of truth in the app with an easy to understand flow of data.

On the back-end, I built a RESTful API to serve all the data to the client. To solve the issue of authentication, JSON web tokens were incorporated because they do not require cookies or require the server to hold the current user data.

Flexbox was used to create the mobile-first, responsive layout. For maintainability and easy understanding for other developers, I used Jest and Enzyme to test all components, actions, and reducers on the front-end. Mocha and Chai were used to test the back-end functions. This was coupled with Travis CI for continuous integration in the deployment process.

This app obtains brewery data from the [BreweryDB](http://www.brewerydb.com/).


## Accessibility 🌏
Using a progressive enhancement strategy with an HTML first approach and within the constraints of web standards, offered an implicit level of accessibility. This application was also tested for screen reader accessibility. Other accessibility improvements include:

- WCAG 2.0 Level AA Compliance
- VoiceOver Context: in order to maintain context for non-sighted users, I added longer contextual descriptions certain features like links, rating selects, checkboxes, delete buttons, and brewery descriptions. To maintain visual styles, I used a `.visually-hidden` class from the [A11Y Project](http://a11yproject.com/posts/how-to-hide-content/) to hide this extra context from sighted users who have more visual context. The primary goal was to give sighted and screen reader users the SAME experience.
- VoiceOver Rotor: the Rotor is a commonly used feature that allows for more efficient web browsing by listing common elements like headings, links, and sections. To maximize this feature I ensured that all pages had proper heading structure.
- Details and Summary Elements: use of the details and summary elements provide interactivity without the use of JavaScript to hide content.
- Contrast on all text elements to match Web Contact Accessibility Guidelines.


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
- [Jest](https://facebook.github.io/jest/) - testing front-end framework
- [Enzyme](http://airbnb.io/enzyme/) - testing front-end framework
- [Nock](https://github.com/node-nock/nock) - HTTP test mocking
- [Mocha](https://mochajs.org/) - testing back-end framework
- [Chai](http://chaijs.com/) - assertion library for Node
- [Travis CI](https://travis-ci.org/) - continuous integration service
- [Heroku](https://www.heroku.com/) - cloud PaaS
- [mLab](https://mlab.com/) - cloud database service
- [ESLint](http://eslint.org/) - linting utility
