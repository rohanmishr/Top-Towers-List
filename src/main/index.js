let data;
let towers = [];
let inview = 0;

// utils
const getTowerByName = (name) => {
    for (let i = 0; i < towers.length; i++) {
        if (towers[i].name == name) {
            return towers[i]
        }
    }
}

const getTowerByAcronym = (acr) => {
    for (let i = 0; i < towers.length; i++) {
        if (getAcronym(towers[i].name) == acr) {
            return towers[i]
        }
    }
}

const getAcronym = (tower) => {
    let t = tower.split(" ");
    let r = "";

    for (let i = 0; i < t.length; i++) {
        r += t[i].charAt(0);
    }

    return r;
}

class Enums {
    static Terrifying = 10;
    static Catastrophic = 11;
    static Horrific = 12;
    static Unreal = 13;
}

class Templates {
    static ListTower(rank, tower) {
        return `
        <div onclick="viewTower(&quot;${tower.name}&quot;)" class="listTower ${rank == 1 ? 'gold' : ''} ${rank == 2 ? 'silver' : ''} ${rank == 3 ? 'bronze' : ''}">
            <h2 class="listTower-rank">#${rank}</h2>
            <h2 class="listTower-tower">${tower.name}</h2>
        </div>
        `
    }
}

class Tower {
    constructor(name, difficulty, verifier, creators, location, gpStyle, difficultySource, Length, verifDate, videoLink, rank) {
        this.name = name;
        this.difficulty = difficulty;
        this.verifier = verifier;
        this.creators = creators;
        this.location = location;
        this.gpStyle = gpStyle;
        this.difficultySource = difficultySource;
        this.Length = Length;
        this.verifDate = verifDate;
        this.videoLink = videoLink;
        this.rank = rank;
    }

    difficultyRange() {
        
    }
}

$('#file-loader').load("src/data/list.csv", () => {
    data = Papa.parse($('#file-loader')[0].innerHTML);
    console.log(data);

    for (let i = 1; i < data.data.length; i++) {
        towers.push(new Tower(
            data.data[i][0],
            data.data[i][1],
            data.data[i][2],
            data.data[i][3],
            data.data[i][4],
            data.data[i][5],
            data.data[i][6],
            data.data[i][7],
            data.data[i][8],
            data.data[i][9],
            i
        ));
    }

    for (let i = 0; i < towers.length; i++) {
        $("#list")[0].innerHTML += Templates.ListTower(i + 1, towers[i]);
    }

    viewTower(towers[0].name); // default view to top 1
    console.log(data);
});

const viewTower = (tower) => {
    console.log(tower);
    inview = getTowerByName(tower);

    $("#viewer-towerName")[0].innerHTML = inview.name;
    $("#viewer-creators")[0].innerHTML = inview.creators;
    $("#viewer-verifier")[0].innerHTML = inview.verifier;
    $("#viewer-location")[0].innerHTML = inview.location;
    $("#video")[0].src = inview.videoLink;
}

const page = (id) => {
    $(".page").toArray().forEach((page) => {
        page.style.display = "none";
    }); // hide all pages

    $("#" + id).css("display", "flex");

    $(".header-link").toArray().forEach((link) => {
        link.classList.remove("active");
    })

    $("#header-" + id)[0].classList.add("active");
}


