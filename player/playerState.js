class PlayerState {
  constructor(pid, infected, hanger, social, houseId) {
    this.pid = pid;
    this.hid = houseId;
    this.infected = infected;
    this.hanger = hanger;
    this.social = social;
    this.friends = this.getRandomPeoplesAsFriends()
    setInterval(() => this.gethungyer(), deltaTime)
  }
  update() {

    if (this.hanger <= 0) {
      this.hanger = 0
    }
    // social updater
  }
  changeState(i, array) {

  }
  getInfected() {
    this.infected = true
  }
  gethungyer() {
    this.hanger -= playerGetHungryBy;
  }
  getRandomPeoplesAsFriends() {
    return 0
  }
}