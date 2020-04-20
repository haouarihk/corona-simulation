let cities = []
let stores = []
let houses = []
let people = []
let avalHouses = []
function setup() {
  width = 4000
  height = 4000

  generateHouse();
  generateStores();
  generatePp();
}
fected = 0
middotx2 = 0
middoty2 = 0
function zoomer() {
  const newzoom = posWheel;
  zoom = lerp(zoom, newzoom, 1);
  newbe = lerp(newbe, 120 / (zoom - 100), 0.2)
  scale(newbe);
}
function draw() {
  fected = 0
  people.forEach(person => { fected += (person.playerState.infected ? 1 : 0) })
  nonfected = people.length - fected

  createCanvas(windowWidth, windowHeight);
  background(0);

  stroke(0)
  strokeWeight(1)
  fill(126, 200, 255)
  textAlign(CENTER)
  text(`infected :${fected}, Not infected : ${nonfected},  persantage of ${parseInt(fected / people.length * 100)}% are infected`, width / 2, 10);
  noStroke()
  translate(width / 2, height / 2);
  reloadOnFull()
  zoomer()
  let ool = ifOnlyOneLeft()
  if (ool.a) {
    posWheel = 300
  }
  const middot = getCenterDot(people);
  middotx2 = lerp(middotx2, -middot.x, 0.584)
  middoty2 = lerp(middoty2, -middot.y, 0.584)
  translate(middotx2, middoty2);


  houses.forEach(house => {
    house.update()
    house.render()
  })
  stores.forEach(store => {
    store.render()
  })
  people.forEach(player => {
    player.update()
    player.render()
  })
}
function ifOnlyOneLeft() {
  let allAlive = 0
  let id = 0
  people.forEach(p => { allAlive += (p.playerState.infected) ? 0 : 1; id = p.id })
  return { a: allAlive == 1 ? true : false, id }
}
function reloadOnFull() {
  if (parseInt(fected / people.length * 100) == 100) {
    location.reload();
  }
}




