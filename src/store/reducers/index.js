import { FETCHED, RETRIEVE } from '../actions';

const initialState = {
  repository: '',
  builds: [],
  isFetching: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE:
      return { ...state, repository: action.repository, isFetching: true };
    case FETCHED:
      return { ...state, builds: action.builds, isFetching: false };
    default:
      return state;
  }
};
