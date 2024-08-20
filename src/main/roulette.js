const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

class Roulette {
    static round = -1;
    static rouletteTowers = [];

    static init = () => {
        // reset
        this.stop();
        this.round = -1;
        $("#roulette-start")[0].classList.remove("failed");
        let roulettePool = [];

        $("#roulette-towers")[0].innerHTML = ""

        // get pool of towers
        if ($("#opt-main")[0].checked) {
            roulettePool = roulettePool.concat(towers);
        }

        for (let i = 0; i < 10; i++) {
            // get 10 random towers
            this.rouletteTowers.push(roulettePool[rand(0, roulettePool.length - 1)]);
        }

        this.next();
        $("#roulette-start")[0].innerHTML = "Restart";
    }

    static next = () => {
        this.round++;
        $("#roulette-towers")[0].innerHTML += this.template(this.rouletteTowers[this.round]);
    }

    static submit = () => {
        if ( $("#input" + this.round)[0].value >= this.round) {
            try {
                this.next()
            } catch {
                // win
                $("#roulette-towers")[0].innerHTML += `
                <h2>You win!</h2>
                `
            }
        } else {
            this.fail();
        }

    }

    static stop = () => {
        this.rouletteTowers = [];
    }

    static fail = () => {
        $("#roulette-start")[0].classList.add("failed");
        $("#roulette-towers")[0].innerHTML += `
        <h2>Score: ${this.round+1}</h2>
        `
    }

    static template = (tower) => {
        console.log(tower);
        return `
        <div class="roulette-tower">
            <iframe id="video" 
                src="${tower.videoLink}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture; 
                web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
            <div class="roulette-tower-info">
                <div class="roulette-tower-info-left">
                    <h1>#${tower.rank} -  ${tower.name}</h1>
                    <h3>By ${tower.creators}</h3>
                </div>
                <div class="roulette-tower-info-controls">  
                    <input id="input${this.round}" placeholder="At least floor ${this.round+1}">
                    <span>
                        <button onClick="Roulette.submit()">Submit</button>
                        <button>Give up</button>
                    </span>
                </div>
            </div>
        </div>
        `
    }
}