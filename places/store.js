class Store {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.placeState = new PlaceState(stockOfFood, stockOfToiletPaper)
    }
    takeFood() {
        this.placeState.savedFood -= howMuchTakeEveryTurn;
    }
    takeToiletPaperAway() {
        this.placeState.savedToiletPaper -= howMuchTakeEveryTurn;
    }
    render() {
        noStroke()
        textAlign(CENTER, CENTER)
        fill(0, 255, 0)
        text(`${this.placeState.savedFood},${this.placeState.savedToiletPaper}`, this.x - 5, this.y - 25, 20)
        rect(this.x, this.y, 100, 100)
    }
}