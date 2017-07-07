import { FETCHED, RETRIEVE } from '../actions';

const initialState = {
  repository: '',
  builds: [],
  isFetching: null,
};

export default (state = initialState, action) => {
  console.log(JSON.stringify(action, null, ' '));
  switch (action.type) {
    case RETRIEVE:
      return { ...state, repository: action.repository, isFetching: true };
    case FETCHED:
      return { ...state, builds: action.builds, isFetching: false };
    default:
      return state;
  }
};
