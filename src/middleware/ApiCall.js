import axios from 'axios';

function setHeaderOptions(config) {
  let headers = {
    'Content-Type': 'application/json'
  };
  if (config.header && config.header.Authorization) {
    headers = Object.assign({}, headers, {
      Authorization: 'Bearer ' + 'Token'
    });
  }
  return headers;
}

const ApiCall = {
  postCall: async (config) => {
    let headers = setHeaderOptions(config);
    try {
      let response = await axios.post(config.url, config.body, {
        headers: headers,
      })
      // console.info('response', response);
      return response;
    } catch (error) {
      // console.info('error', error.response);
      if (error && error.response && (error.response.status === 401 || error.response.status === 500)) {
        return error;
      } else {
        return Promise.reject({ ...error });
      }
    }
  }
};

export default ApiCall;
