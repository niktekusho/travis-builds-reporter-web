import { client, fetcher } from 'travis-builds-reporter-core';
import axios from 'axios';

export const RETRIEVE = 'retrieve';
export const FETCHED = 'fetched';

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

export const fetch = repository => (dispatch) => {
  dispatch(retrieve(repository));
  return fetcher.fetch('or-bit/monolith', client.create(axios))
    .then(builds => dispatch(fetched(builds)));
};