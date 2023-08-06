import { Component } from "react";
import { Board, Histories } from "./components";

type TBoard = (string | null)[];
type Player = "X" | "O";
export interface AppState {
	board: TBoard;
	nextPlayer: Player;
	winner: Player | null;
	histories: TBoard[];
	currentStep: number;
}

function checkWinner(board: TBoard): Player | null {
	const winnersBoard = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let [x, y, z] of winnersBoard)
		if (board[x] === board[y] && board[y] === board[z]) return board[x] as Player;

	return null;
}

export default class App extends Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		this.state = JSON.parse(localStorage.getItem("state")!) || {
			board: new Array(9).fill(null),
			nextPlayer: "X",
			histories: [new Array(9).fill(null)],
			winner: null,
			currentStep: 0,
		};
	}

	setStateStorage: typeof this.setState = (state) => {
		this.setState(state, () => {
			localStorage.setItem("state", JSON.stringify(this.state));
		});
	};

	handleCell = (idx: number) => {
		let { nextPlayer, histories, currentStep, winner } = this.state;
		const board = [...this.state.board];

		if (board[idx] || winner) return;

		board[idx] = nextPlayer;
		nextPlayer = nextPlayer === "X" ? "O" : "X";
		histories = [...histories.slice(0, currentStep + 1), board];
		winner = checkWinner(board);

		this.setStateStorage({
			board,
			nextPlayer,
			histories,
			currentStep: histories.length - 1,
			winner,
		});
	};

	handleReset = () => {
		this.setStateStorage({
			board: new Array(9).fill(null),
			nextPlayer: "X",
			histories: [new Array(9).fill(null)],
			currentStep: 0,
			winner: null,
		});
	};

	handleHistory = (idx: number) => {
		const board = [...this.state.histories[idx]];
		this.setStateStorage({ board, currentStep: idx, nextPlayer: idx % 2 ? "O" : "X" });
	};

	render() {
		const { board, ...args } = this.state;

		return (
			<div className="container d-flex mt-5" style={{ gap: 20 }}>
				<Board onCell={this.handleCell} onReset={this.handleReset} board={board} />
				<Histories onHistory={this.handleHistory} {...args} />
			</div>
		);
	}
}
