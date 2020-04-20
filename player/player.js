class Player {
  constructor(x, y, id, playerstate, name) {
    this.x = x;
    this.y = y;
    this.name = name || "adam";
    this.velx = 0;
    this.vely = 0;
    this.id = id;
    this.playerState = playerstate;
    this.currerntMission = 2;
    this.isCoofing = false
    //missions
    this.missions = []
    this.finishedm = 0
    //this.missions.push(new PlayerMission(id, 'gh', this.x, this.y))
  }
  update() {

    this.isCoofing = (random(0, 100) < 10 ? true : false)
    this.gotSick()
    if (this.playerState.hanger == 0) {
      this.onHunger()
    }

    this.missionHandler()
    let hin = getIndexById(this.playerState.hid, houses);
    let Sid = getIndexById(this.getClosestStore(), stores)
    this.playerState.update();
    this.velx *= drag;
    this.vely *= drag;
    this.x += this.velx;
    this.y += this.vely;
    if (this.missions[0]) {
      this.currerntMission = this.missions[0].update();

    }
    switch (this.currerntMission) {
      default:
        this.viberate();
        break;
      case 1:
        this.moveToward(houses[hin])
        break;
      case 2:
        this.moveToward(stores[Sid])
        break;
    }
  }

  render() {
    noStroke()
    textAlign(CENTER, CENTER)
    fill((this.playerState.infected ? color(255, 0, 0) : (this.playerState.hanger == 0 ? color(150, 255, 150) : color(255, 255, 255))))
    text(`${this.name} ${this.currerntMission == undefined ? 0 : this.currerntMission} ${this.missions.length} `, this.x - 5, this.y - 30, 20)
    stroke(0)
    strokeWeight(2)
    circle(this.x, this.y, 20, 20)
  }

  viberate() {
    this.velx += random(-4, 4);
    this.vely += random(-4, 4);
  }

  gotSick() {
    if (!this.playerState.infected && this.gotCloserToSomeOneInfected()) {
      this.playerState.getInfected();
    }
  }
  onHunger() {
    let HeNEEDIT = true
    this.missions.forEach(m => { if (m) { if (m.name != "gts") { HeNEEDIT = false } } })
    if (HeNEEDIT) {
      HeNEEDIT = false
      this.missions.push(new PlayerMission(this.id, 'gts'))
      this.missions.push(new PlayerMission(this.id, 'gh', this.x, this.y))
    }
  }
  missionHandler() {
    if (this.missions.length == 0) {
      //this.missions.push(new PlayerMission(this.id, "gr", this.x, this.y))
      let hin = getIndexById(this.playerState.hid, houses);
      if (getIndexByName("gh", this.missions) == -1) {
        if (getDistance(this.x, this.y, houses[hin].x, houses[hin].y) > propertySize) {
          this.missions.push(new PlayerMission(this.id, "gh", this.x, this.y))
        }
      }
      this.currentMission = 0
    }



    if (this.missions[0]) {
      //this.missions[0].update()
      if (this.missions[0].finished) {
        this.finishedm++
        this.missions.splice(0, 1)
      }
    }
  }
  gotCloserToSomeOneInfected() {
    let istrue = false
    people.forEach(player => {
      if ((getDistance(player.x, player.y, this.x, this.y) < playerPersonalSpace) && player.playerState.infected && player.isCoofing) {
        istrue = true
      }
    })
    return istrue
  }
  moveToward(obj) {
    let dir = calculateDir(this.x, this.y, obj.x, obj.y)
    let way = normalizedVec(dir.x, dir.y, 1)
    this.velx += way.x;
    this.vely += way.y;

  }
  getClosestStore() {
    let dis = 999999999
    let id = 0
    stores.forEach(store => {
      let n_dis = getDistance(store.x, store.y, this.x, this.y)
      if (n_dis < dis) {
        dis = n_dis
        id = store.id
      }
    })
    return id
  }
}
