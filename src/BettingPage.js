import React, { Component } from 'react';
import axios from 'axios';
import Game from './Game';
import tronBasketballLogoDark from './utils/predictron_bet_high_resolution.png';
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
		this.loadTRON = this.loadTRON.bind(this);
	}

	componentDidMount() {
		this.loadTRON();
	}

	async setBettingContract() {
		const tronWeb = window.tronWeb;
		this.bettingContract = await tronWeb
			.contract()
			.at('TEWs5AFnA8VfvmT8n4o1uKiVUYskW2gequ');
	}

	async walletConnect() {
		const tronLink = window.tronLink;
		await tronLink.request({ method: 'tron_requestAccounts' });
	}

	// Connects to TRON Nile testnet
	async loadTRON() {
		try {
			await this.setBettingContract();
			await this.determineGames();
			this.setState({ address: 'Connected', showConnect: false });
		} catch (e) {
			console.log(e);
			console.log('hello');
			alert(
				'Could not connect to TRON network! Make sure you have TRONLink installed and try again using the Connect Wallet button.'
			);
			this.setState({ address: 'Not Connected', showConnect: true });
		}
	}

	// javascript function to call the solidity bet function
	async bet(team, gameID, amount) {
		return await this.bettingContract
			.bet(team, gameID)
			.send({ feeLimit: 100_000_000, callValue: amount });
	}

	async getBets(gameIDs) {
		const bets = await this.bettingContract.getBets(gameIDs).call();
		console.log(bets);
		return bets;
	}

	async handleSubmit(event) {
		const tronWeb = window.tronWeb;
		event.preventDefault();
		alert(
			'Bet Submitted -- A TRONLink window will appear. Please verify the contract address and approve the transation.'
		);
		try {
			await this.bet(
				event.target.team.value,
				event.target.gameid.value,
				// Multiple betamount by 1,000,000 to convert from TRX to SUN
				tronWeb.toSun(event.target.betamount.value)
			);
			window.location.reload();
		} catch {
			alert('Your bet has not gone through!');
		}
	}

	async determineGames() {
		const tronWeb = window.tronWeb;
		const url =
			'https://www.balldontlie.io/api/v1/games/?seasons[]=2022&per_page=100&start_date=2022-11-01&end_date=2022-11-30&page=';
		// to store the games for web purposes
		let parsedGames = [];
		let counter = 0;

		for (let i = 0; i < 5; i++) {
			const page = i + 1;
			const real_url = url + page.toString();
			const response = await axios(real_url);
			const gameArr = response.data.data;
			const gameLen = gameArr.length;
			const start = counter;
			let ids = [];
			for (let j = 0; j < gameLen; j++) {
				//take one game and extract specific data points
				const one_game = gameArr[j];
				if (one_game['status'] !== 'Final') {
					let extracted_game = [
						one_game['id'],
						one_game['home_team']['full_name'],
						0,
						one_game['visitor_team']['full_name'],
						0,
						one_game['date'].slice(0, 10),
						one_game['status'],
					];
					parsedGames.push(extracted_game);
					ids.push(one_game['id']);
					++counter;
				}
			}

			const bets = await this.getBets(ids);

			for (let j = start; j < counter; ++j) {
				const homeBets = tronWeb.toDecimal(bets.home[j - start]);
				const awayBets = tronWeb.toDecimal(bets.away[j - start]);
				parsedGames[j][4] = tronWeb.fromSun(homeBets);
				parsedGames[j][2] = tronWeb.fromSun(awayBets);
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
						src={tronBasketballLogoDark}
						alt=''
						height='120px'
						className='title-banner'
					/>
					<h1>PredicTRON</h1>
					<p>Wallet Status: {this.state.address}</p>
					{this.state.showConnect ? <this.WalletButton /> : null}
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
		<button id='wallet-button' onClick={this.loadTRON}>
			Connect/Switch Wallet
		</button>
	);
}

export default BettingPage;
