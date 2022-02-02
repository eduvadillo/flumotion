import axios from "axios";

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
});

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
  return authService.post("/album", credentials).then(successStatus).catch(internalServerError);
}

export function searchNotFound(credentials) {
  return authService.post("/song-not-find", credentials).then(successStatus).catch(internalServerError);
}
