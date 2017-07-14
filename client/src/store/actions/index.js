export const RETRIEVE = 'retrieve';
export const FETCHED = 'fetched';
export const ERRORED = 'errored';

export const retrieve = (repository) => {
  return (dispatch) => {
    dispatch({
      type: RETRIEVE,
      repository,
    });
  };
};

export const fetched = (builds) => {
  return (dispatch) => {
    dispatch({
      type: FETCHED,
      builds,
    });
  };
};

export const errored = () => {
  return (dispatch) => {
    dispatch({
      type: ERRORED,
    });
  };
};

export const fetcher = repository => (dispatch) => {
  dispatch(retrieve(repository));
  let url = 'http://localhost';
  // This is possible because on a Heroku dyno the NODE environment variable is set to /app/.heroku/node/bin/node.
  if (process.env.NODE && process.env.NODE.includes('heroku')) {
    url = 'https://travis-builds-reporter.herokuapp.com';
  }
  const port = process.env.PORT || 3001;

  return fetch(`${url}:${port}/builds`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({repository})
    })
    .then(res => res.json())
    .then(data => dispatch(fetched(data)))
    .catch(error => dispatch(errored()));
};
