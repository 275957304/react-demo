import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';


import { getMyList} from '../../api/index'


class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
          name : 'react-home',
          userInfo : {}
      }
   }
   componentDidMount(){
                
    getMyList().then(res => {
            console.log('商品列表');
            console.log(res)  

        })
        
   }
   handleClick (){
      //这里请求数据
        //   console.log('getData');
    //  console.log(this.props)
      // axios去请求数据 
      //const { dispatch, } = this.props
      //dispatch()
   }
   render() {
      return(
      	<div>
      		Home
      		<section>	
      			<h2>{this.state.name}</h2>
      			<Link to="/user">user</Link>
      			<Button type="ghost" size="small" onClick={this.handleClick.bind(this)} inline>getData</Button>
      		</section>
      	</div>

      )
   }
}

export default connect()(Home)