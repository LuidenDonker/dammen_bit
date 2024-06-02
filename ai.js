class AITurn {
	constructor() {
		this.name = "AI";
	}

	get_pot_moves(board) {
		let pot_moves = [];

		board.forced = true;
		for (let square of board.squares) {
			if (square.piece != "none" && square.piece.colour == "black") {
				if (square.piece.has_take(board).length > 0) {
					pot_moves.push(square.piece);
				}
			}
		}
		if (pot_moves.length == 0) {
			board.forced = false;
			for (let square of board.squares) {
				if (square.piece != "none" && square.piece.colour == "black") {
					if (square.piece.has_move(board).length > 0) {
						console.log(square.piece.has_move(board) > 0);
						pot_moves.push(square.piece);
					}
				}
			}
		}
		return pot_moves;
	}
	get_move(board, extra_move) {
		if (extra_move) {
			console.log("inin", board.selected.id);
			let piece = board.squares[Number(board.selected.id[6]) * 8 + Number(board.selected.id[7])].piece;
			let target = piece.has_take(board);

			target = target[Math.floor(Math.random() * target.length)];
			board.extra_move = false;
			return [piece, target];
		}
		let pot_moves = this.get_pot_moves(board);
		let piece = pot_moves[Math.floor(Math.random() * pot_moves.length)];
		let target = (piece.has_take(board).length > 0) ? piece.has_take(board) : piece.has_move(board);

		target = target[Math.floor(Math.random() * target.length)];
		console.log(piece, target);
		return [piece, target];
	}
}
