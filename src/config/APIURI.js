const dev = {
  baseUrl: 'https://localhost:44308/api/'
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

export const API_URI =
  process.env.REACT_APP_ENV === "prod"
    ? prod
    : process.env.REACT_APP_ENV === "stage"
      ? stage
      : process.env.REACT_APP_ENV === "qa"
        ? qa
        : dev;

// end points
export const END_POINTS = {
  GET_USER_LIST: 'user?PageNumber={PageNumber}&PageSize={PageSize}'
};
