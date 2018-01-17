import React , {Component} from 'react';
import './CoinTable.css';
import socketIOClient from 'socket.io-client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {CoinRows} from './CoinRows';

export class CoinTable extends Component {

	constructor(props) {
		super(props);
		this.updateValues = this.updateValues.bind(this);

	}

	numberWithCommas(number) {
		var parts = number.toString().split(".");
	  	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");	
	}


	updateValues() {


	    this.props.socket.on('trades', tradeMsg => {
	    	var coinName = tradeMsg.msg.long;
	    	if(document.getElementById(coinName+ "-name") != null) {
	    		var coinPrice = document.getElementById(coinName + "-price");
	    		var coinMC = document.getElementById(coinName + "-mc");
	    		var coinSupply = document.getElementById(coinName + "-supply");
	    		var coinPct = document.getElementById(coinName + "-pct");
	    		if(coinPrice != null) coinPrice.innerHTML = "$" + this.numberWithCommas(tradeMsg.msg.price);
	    		if(coinMC != null) coinMC.innerHTML = this.numberWithCommas(tradeMsg.msg.mktcap);
	    		if(coinSupply != null) coinSupply.innerHTML = this.numberWithCommas(tradeMsg.msg.supply);
	    		if(coinPct != null) coinPct.innerHTML = this.numberWithCommas(tradeMsg.msg.perc);
	    		//console.log(tradeMsg.msg);
	    	}

	    });

	}



	render() {
	    
	    {this.updateValues()}

		return(

				<table className = "coin-table">
					<thead>
						<tr>
							<th> # </th>
							<th> Name </th>
							<th> Market Cap </th>
							<th> Price </th>
							<th> Supply </th>
							<th> 24 Hour % Change </th>
						</tr>
					</thead>
					<CoinRows/>
				</table>

		);
		

	}



}

