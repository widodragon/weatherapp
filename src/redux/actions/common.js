import {Typography} from '../../utils';

export const setIncrementBanner = state => {
  return {
    type: Typography.REWARD_INCREMENT_CHECK,
    payload: state,
  };
};

export const saveToMarkerGlobal = state => {
  return {
    type: Typography.SAVE_TO_MARKER,
    payload: state,
  };
};
