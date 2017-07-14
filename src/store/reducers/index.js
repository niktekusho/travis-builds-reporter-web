import { FETCHED, RETRIEVE, ERRORED } from '../actions';

const initialState = {
  repository: '',
  builds: [],
  isFetching: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERRORED:
      const out = { ...state, error: true, builds: [], isFetching: false };
      console.log(out);
      return { ...state, error: true, builds: [], isFetching: false };
    case RETRIEVE:
      return { ...state, error: null, repository: action.repository, isFetching: true };
    case FETCHED:
      return { ...state, error: null, builds: action.builds, isFetching: false };
    default:
      return state;
  }
};
