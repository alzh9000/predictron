import React from 'react';
import { Link } from 'react-router-dom';
import HarmonyBasketball from './utils/tron_hype.mp4';
import HarmonyBasketballLogo from './utils/tron_bet_high_resolution.png';
import './App.css';

const Landing = () => {
	return (
		<div className='App'>
			<video id='backgroundVideo' autoPlay loop muted>
				<source src={HarmonyBasketball} type='video/mp4' />
			</video>
			<div id='splash-items'>
				<img src={HarmonyBasketballLogo} alt='logo' width='50%' />
				<h1 id='title-splash'>Tron Bet</h1>
				<br></br>
				<button id='get-started-button'>
					<Link id='launch-link' to='/app'>
						Launch the App
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Landing;
