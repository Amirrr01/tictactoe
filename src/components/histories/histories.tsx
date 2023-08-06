import { AppState } from "../../app";

interface HistoriesProps extends Omit<AppState, "board"> {
	onHistory: (idx: number) => void;
}

export default function Histories({
	nextPlayer,
	histories,
	currentStep,
	winner,
	onHistory,
}: HistoriesProps) {
	return (
		<div>
			<h5>{winner ? `Winner: ${winner}` : `Next Player: ${nextPlayer}`}</h5>

			<div className="btn-group-vertical mt-2">
				{histories.map((h, idx) => (
					<button
						onClick={() => onHistory(idx)}
						key={idx}
						className={"btn btn-sm btn-secondary"}
						disabled={currentStep === idx}
					>
						Go to {idx === 0 ? "game start" : `move #${idx}`}
					</button>
				))}
			</div>
		</div>
	);
}
