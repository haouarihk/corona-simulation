class PlayerMission {
  constructor(pid, name, x, y) {
    this.pid = pid;
    this.name = name
    this.finished = false
    this.x = x;
    this.y = y;

  }
  update() {
    let hin = getIndexById(people[this.pid].playerState.hid, houses);
    let cSId = getIndexById(people[this.pid].getClosestStore(), stores)
    switch (this.name) {
      case "gts":// gts means go to store
        if (getDistance(people[this.pid].x, people[this.pid].y, stores[cSId].x, stores[cSId].y) < propertySize) {
          this.finished = true
          people[this.pid].playerState.hanger = foodPocket;
        } else {
          return 2
        }
        break;
      case "gh":// gh means go home
        if (getDistance(people[this.pid].x, people[this.pid].y, houses[hin].x, houses[hin].y) < propertySize) {
          this.finished = true
        } else {
          return 1
        }
        break;
      case "gr":
        if (!getDistance(people[this.pid].x, people[this.pid].y, houses[hin].x, houses[hin].y) < propertySize) {
          this.finished = true
        } else {
          return 0
        }
        break;
    }

  }
}
