function light_playable_ai(board)
{
    if (board.turn == -1) {
            return;
        }
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
        handle_turn_ai(board);
    }
}

function ai_turn(board) {
    let ai = new AITurn();
    console.log("extra:", board.extra_move);
    let ai_move = ai.get_move(board, board.extra_move);
    let target = ai_move[1];
    let target_div = document.getElementById(`${target.x}${target.y}`);

    board.selected = document.getElementById(`piece-${ai_move[0].x}${ai_move[0].y}`);
    move_piece(board, target_div);
    if (board.forced && ai_move[0].has_take(board).length > 0) {
        board.extra_move = true;
        ai_turn(board);
    }
    board.reset_board();
    board.turn = 1;
    handle_turn_ai(board);
}

function handle_turn_ai(board) {
    if (board.done) {
        document.getElementById('message').innerHTML = `${board.turn == 1 ? "Goed gedaan!" : "De AI maakte random zetten. Mag je zelf bepalen wat je daarmee doet."}`;
        return;
    }
    console.log("handle_turn_ai");
    if (board.turn == 1) {
        light_playable_ai(board);
    }
    else {
        ai_turn(board);
    }
}

function go_play(board, mode) {
    board.new_game();
    if (mode == "multiplayer") {
        board.mode = "multiplayer";
        handle_turn(board);
    }
    else {
        console.log("ai");
        board.mode = "ai";
        handle_turn_ai(board);
    }
}

let board = new Board();

document.addEventListener('DOMContentLoaded', () => {
    let new_game = document.getElementById('new_game');
    new_game.addEventListener('click', () => {
        cleanup(board);
        board.reset_board();
        clear_squares(board);
        go_play(board, "multiplayer");
        board.started = true;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let ai_game = document.getElementById('ai_game');
    ai_game.addEventListener('click', () => {
        cleanup(board);
        board.reset_board();
        clear_squares(board);
        go_play(board, "ai");
        board.started = true;
    });
});