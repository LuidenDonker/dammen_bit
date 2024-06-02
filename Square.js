class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.piece = "none";
        this.upgrade = false;
    }

    can_upgrade() {
        if (this.upgrade == this.piece.colour) {
            console.log("upgrade");
            this.piece.upgrade = true;
            document.getElementById(`piece-${this.x}${this.y}`).classList.add('upgrade');
        }
    }
}
