import {fromJS} from 'immutable';
import { ADD_COMMENT, REMOVE_COMMENT} from '../constants/actions';

const initialState = fromJS({});

export function comments(state = initialState, action = {type: ''}){
  switch (action.type) {
    case ADD_COMMENT:
      return state;
    case REMOVE_COMMENT:
      return state;
    default:
      return state;
  }
}
