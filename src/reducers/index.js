// 引入reducer
import { combineReducers } from 'redux';
import user from './user/reducer';
//console.log(user)

// combineReducers() 函数用于将分离的 reducer 合并为一个 reducer
const reducers = combineReducers({
   user
});


export default reducers;