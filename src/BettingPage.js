import React, { Component } from 'react';
import axios from 'axios';
import Game from './Game';
import HarmonyBasketballLogoDark from './utils/predictron_bet_high_resolution.png';
import './App.css';

class BettingPage extends Component {
	bettingContract = null;

	constructor() {
		super();
		this.state = {
			address: 'Not Connected',
			betting: {},
			games: [],
			gameRange: [],
            showConnect: true,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.loadTron = this.loadTron.bind(this);
	}

	componentDidMount() {
		this.loadTron();
		this.determineGames();
	}

	async setBettingContract() {
        const tronWeb = window.tronWeb;
		this.bettingContract = await tronWeb
			.contract()
			.at('TTA3URRJr4X7VXzTFgpDanv8ZXMKiBn8Sp');
	}

    async walletConnect() {
        const tronLink = window.tronLink;
        await tronLink.request({method: 'tron_requestAccounts'});
    }

	async loadTron() {
        try {
            await this.walletConnect();
		    await this.setBettingContract();
            this.setState({ address: 'Connected', showConnect: false })
        } catch {
            alert("Please make sure you have the TronLink extension installed! You can try again using the Connect Wallet button.")
            this.setState({ address: 'Not Connected', showConnect: true })
        }
	}

	// javascript function to call the solidity bet function
	async bet(team, gameID, amount) {
		await this.bettingContract
			.bet(team, gameID)
			.send({ feeLimit: 100_000_000, callValue: amount });
	}

    async get_ratios() {
        const bets = await this.bettingContract.getBets();
        console.log(bets);
    }

	handleSubmit(event) {
		event.preventDefault();
		this.bet(
			event.target.team.value,
			event.target.gameid.value,
			// Multiple betamount by 1000000 to convert from TRX to SUN
			event.target.betamount.value * 1000000
		);
		alert(
			'Bet Submitted -- A MetaMask window will appear. Please verify the contract address and approve the transation.'
		);
	}

	async determineGames() {
		let url =
			'https://www.balldontlie.io/api/v1/games/?seasons[]=2022&per_page=100&start_date=2022-01-01&page=';
		// to store the games for web purposes
		let parsedGames = [];

		for (let i = 0; i < 7; i++) {
			let page = i + 1;
			let real_url = url + page.toString();
			const response = await axios(real_url);
			let gameArr = response.data.data;
			let gameLen = gameArr.length;
			for (let j = 0; j < gameLen; j++) {
				//take one game and extract specific data points
				let one_game = gameArr[j];
				if (one_game['status'] !== 'Final') {
					let extracted_game = [
						one_game['id'],
						one_game['home_team']['full_name'],
						one_game['visitor_team']['full_name'],
						one_game['date'].slice(0, 10),
						one_game['status'],
					];
					parsedGames.push(extracted_game);
				}
			}
		}

		parsedGames.sort((a, b) => (a[0] > b[0] ? 1 : -1));
		this.setState({ games: parsedGames });
		this.setState({
			gameRange: [parsedGames[0][0], parsedGames[parsedGames.length - 1][0]],
		});
	}


	render() {
		return (
			<div id='background'>
				<div id='submission-form'>
					<img
						src={HarmonyBasketballLogoDark}
						alt=''
						height='82px'
						className='title-banner'
					/>
					<h1>Tron Bet</h1>
					<p>Wallet Status: {this.state.address}</p>
                    { this.state.showConnect ? <this.WalletButton /> : null}
					<form onSubmit={this.handleSubmit}>
						<label>Game ID</label>
						<br />
						<input
							type='number'
							name='gameid'
							min={this.state.gameRange[0]}
							max={this.state.gameRange[1]}
							className='formStyle'
						></input>
						<br />
						<label>Amount Bet (in TRX)</label>
						<br />
						<input
							type='number'
							step='0.000001'
							min='0'
							name='betamount'
							className='formStyle'
						></input>
						<br />
						<label>Which team? (1 for Home, 2 for Away)</label>
						<br />
						<input
							type='number'
							min='1'
							max='2'
							name='team'
							className='formStyle'
						></input>
						<br />
						<br />
						<button type='submit' id='submit-button'>
							Submit Bet
						</button>
					</form>
				</div>
				<br />
				<Game parsedGames={this.state.games} />
			</div>
		);
	}

    WalletButton = () => (
        <button id='wallet-button' onClick={this.loadTron}>
            Connect/Switch Wallet
        </button>
    )
}


export default BettingPage;
