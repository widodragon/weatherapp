import {Typography} from '../../utils';

const initialState = {
  increment: 0,
  marker: [],
};
export default common = (state = initialState, action) => {
  switch (action.type) {
    case Typography.REWARD_INCREMENT_CHECK:
      return {
        ...state,
        increment: action.payload,
      };
    case Typography.SAVE_TO_MARKER:
      return {
        ...state,
        marker: action.payload,
      };
    default:
      return state;
  }
};
