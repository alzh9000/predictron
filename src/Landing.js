import React from 'react';
import { Link } from 'react-router-dom';
import tronBasketball from './utils/tron_hype.mp4';
import tronBasketballLogo from './utils/predictron_bet_high_resolution.png';
import './App.css';

const Landing = () => {
	return (
		<div className='App'>
			<video id='backgroundVideo' autoPlay loop muted>
				<source src={tronBasketball} type='video/mp4' />
			</video>
			<div id='splash-items'>
				<img src={tronBasketballLogo} alt='logo' width='50%' />
				<h1 id='title-splash'>PredicTRON</h1>
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
