class House {
  constructor(id, x, y, pid, placeState) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.pid = pid || []
    this.inhouse = 0
    this.placeState = placeState
  }
  render() {
    noStroke()
    textAlign(CENTER, CENTER)
    fill(0, 0, 255)
    text(this.inhouse, this.x - 5, this.y - 25, 20)
    rect(this.x, this.y, 60, 60)
  }
  update() {
    this.inhouse = this.pid.length

    // update food count and toilet paper count
  }
}