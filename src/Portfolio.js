import React, {Component} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import socketIOClient from 'socket.io-client';



class Portfolio extends Component {

	constructor(props) {
		super(props);
		this.updatePortfolio = this.updatePortfolio.bind(this);
	}

	updatePortfolio() {

		this.props.socket.on("trades", tradeMsg => {

			var coinName = tradeMsg.msg.long;
			if(coinName == "Ripple") {
				var portfolio = document.getElementById('user-Ripple-price');
				if(portfolio != null) {
					portfolio.innerHTML = tradeMsg.msg.price;
				}
			}

		})

	}

	render() {

		return (
				<div id = "Ripple-name">
					<h1 id = "Ripple-price"> Your Ripple Holdings: </h1>
				</div>
			)

	}


}

export default Portfolio;
