import React from 'react';
import { Table } from 'react-bootstrap';

const Game = (parsedGames) => {
	parsedGames = parsedGames['parsedGames'];

	function singleGame(oneGame) {
		return (
			<tr>
				<td>{oneGame[0]}</td>
				<td>{oneGame[3]}</td>
				<td>{oneGame[2]}</td>
				<td>{oneGame[1]}</td>
				<td>{oneGame[4]}</td>
				<td>{oneGame[5]}</td>
				<td>{oneGame[6]}</td>
			</tr>
		);
	}

	return (
		<div id='table-container'>
			<Table bordered>
				<thead>
					<tr>
						<th>ID</th>
						<th>Home Team</th>
						<th>Total TRX Bet on Home</th>
						<th>Away Team</th>
						<th>Total TRX Bet on Away</th>
						<th>Date</th>
						<th>Game Status</th>
					</tr>
				</thead>
				<tbody>{parsedGames.map(singleGame)}</tbody>
			</Table>
		</div>
	);
};

export default Game;
