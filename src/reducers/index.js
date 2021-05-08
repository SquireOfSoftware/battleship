import {combineReducers} from 'redux'
import setupBoardReducer from './setupBoardReducer'

export default combineReducers({
  setupBoard: setupBoardReducer
});