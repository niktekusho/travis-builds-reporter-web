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
  
  return fetch('/builds',
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
