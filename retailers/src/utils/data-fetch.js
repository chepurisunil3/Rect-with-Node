const fetcher = (url, options) => {
  return fetch(url, setOptions(options));
};

const setOptions = (options) => {
  let update = { ...options };
  if (localStorage.token) {
    update.headers = {
      ...update.headers,
      "x-auth-token": `${localStorage.token}`,
    };
  }
  return update;
};
export default fetcher;
