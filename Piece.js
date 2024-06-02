class Piece {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.upgrade = false;
    }
    //Excuus voor deze functies, ik had er een 2d matrix van moeten maken maar ga het nu niet meer veranderen..
    has_take(board) {
        let target = [];
        if (board.turn == 1 && this.colour == 'white') {
            if (this.x > 1) {
                if (this.y > 1) {
                    if (board.squares[(this.x - 1) * 8 + this.y - 1].piece != "none" && board.squares[(this.x - 1) * 8 + this.y - 1].piece.colour == 'black' && board.squares[(this.x - 2) * 8 + this.y - 2].piece == "none") {
                        target.push(board.squares[(this.x - 2) * 8 + this.y - 2]);
                    }
                }
                if (this.y < 6) {
                    if (board.squares[(this.x - 1) * 8 + this.y + 1].piece != "none" && board.squares[(this.x - 1) * 8 + this.y + 1].piece.colour == 'black' && board.squares[(this.x - 2) * 8 + this.y + 2].piece == "none") {
                        target.push(board.squares[(this.x - 2) * 8 + this.y + 2]);
                    }
                }
            }
            if (this.x < 6) {
                if (this.y > 1) {
                    if (board.squares[(this.x + 1) * 8 + this.y - 1].piece != "none" && board.squares[(this.x + 1) * 8 + this.y - 1].piece.colour == 'black' && board.squares[(this.x + 2) * 8 + this.y - 2].piece == "none") {
                        target.push(board.squares[(this.x + 2) * 8 + this.y - 2]);
                    }
                }
                if (this.y < 6) {
                    if (board.squares[(this.x + 1) * 8 + this.y + 1].piece != "none" && board.squares[(this.x + 1) * 8 + this.y + 1].piece.colour == 'black' && board.squares[(this.x + 2) * 8 + this.y + 2].piece == "none") {
                        target.push(board.squares[(this.x + 2) * 8 + this.y + 2]);
                    }
                }
            
            }
        }
        else if (board.turn == -1 && this.colour == 'black') {
            if (this.x < 6) {
                if (this.y > 1) {
                    if (board.squares[(this.x + 1) * 8 + this.y - 1].piece != "none" && board.squares[(this.x + 1) * 8 + this.y - 1].piece.colour == 'white' && board.squares[(this.x + 2) * 8 + this.y - 2].piece == "none") {
                        target.push(board.squares[(this.x + 2) * 8 + this.y - 2]);
                    }
                }
                if (this.y < 6) {
                    if (board.squares[(this.x + 1) * 8 + this.y + 1].piece != "none" && board.squares[(this.x + 1) * 8 + this.y + 1].piece.colour == 'white' && board.squares[(this.x + 2) * 8 + this.y + 2].piece == "none") {
                        target.push(board.squares[(this.x + 2) * 8 + this.y + 2]);
                    }
                }
            }
            if (true && this.x > 1) {
                if (this.y > 1) {
                    if (board.squares[(this.x - 1) * 8 + this.y - 1].piece != "none" && board.squares[(this.x - 1) * 8 + this.y - 1].piece.colour == 'white' && board.squares[(this.x - 2) * 8 + this.y - 2].piece == "none") {
                        target.push(board.squares[(this.x - 2) * 8 + this.y - 2]);
                    }
                }
                if (this.y < 6) {
                    if (board.squares[(this.x - 1) * 8 + this.y + 1].piece != "none" && board.squares[(this.x - 1) * 8 + this.y + 1].piece.colour == 'white' && board.squares[(this.x - 2) * 8 + this.y + 2].piece == "none") {
                        target.push(board.squares[(this.x - 2) * 8 + this.y + 2]);
                    }
                }
            }
        }
        return target;
    }

    has_move(board) {
        let target = [];
        if (board.turn == 1 && this.colour == 'white') {
            if (this.x > 0) {
                if (this.y > 0) {
                    if (board.squares[(this.x - 1) * 8 + this.y - 1].piece == "none") {
                        target.push(board.squares[(this.x - 1) * 8 + this.y - 1]);
                    }
                }
                if (this.y < 7) {
                    if (board.squares[(this.x - 1) * 8 + this.y + 1].piece == "none") {
                        target.push(board.squares[(this.x - 1) * 8 + this.y + 1]);
                    }
                }
            }
            if (this.upgrade && this.x < 7) {
                if (this.y > 0) {
                    if (board.squares[(this.x + 1) * 8 + this.y - 1].piece == "none") {
                        target.push(board.squares[(this.x + 1) * 8 + this.y - 1]);
                    }
                }
                if (this.y < 7) {
                    if (board.squares[(this.x + 1) * 8 + this.y + 1].piece == "none") {
                        target.push(board.squares[(this.x + 1) * 8 + this.y + 1]);
                    }
                }
            }
        }
        else if (board.turn == -1 && this.colour == 'black') {
            if (this.x < 7) {
                if (this.y > 0) {
                    if (board.squares[(this.x + 1) * 8 + this.y - 1].piece == "none") {
                        target.push(board.squares[(this.x + 1) * 8 + this.y - 1]);
                    }
                }
                if (this.y < 7) {
                    if (board.squares[(this.x + 1) * 8 + this.y + 1].piece == "none") {
                        target.push(board.squares[(this.x + 1) * 8 + this.y + 1]);
                    }
                }
            }
            if (this.upgrade && this.x > 0) {
                if (this.y > 0) {
                    if (board.squares[(this.x - 1) * 8 + this.y - 1].piece == "none") {
                        target.push(board.squares[(this.x - 1) * 8 + this.y - 1]);
                    }
                }
                if (this.y < 7) {
                    if (board.squares[(this.x - 1) * 8 + this.y + 1].piece == "none") {
                        target.push(board.squares[(this.x - 1) * 8 + this.y + 1]);
                    }
                }
            }
        }
        return target;
    }
}
