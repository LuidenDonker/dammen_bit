function light_playable(board)
{
    if (board.extra_move) {
        let piece_div = document.getElementById(`piece-${board.selected.id[6]}${board.selected.id[7]}`);
        if (piece_div) {
            piece_div.classList.add('playable');
        }
        return;
    }
    for (let square of board.squares) {
        if (square.piece != "none" && square.piece.has_take(board).length > 0) {
            let piece_div = document.getElementById(`piece-${square.piece.x}${square.piece.y}`);
            if (piece_div) {
                piece_div.classList.add('playable');
            }
            board.forced = true;
        }
    }
    if (board.forced) {
        return;
    }

    board.done = true;

    for (let square of board.squares) {
        if (square.piece != "none" && square.piece.has_move(board).length > 0) {
            let piece_div = document.getElementById(`piece-${square.piece.x}${square.piece.y}`);
            if (piece_div) {
                piece_div.classList.add('playable');
                board.done = false;
            }
        }
    }
    if (board.done) {
        board.turn *= -1;
        handle_turn(board);
    }
}

function clear_squares(board) {
    for (let square of board.squares) {
        let square_div = document.getElementById(`${square.x}${square.y}`);
        square_div.classList.remove('available');
    }
}

function show_squares(board, piece_div) {
    let piece = board.squares[Number(piece_div.id[0]) * 8 + Number(piece_div.id[1])].piece;
    let target = (piece.has_take(board).length > 0) ? piece.has_take(board) : piece.has_move(board);

    clear_squares(board);
    for (let square of target) {
        let square_div = document.getElementById(`${square.x}${square.y}`);
        square_div.classList.add('available');
    }
}

function click_piece(event, board) {
    let piece_div = event.target;

	if (board.turn == -1 && board.mode == "ai") {
		return;
	}
    if (!piece_div.classList.contains('playable')) {
        return;
    }
    if (board.selected) {
        board.selected.classList.toggle('selected');
    }
    if (board.selected == piece_div && !board.extra_move) {
        board.selected = null;
        clear_squares(board);
        return;
    }
    piece_div.classList.toggle('selected');
    board.selected = piece_div;
    show_squares(board, piece_div.parentElement);
}

function remove_piece(board, taken) {
    let taken_square = board.squares[taken[0] * 8 + taken[1]];
    let taken_div = document.getElementById(`piece-${taken[0]}${taken[1]}`);

    taken_div.remove();
    taken_square.piece = "none";
}

function move_piece(board, target_div) {
    let old_square = board.squares[Number(board.selected.id[6]) * 8 + Number(board.selected.id[7])];
    let target_square = board.squares[Number(target_div.id[0]) * 8 + Number(target_div.id[1])];
    let piece_div = document.getElementById(`piece-${old_square.x}${old_square.y}`);

    target_square.piece = old_square.piece;
    target_square.piece.x = target_square.x;
    target_square.piece.y = target_square.y;
    old_square.piece = "none";

    target_div.appendChild(piece_div);
    piece_div.id = `piece-${target_square.x}${target_square.y}`;

    if (board.forced) {
        let taken = [(old_square.x + target_square.x) / 2, (old_square.y + target_square.y) / 2];
        remove_piece(board, taken);
    }
    target_square.can_upgrade();
}

function clean_board(board) {
    for (let square of board.squares) {
        let square_div = document.getElementById(`${square.x}${square.y}`);
        square_div.classList.remove('available');
        square_div.classList.remove('forced');
        let piece_div = document.getElementById(`piece-${square.x}${square.y}`);
        if (piece_div) {
            piece_div.classList.remove('playable');
            piece_div.classList.remove('selected');
        }
    }
}

function click_square(event, board) {
    let target = event.target;

    if (target.classList.contains('piece')) {
        return;
    }
    if (board.selected == null || (!target.classList.contains('available'))) {
        return;
    }

    move_piece(board, target);
    clean_board(board);
    board.extra_move = false;
    if (board.forced && board.squares[Number(board.selected.id[6]) * 8 + Number(board.selected.id[7])].piece.has_take(board).length > 0) {
        board.extra_move = true;
		if (board.mode == "ai") {
			handle_turn_ai(board);
			return;
		}
        handle_turn(board);
        return;
    }
    board.turn *= -1;
    board.reset_board();
	if (board.mode == "ai") {
		handle_turn_ai(board);
		return;
	}
    handle_turn(board);
    return;
}

function handle_turn(board) {
    if (board.done)
    {
        document.getElementById('message').textContent = `Game over! ${board.turn == -1 ? "Zwart" : "Wit"} heeft gewonnen!`;
        board.done = false;
        return;
    }
    let kleur = board.turn == 1 ? "wit" : "zwart";

    document.getElementById('message').textContent = `Je speelt nu multiplayer, ${kleur} aan zet.`;
    light_playable(board);
}

function cleanup(board) {
    for (let square of board.squares) {
        let piece_div = document.getElementById(`piece-${square.x}${square.y}`);
        if (piece_div) {
            piece_div.remove();
        }
        square.piece = "none";
    }
    board.reset_board();
    board.turn = 1;
}
