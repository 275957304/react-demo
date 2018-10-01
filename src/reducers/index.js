// 引入reducer
import { combineReducers } from 'redux';
import user from './user/reducer';
//console.log(user)

// combineReducers() 函数用于将分离的 reducer 合并为一个 reducer
const reducers = combineReducers({
   user
});


export default reducers;

/*
/*
	这里是redux的stor对象,用来让外界获取Redux的数据(stor.getState)或者修改Redux的数据 (stor.dispathc)
	const stor = createStore(reducer);

*/

/*
	Redux说明
	redux分为stor,action,reducer

	store:整合reducer里的数据
	import { createStore } from 'redux';
	const store = createStore(reducer);

	action:事件描述；
	{
		type:'type.ACTIONINFO',
		payload:data
	}

	reducer:数据处理
	const reducer = (state = 0, action) =>{
		switch(action.type){
			case 'ACTIONINFO' :
				return state + action.data  或者请求数据
			default:
				return state;

		}
	};


	//修改Redux stor里面的数据  store.dispatch({type:'ACTIONINFO',list:[1,2,3]});


	store对象数据要用为props传给React
	因为这个store只能有一个，也就只能创建一次，所以必须在最顶层处创建store对象，然后再一层层的传递下去，才能让所有组件才能都获取到store对象里的数据，
	为了让store.dispatch一改变数据，react就重新渲染，Redux提供了一个方法: 
	store.subscribe(render);
	这个函数可以监听Redux中state的变化，一有变化这个函数据就会被调用，页面就会重新渲染
	上面这个是手动调用，很麻烦。store数据还要一层层通过props传，  React-redux就产生了
	
	在React-redux中有两个比较关键的概念：Provider和connect方法。
	一般我们都将顶层组件包裹在Provider组件之中，这样的话，所有组件就都可以在react-redux的控制之下了,但是store必须作为参数放到Provider组件中去
	<Provider store = {store}>
    	<App/>
	<Provider>
	目的是让所有组件都能够访问到Redux中的数据。

	connect方法：connect(mapStateToProps, mapDispatchToProps)(MyComponent)
	mapStateToProps:意思就是把Redux中的数据映射到React中的props中去。就是把Redux中的state变成React中的props
	const mapStateToProps = (state) => {
		return {
			getData: state.data
		}
	}
	在组件中就可以通过 this.props.getData  拿到 store里的 state.data数据了。 不需要一层层的传递store对象了
	mapDispatchToProps: 把各种dispatch也变成了props让你可以直接使用。
	const mapDispatchToProps = (dispatch) => {
		return {
			onClick: () => {
				dispatch({type: 'ACTIONINFO', data : [a,b,c]});
			}
		};
	};
	这样在组件里就可以<button onClick = {this.props.onClick}>修改Redux里的数据</button>;而不需要手动store.subscribe订阅render函数以达到更新页面的目的。
	
	这种随处都可以使用、修改Redux中的数据的方式确实很方便，但Redux推荐的最佳实践还是在尽可能少的地方使用connect，把逻辑，数据相关的都放到容器组件中去处理，其他的组件都由容器组件所生成的props一层层传递下去然后渲染（傻瓜组件），这里就不多说了。













在我们的项目中，我们可能会分模块和功能写多个reducer文件，但最终，我们都需要把它合并到一个里面，这需要使用redex中的combineReducers

import { combineReducers } from "redux";
import * as reducers from "./reducers"
const rootReducer = combineReducers({
    ...reducers
});
export default rootReducer;

这是通用的用法，而在我学习的视频中，他在combineReducers中还加上了routerReducer，它的具体作用可以看官方文档react-router-redux，反正我是没怎么看懂，具体的作用感觉就是在切换页面的时候会多出一个LOCATION_CHANGE的时间，可以用来追踪页面的变化，具体要使用的话需要更改3个文件
1:上面的合并reducers的文件，在引入react-router-redux库的routerReducer方法后，在combineReducers中加上routing: routerReducer
2:在store.js中加上以下代码
...
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
...
export const history = syncHistoryWithStore(browserHistory, store);
3.在主入口文件中的<Router>根路由标签使用store.js中导出的history
<Router history={history}>
...
<Router>


action我把它做是一个接口，它主要是和reducer联动的，它默认必须返回一个type，用这个type的值来判断reducer中做哪一步操作 
例如：我需要增加一个评论，那我需要传评论文章的id，评论的用户，评论的内容，所以定义如下
// add comment
export let addComment = (postId, author, text) => {
    return {
        type: 'ADD_COMMENT',
        postId,
        author,
        text
    }
};



整合store，reducer，action
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
 
//此处传入的state即为store中的defaultState
let mapStateToProps = (state) => {
    return{
        posts: state.posts,
        comments: state.comments
    }
};
 
//此处的actionCreators即为简单的action文件
//Redux 本身提供了 bindActionCreators 函数，来将 action 包装成直接可被调用的函数
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
 
//最后调用connect()
const App = connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;

补充
使用redux-dev-tools
要使用redux的调试工具需要在store.js文件中的createStore()步骤中加入第三个参数，enhancers
import { createStore, compose} from 'redux';
//redux-dev-tools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);


让改变reducer后能够即时刷新页面
webpack可以监听我们的组件变化并做出即时相应，但却无法监听reducers的改变，所以在store.js中增加一下代码
//此处accepts的参数是reducers的存放路径，require()内的路径为执行combineReducers()的文件
if(module.hot){
    module.hot.accept("./reducers/", () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}






对于react-redux的理解梳理
react-redux，它是redux和react结合的一个框架,用来专门管理自己数据业务（或逻辑状态）的一个框架。
redux就是用来统一管理项目中的状态（state）。state它可以是前后端的各种数据，也可以是UI上的一些信息。简单点，它就是个对象，包含了项目中可能用于改变的一些信息。
redux重要关注的几点：Actions，Reducers，Store，
1、Actions:
function changeAction(index) {
    return { type: "channgTable", data:index }
}
2、Reducers :
const reducer = function(state={"tableIndex":0}, action={}) {
	switch(action.type){
	      //当发出type为changeTable的action对state的操作
	      case "changeTable":
	            let backup = state;
	            backup["tableIndex"] = action.data;
	            return Object.assign({}, state,backup);
	      default :
	            return Object.assign({}, state);
	}
}
3、Store:
var store = createStore(reducer);
其中有三个方法：
store.getState()：获取state，如上，经过reducer已经返回了一个新的state，那么就可以用该函数获取；
store.dispatch(action)：发出操作，更新state。action内有操作的类型，就可以出发不同的对state的更新；
store.subscribe(listener)：监听变化，当state发生更新时，就可以在这个函数的回调中监听。
上述为基本redux的用法和含义，发出的操作也是同步的，如要更深入了解异步操作和对state更合理的逻辑管理，可以查看Middleware、combineReducers函数等，本文不再详述。

react-redux在redux的基础上，就关注两点：Provider和connect。
1、Provider:
<Provider store={store}>
    <Router ref="router" history={hashHistory}>
        <Route path='/' component={Index}>
            <IndexRoute  component={MainPage}></IndexRoute>
        </Route>
    </Router>
</Provider>
Provider就是把我们用rudux创建的store传递到内部的其他组件。让内部组件可以享有这个store并提供对state的更新。

2、connect:
export default connect(mapStateToProps,mapDispatchToProps)(MainPage);
A: mapStateToProps：简单来说，就是把状态绑定到组件的属性当中。我们定义的state对象有哪些属性，在我们组件的props都可以查阅和获取。
const mapStateToProps = (state, ownProps) => {
    return {tableIndex:state.tableIndex}
}
console.log(this.props) //在props 可以看到绑定的store对象的数据状态
B: mapDispatchToProps：在redux中介绍过，用store.dispatch(action)来发出操作，那么我们同样可以把这个方法封装起来，即绑定到我们的方法中。
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeActive:(args)=>dispatch({type:"changeInfo",data:[a,b,c]})
    }
}
只要在组件中调用该属性中的方法，就可以发出一个特定的action，触发reducer对state进行更新。这里的reducer就是之前在redux中定义的reducer。

如果需要缓存怎么办？
还记得我们定义的reducer么。我们只需要将最新的状态存起来（无论是sessionStorage、数据库还是其它），然后默认的state去取缓存过的状态进行初始化渲染即可。
const reducer = function(state={"tableIndex":0}, action={}) {
	switch(action.type){
      //当发出type为changeTable的action对state的操作
      case "changeTable":
            let backup = state;
            backup["tableIndex"] = action.data;       
            //定义新的state，用于存储                           
            let newState = Object.assign({}, state,backup);
            sessionStorage.setItem("state",JSON.stringify(newState));
            return newState;
      default :
        if(sessionStorage.getItem("state")){
        //获取缓存过的state
              return Object.assign({},JSON.parse(sessionStorage.getItem("state")));
        }else{
              return Object.assign({}, state);
        }
	}
}

*/