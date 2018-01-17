import React , {Component} from 'react';


export class CoinRows extends Component {

	constructor(props) {
		super(props)

		this.state = {
			coinNames: [],
		};
		this.createCoinRows = this.createCoinRows.bind(this);

	}

	componentDidMount() {
		const promises = fetch('http://coincap.io/front')
				.then(results=>{
					return results.json();
				});

		promises.then((result) =>{
			for(var i = 0; i < 20; i++) {
				this.setState({coinNames: result});
			} 

		});

	}


	createCoinRows() {
		var coinRows = [];
		var coins = [];
		console.log(this.state.coinNames);
		if(this.state.coinNames.length !== 0) {
			const coinProps = this.state.coinNames;
			for(var i = 0; i < 20; i++) {
				coins.push([coinProps[i].long, coinProps[i].mktcap, coinProps[i].price, coinProps[i].supply, i + 1, coinProps[i].perc]);

			}

			for(var i = 0; i < coins.length;i++) {
				var coin = coins[i];
				coinRows.push(
					<tr key = {coin[0]}>
						<td id={coin[0]+"-#"}>{coin[4]}</td>
						<td id={coin[0]+"-name"}>{coin[0]}</td>
						<td id={coin[0]+"-mc"}>{this.numberWithCommas(coin[1])}</td>
						<td id={coin[0]+"-price"}>${this.numberWithCommas(coin[2])}</td>
						<td id={coin[0]+"-supply"}>{this.numberWithCommas(coin[3])}</td>
						<td id={coin[0]+"-pct"}>{this.numberWithCommas(coin[5])}</td>
					</tr>
				);
			}
		}

		return coinRows;

	}

	numberWithCommas(number) {
		var parts = number.toString().split(".");
	  	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");	
	}

	render() {
		return (

				<tbody>
					{this.createCoinRows()}
				</tbody>
		);
	}
}