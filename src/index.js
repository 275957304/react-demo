import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter , HashRouter, Route} from 'react-router-dom';
// HashRouter URL上会带#号
//<BrowserRouter> 使用 HTML5 提供的 history API (pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。
import './style/index.css';
import './style/index.less';

import store from './store/index';
import Root from './router/index';

//console.log(BrowserRouter);


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>, 
	document.getElementById('app')
);