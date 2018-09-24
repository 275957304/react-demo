
// 将 action type 提取出来作为常量，防止编写错误
import { LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../types';

const userInfo = {
    loginState : false,    
    session : '',
    uid : '',
    device : '',
}
export default function user(state = userInfo, action ){
	// switch(action.type){
	// 	case types.LOGIN_USER_SUCCESS:
	// 		return {
	// 			...state,
	// 			title: action.playLoad
	// 		}
	// 	default:
	// 		return state

	// }
	return state
}

