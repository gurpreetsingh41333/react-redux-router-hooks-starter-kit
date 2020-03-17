const dev = {
  baseUrl: 'http://localhost:3000'
};

const qa = {
  baseUrl: 'https://qa'
};

const stage = {
  baseUrl: 'https://stage'
};

const prod = {
  baseUrl: 'https://prod'
};

console.info("env:", process.env.REACT_APP_ENV);

const config =
  process.env.REACT_APP_ENV === "prod"
    ? prod
    : process.env.REACT_APP_ENV === "stage"
      ? stage
      : process.env.REACT_APP_ENV === "qa"
        ? qa
        : dev;

export default {
  ...config
};


// end points
export const endPoints = {

};
