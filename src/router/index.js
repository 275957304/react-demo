import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
//使用 react 编写代码时，能让修改的部分自动刷新。
import { hot } from 'react-hot-loader';



import Home from '../containers/Home/index';
import User from '../containers/User/index';


const Root = () => (
	<div>
		<Switch>
			<Route exact path="/" component= {Home} />
			<Route exact path="/user" component= {User} />
			<Redirect to="/" />
		</Switch>
	</div>
);


export default hot(module)(Root);
//
/*
	router4 说明
	exact 关键词，表示只对当前的路由进行匹配。

	<Link to="/today" /> --> <a href="/calendar/today" />
	to:object 可以接受string或者一个object，来控制url。使用方法如下

	pathname - 要链接到的路径
	search - 查询参数
	hash - URL 中的 hash，例如 #the-hash
	state - 存储到 location 中的额外状态数据

	<Link to={{
	  pathname: '/courses',
	  search: '?sort=name',
	  hash: '#the-hash',
	  state: {fromDashboard: true}
	}} />


	import { NavLink } from 'react-router-dom';	
	<NavLink to="/about" activeClassName="selected>About</NavLink>
	它可以为当前选中的路由设置类名、样式以及回调函数等。
	exact用于严格匹配，匹配到/则不会继续向下匹配，to则是控制跳转的路径，activeClassName是选中状态的类名，我们可以为其添加样式。我们在/second后面添加1234来想路由中传递信息，这结合了上面Route中的/second/:id，结合使用了


	Switch:独立路由
	Switch常常会用来包裹Route，它里面不能放其他元素，用来只显示一个路由。总是渲染第一个匹配到的组件。

	<Redirect> 组件，单独使用时，一旦当路由匹配到的时候，浏览器就会进行重定向跳转；而配合 <Switch> 使用时，只有当没有路由匹配的时候，才会进行重定向。


	嵌套布局
	<Route path="/users/:userId" component={UserProfilePage} />
	const UserProfilePage = props => (
	  <div className="user-sub-layout">
	    <aside>
	      <UserNav />
	    </aside>
	    <div className="primary-content">
	      <UserProfile userId={props.match.params.userId} />
	    </div>
	  </div>
	)

	Match 对路径进行优化，减少重复性的代码输入：
	props.match 包含4个属性：match.params、match.isExact、match.path、match.url
	match.path：是指写在 <Route> 中的 path 参数；
	match.url：是指在浏览器中显示的真实 URL。
	const UserSubLayout = ({ match }) => {
	    console.log(match.path)   // output: "/users"
	    console.log(match.url)  // output: "/users"
	    return (
	      <div className="user-sub-layout">
	        <aside>
	          <UserNav />
	        </aside>
	        <div className="primary-content">
	          <Switch>
	            <Route path={match.path} exact component={BrowseUserTable} />
	            <Route path={`${match.path}/:userId`} component={UserProfilePage} />
	          </Switch>
	        </div>
	      </div>
	    )
	  }

	const UserProfilePage = ({match}) => {
	    console.log(match.path); // output: "/users/:userId"
	    console.log(match.url); // output: "/users/bob"
	    return <UserProfile userId={match.params.userId} />
	}
	
	在写路由路径时使用 match.path，因为使用 match.url 最终会产生不可预料的场景
	const UserComments = ({ match }) => {
	    console.log(match.params);  // output: {}
	    return <div>UserId: {match.params.userId}</div>
	}
	const UserSettings = ({ match }) => {
	    console.log(match.params);  // output: {userId: "5"}
	    return <div>UserId: {match.params.userId}</div>
	}


	//React Router 4.0：使用 babel-plugin-syntax-dynamic-import + react-loadable 实现按需加载
	https://segmentfault.com/a/1190000012545692


*/