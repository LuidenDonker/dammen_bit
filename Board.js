class Board {
    constructor(mode) {
        this.squares = [];
        this.board = this.create_board();
        this.turn = 1;
        this.selected = null;
        this.started = false;
        this.extra_move = false;
		this.mode = mode;
    }

    init_pieces() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                if (j % 2 != i % 2) {
                    this.squares[i * 8 + j].piece = new Piece(i, j, 'black');
                }
            }
        }
        for (let i = 5; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (j % 2 != i % 2) {
                    this.squares[i * 8 + j].piece = new Piece(i, j, 'white');
                }
            }
        }
    }

    place_pieces() {
        for (let square of this.squares) {
            if (square.piece != "none") {
                let piece = document.createElement('div');

                piece.className = 'piece';
                piece.classList.add(square.piece.colour);
                piece.id = `piece-${square.piece.x}${square.piece.y}`;
                document.getElementById(`${square.piece.x}${square.piece.y}`).appendChild(piece);

                piece.addEventListener('click', (event) => {
                    click_piece(event, this);
                });
            }
        }
    }

    new_game()  {
        this.init_pieces();
        this.place_pieces();
    }

	reset_board() {
		this.extra_move = false;
		this.forced = false;
		this.selected = null;
	}

    can_upgrade(i) {
        if (i == 0) {
            return "white";
        }
        if (i == 7) {
            return "black";
        }
        return false;
    }

    check_colour(i, j) {
        if ((i + j) % 2 == 0) {
            return 'white';
        }
        return 'black';
    }

    create_board() {
        let board_div = document.getElementById('board');
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = new Square(i, j);
                let square_div = document.createElement('div');

                square.upgrade = this.can_upgrade(i);

                square_div.className = 'square';
                square_div.classList.add(this.check_colour(i, j));
                square_div.id = `${i}${j}`;
                board_div.appendChild(square_div);

                square_div.addEventListener('click', (event) => {
                    click_square(event, this);
                });

                this.squares.push(square);
            }
        }
    }
}
