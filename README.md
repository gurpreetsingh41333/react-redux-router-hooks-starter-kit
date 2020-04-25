# react-redux-router-hooks-starter-kit
A starter kit with react 16 hooks, redux-thunk, react-router, webpack4 and prettier.

## Contains:

* environment specific file - single place to configure app
* webpack is used for bundling the app
* react-router configuration with private routing
* Redux setup with thunk middleware
* Code splitting using @loadable/component
* Environment specific API Call using Axios
* Environment configuration in package scripts
* separate containers and components
* Toastr setup with standard options in utils

## Getting Started

**1. Clone the repository to your local machine by running:**

```bash
git clone https://github.com/gurpreetbirdi/react-redux-router-hooks-starter-kit.git
cd react-redux-router-hooks-starter-kit
```

**2. Install all dependencies:**

```npm install``` or ```yarn install```

**3. Change Specific environment variable file:(Reference file- .env.example)**

```.env.{variable}``` ```dev||qa||stg||prod```

**4. Run the app:**

```npm start``` or ```yarn start```

Run server on port 3000 with HMR enabled or you can change port in webpack.config.js

**5. Build files for deployment:**

```npm run build:{variable}``` or ```yarn build:{variable}``` ```dev||qa||stg||prod```

Building app in the "build" directory. Contains the index.html with the minified assets, it's ready for production!.
