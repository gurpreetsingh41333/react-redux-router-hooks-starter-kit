import axios from 'axios';

import { routes } from '../config/constants';
import { history } from '../containers/Store';

function setHeaderOptions(config) {
  let headers = {
    'Content-Type': 'application/json'
  };
  if (config.header && config.header.Authorization) {
    let Token = '';
    headers = Object.assign({}, headers, {
      Authorization: 'Bearer ' + Token
    });
  }
  return headers;
}

const showErrorPage = (error) => {
  /* TODO check for 5XX or 4XX here*/
  history.push(routes.APPLICATION_ERROR);
  window.location.reload();
}

const ApiCall = {
  getCall: async (config) => {
    let headers = setHeaderOptions(config);
    try {
      let response = await axios.get(config.url, {
        headers: headers,
      })
      // console.info('response', response);
      return response;
    } catch (error) {
      // console.info('error', error.response);
      if (error && error.response) {
        showErrorPage(error.response);
        return error.response;
      } else {
        return Promise.reject({ ...error });
      }
    }
  },
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
      if (error && error.response) {
        showErrorPage(error.response);
        return error.response;
      } else {
        return Promise.reject({ ...error });
      }
    }
  },
  putCall: async (config) => {
    let headers = setHeaderOptions(config);
    try {
      let response = await axios.put(config.url, config.body, {
        headers: headers,
      })
      // console.info('response', response);
      return response;
    } catch (error) {
      // console.info('error', error.response);
      if (error && error.response) {
        showErrorPage(error.response);
        return error.response;
      } else {
        return Promise.reject({ ...error });
      }
    }
  },
  deleteCall: async (config) => {
    let headers = setHeaderOptions(config);
    try {
      let response = await axios.delete(config.url, config.body, {
        headers: headers,
      })
      // console.info('response', response);
      return response;
    } catch (error) {
      // console.info('error', error.response);
      if (error && error.response) {
        showErrorPage(error.response);
        return error.response;
      } else {
        return Promise.reject({ ...error });
      }
    }
  },
  downloadCall: async (config) => {
    let headers = setHeaderOptions(config);
    try {
      let response = await axios.get(config.url, {
        headers: headers,
        responseType: 'blob'
      })
      // console.info('response', response);
      let contentType = response.headers['content-disposition'];
      const indexOfFirst = contentType.indexOf('=');
      const indexOfLast = contentType.indexOf('xlsx');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      let fileName = contentType.substring(indexOfFirst + 1, indexOfLast + 4);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      return response;
    } catch (error) {
      // console.info('error', error.response);
      if (error && error.response) {
        showErrorPage(error.response);
        return error.response;
      } else {
        return Promise.reject({ ...error });
      }
    }
  }
};

export default ApiCall;
