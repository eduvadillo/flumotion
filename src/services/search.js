import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

export function newSearch(credentials) {
  return axios.post(`${API_URL}/album`, credentials).then(successStatus).catch(internalServerError);
}

export function searchNotFound(credentials) {
  return axios.post(`${API_URL}/song-not-find`, credentials).then(successStatus).catch(internalServerError);
}
