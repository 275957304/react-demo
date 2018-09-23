import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';



export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
      	name : 'react-home'
      }
   }
   componentDidMount(){
   		console.log('componentDidMount')
   }
   render() {
      return(
      	<div>
      		Home
      		<section>	
      			<h2>{this.state.name}</h2>
      			<Link to="/user">user</Link>
      			
      		</section>
      	</div>

      )
   }
}