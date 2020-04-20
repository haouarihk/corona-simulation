function preload() {
    data = loadJSON('https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.json');
}

function getDistance(x1, y1, x2, y2) {
    dis = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
    return dis
}
function calculateDir(x1, y1, x2, y2) {
    return { x: x2 - x1, y: y2 - y1 }
}
function normalizedVec(x, y, k = 1) {
    let p = Math.sqrt((x ** 2) + (y ** 2))
    return { x: x * k / p, y: y * k / p }
}
function generateRandomPlace(t) {
    let collision = true;
    let x = 0;
    let y = 0;
    let tries = 10000;
    while (collision && tries > 0) {
        x = Math.floor(Math.random() * width) - width;
        y = Math.floor(Math.random() * height) - width;
        if (this.isItAvaible(x, y, t)) {
            collision = false;
        }
        tries--;
    }
    hid = parseInt(random(0, houses.length - 1))
    if (tries == 0) {
        console.log("world is full")
        return { x: 0, y: 0 }
    } else {
        return { x, y };
    }
}
function generatePp() {
    for (i = 0; i < peopleCount; i++) {
        let iu = parseInt(random(0, avalHouses.length - 1))
        let myHouseId = avalHouses[iu].id
        let loc = generateRandomPlace(0)
        if (houses[myHouseId].pid.length >= howManyForEachHouse) {
            avalHouses.slice(iu, 1)
            let name = data[parseInt(random(0, 4899))]
            people.push(new Player(loc.x, loc.y, i, new PlayerState(0, parseInt(random(0, 100)) > 80, random(0, foodPocket), 2, myHouseId), name))
        } else {
            houses[myHouseId].pid.push(i)
            let name = data[parseInt(random(0, 4899))]
            people.push(new Player(loc.x, loc.y, i, new PlayerState(0, parseInt(random(0, 100)) > 20, random(0, foodPocket), 2, myHouseId), name))
        }
    }
}
function generateHouse() {
    for (i = 0; i < housesCount; i++) {
        let loc = generateRandomPlace(1)
        houses.push(new House(i, loc.x, loc.y, [], new PlaceState(avgSavedFood, avgSavedToiletPaper)))
        avalHouses.push({ id: i })
    }

}
function generateStores() {
    for (i = 0; i < storesCount; i++) {
        let loc = generateRandomPlace(1)
        stores.push(new Store(i, loc.x, loc.y))
    }
}
/////////
function isItAvaible(x, y, t) {
    switch (t) {
        case 0:
            return (!isThereAPlayer(x, y));
            break;
        case 1:
            return (!isThereAHouse(x, y) || !isThereAStore(x, y));
            break;
    }

}
function isThereAPlayer(x, y) {
    isTrue = false
    for (i = 0; i < people.length; i++) {
        const dist = playerPersonalSpace - getDistance(people[i].x, people[i].y, x, y);
        if ((people[i].x == x && people[i].y == y) || dist > 0) {
            isTrue = true;
        }
    }
    return isTrue;
}
//////////
function isThereAHouse(x, y) {
    isTrue = false
    for (i = 0; i < houses.length; i++) {
        const dist = housePersonalSpace - getDistance(houses[i].x, houses[i].y, x, y);
        if ((houses[i].x == x && houses[i].y == y) || dist > 0) {
            isTrue = true;
        }
    }
    return isTrue;
}
function isThereAStore(x, y) {
    isTrue = false
    for (i = 0; i < stores.length; i++) {
        const dist = housePersonalSpace - getDistance(stores[i].x, stores[i].y, x, y);
        if ((stores[i].x == x && stores[i].y == y) || dist > 0) {
            isTrue = true;
        }
    }
    return isTrue;
}
function mousePressed() {
    let xmouseinWorld = (mouseX - width / 2) * zoom;
    let ymouseinWorld = (mouseY - height / 2) * zoom;
    people.forEach(p => {
        let x = p.x
        let y = p.y
        let w = 380;
        if (contains(x, y, w, xmouseinWorld, ymouseinWorld)) {
            console.log("yooo")
        } else {
            console.log("nooo")
        }
    })
}

let zoom = 0, newbe = 0
function mouseWheel(event) {
    // to zoom in and out
    posWheel += event.delta;
    posWheel = constrain(posWheel, 101, 9000);
}
function contains(ax, ay, aw, x, y, bw) {
    return (x > ax && x < ax + aw && y > ay && y < ay + bw + 36);
}


function getCenterDot(blobs) {
    let blobscount = 0
    if (blobs) {
        const center = createVector(0, 0);
        let w = 0
        blobs.forEach(blob => {
            if (!blob.playerState.infected) {
                blobscount++
                center.x += (blob.x);
                center.y += (blob.y);
            }
        });
        center.x /= (blobscount);
        center.y /= (blobscount);
        return center;
    }
    return new Point(0, 0);
}

function getIndexById(id, array) {
    let indexofar = -1;
    array.forEach((ar, i) => {
        if (ar.id === id) {
            indexofar = i;
        }
    });
    return indexofar;
}
function getIndexByName(name, array) {
    let indexofar = -1;
    array.forEach((ar, i) => {
        if (ar.name === name) {
            indexofar = i;
        }
    });
    return indexofar;
}

