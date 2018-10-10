import React, {Component, PropTypes} from 'react'
class Alert extends Component {
	constructor (props) {
		super(props)
		this.state = {
			show: true,
			loadingTimer: null,
		}
	}
	// componentWillMount() {
	//
    // }
	componentDidMount () {

	}
	componentWillUnmount() {
        
    }
	render(){
		return(
			<div>
				弹出组件
			</div>
		)
	}
}
export default Alert
