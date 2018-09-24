
// 将 action.type 抽取为常量，减少出错
import { LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../types';

//用户登录 login
export function login(url,param){
   // return dispatch =>
   //  httpRequest(url,param).then(function(data){
   //      console.log( data )
   //      if(typeof data !== 'number'){
   //          //登录成功
   //       setItem('session',data.session);
   //       setItem('uid',data.uid);
   //          console.log(getItem('session'))
   //          dispatch(loginSuccess({uid:data.uid,session:data.session,loginState:true}))
   //      }
   //  })
}


// 获取 成员信息列表
export function getUser() {
   return dispatch => {
        //这里请求用用户信息
        //dispatch({ type: GET_MEMBER_LIST, msg: res })
   };
}

// 返回状态
// export const changeBackStatus = playLoad => ({
//   type: 'CHANGE_BACK_STATUS',
//   playLoad
// })