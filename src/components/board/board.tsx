import { Component } from "react";
import classes from "./board.module.scss";
import { AppState } from "../../app";

interface BoardProps extends Pick<AppState, "board"> {
	onCell: (idx: number) => void;
	onReset: () => void;
}

export default class Board extends Component<BoardProps> {
	render() {
		const { board, onCell, onReset } = this.props;

		return (
			<div className={classes.wrapper}>
				<div className={classes.board}>
					{board.map((board, idx) => (
						<button onClick={() => onCell(idx)} key={idx} className={classes.btn}>
							{board}
						</button>
					))}
				</div>
				<button onClick={onReset} className="btn btn-sm btn-primary mt-3">
					Reset
				</button>
			</div>
		);
	}
}
