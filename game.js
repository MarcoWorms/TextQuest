function GameConsole() {
    this.line1 = document.getElementById("line1")
    this.line2 = document.getElementById("line2")
    this.line3 = document.getElementById("line3")
    this.line4 = document.getElementById("line4")
    this.line5 = document.getElementById("line5")
    this.line6 = document.getElementById("line6")
    this.line7 = document.getElementById("line7")
    this.line8 = document.getElementById("line8")
    this.line9 = document.getElementById("line9")
    this.line10 = document.getElementById("line10")


    this.print = function(text) {
        this.line1.innerHTML = this.line2.innerHTML;
        this.line2.innerHTML = this.line3.innerHTML;
        this.line3.innerHTML = this.line4.innerHTML;
        this.line4.innerHTML = this.line5.innerHTML;
        this.line5.innerHTML = this.line6.innerHTML;
        this.line6.innerHTML = this.line7.innerHTML;
        this.line7.innerHTML = this.line8.innerHTML;
        this.line8.innerHTML = this.line9.innerHTML;
        this.line9.innerHTML = this.line10.innerHTML;
        this.line10.innerHTML = text;
    }
}

function Game(gameConsole) {

    game = this;


    // Console API
    this.gameConsole = gameConsole
    this.print = function(text) {
        game.gameConsole.print(text);
    }
    //-----------------------

    // Auxiliar
    this.randInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //-----------------------

    // GUI manager
    this.gameStance = document.getElementById("gameStance").value,
    this.guiElements = {
        "energy"        : [parseInt(document.getElementById("gameEnergy").innerHTML), "gameEnergy"],
        "maxEnergy"     : [parseInt(document.getElementById("gameMaxEnergy").innerHTML), "gameMaxEnergy"],
        "level"         : [parseInt(document.getElementById("gameLevel").innerHTML), "gameLevel"],
        "exp"           : [parseInt(document.getElementById("gameExp").innerHTML), "gameExp"],
        "expToLevel"    : [parseInt(document.getElementById("gameExpToLevel").innerHTML), "gameExpToLevel"],
        "hp"            : [parseInt(document.getElementById("gameHp").innerHTML), "gameHp"],
        "maxHp"         : [parseInt(document.getElementById("gameMaxHp").innerHTML), "gameMaxHp"],
        "str"         : [parseInt(document.getElementById("gameStr").innerHTML), "gameStr"],
        "agi"         : [parseInt(document.getElementById("gameAgi").innerHTML), "gameAgi"],
        "luk"         : [parseInt(document.getElementById("gameLuck").innerHTML), "gameLuck"]
    }
    // Get elements from GUI and puts them in guiElements object
    this.getGuiElements = function() {
        game.gameStance = document.getElementById("gameStance").value;

        for (property in game.guiElements) {
            game.guiElements[property][0] = game.player[game.guiElements[property][1]]
        }
    }
    // Get elements from guiElements object and puts them in GUI
    this.updateGuiElements = function() {

        // iterates all gui elements and puts them in their place
        for (property in game.guiElements) {
            document.getElementById(game.guiElements[property][1]).innerHTML = game.guiElements[property][0];
        }

        // also prints txtOutput
        if (game.txtOutput) {
            game.print(game.txtOutput);
        }

    }
    //--------------------

    // Game Logic
    this.updateTime = 1000; // Interval in ms for update function
    this.player = {
        "gameEnergy"        : 0,
        "gameMaxEnergy"     : 30,
        "gameLevel"         : 1,
        "gameExp"           : 0,
        "gameExpToLevel"    : 10,
        "gameHp"            : 10,
        "gameMaxHp"         : 10,
        "gameStr"           : 1,
        "gameAgi"           : 1,
        "gameLuck"          : 1
    }
    this.tick = 0;
    this.txtOutput = "";
    this.update = function() {
        game.getGuiElements();
        game.txtOutput = "";

        if (game.gameStance == "idle") {

            game.txtOutput += "You are idle. - ";

            if (game.tick % 20 == 0 && game.tick != 1 && game.tick != 0) {
                game.player.gameMaxEnergy += 1;
                game.txtOutput += "You feel relaxed... "
            }

            if (game.player.gameEnergy < game.player.gameMaxEnergy) {
                game.player.gameEnergy += 1;
                game.txtOutput += "Energy Restoring... ";
            } else {
                game.txtOutput += "Energy full. ";
            }

        } else if (game.gameStance == "combat") {
            //do combat, spend energy
        }

        game.txtOutput = "Tick " + String(game.tick) + " - " + game.txtOutput
        game.updateGuiElements();
        game.tick += 1;
    }
    //-----------------------

    //Save Manager


    this.loadSave = function() {
        //loads save content
        game.saveContent = localStorage.getItem('save');

        //if save content exists, proceed to load
        if (game.saveContent) {
            //returns saveContent as array
            game.saveContent = game.saveContent.split(",")

            //feed the game with the saveContent
            game.tick =                     parseInt(game.saveContent[0]);
            game.player.gameEnergy =        parseInt(game.saveContent[1]);
            game.player.gameMaxEnergy =     parseInt(game.saveContent[2]);
            game.player.gameLevel =         parseInt(game.saveContent[3]);
            game.player.gameExp =           parseInt(game.saveContent[4]);
            game.player.gameExpToLevel =    parseInt(game.saveContent[5]);
            game.player.gameHp =            parseInt(game.saveContent[6]);
            game.player.gameMaxHp =         parseInt(game.saveContent[7]);
            game.player.gameStr =           parseInt(game.saveContent[8]);
            game.player.gameAgi =           parseInt(game.saveContent[9]);
            game.player.gameLuk =           parseInt(game.saveContent[10]);

            // finish loading
            game.print("Game Loaded.")
            game.txtOutput = "";
            game.updateGuiElements()
        } else {
            game.print("No save found.")
        }
    }

    this.saveSave = function() {
        //saves saveContent as an array
        game.saveContent = [
                            game.tick,
                            game.player.gameEnergy,
                            game.player.gameMaxEnergy,
                            game.player.gameLevel,
                            game.player.gameExp,
                            game.player.gameExpToLevel,
                            game.player.gameHp,
                            game.player.gameMaxHp,
                            game.player.gameStr,
                            game.player.gameAgi,
                            game.player.gameLuk
                           ]
        localStorage.setItem('save', game.saveContent)

        //finishes saving
        game.print("Game Saved.")
        game.txtOutput = "";
        game.updateGuiElements()
    }

    this.resetSave = function() {
        //resets the game if checkbox is checked
        if (document.getElementById("reallyReset").checked) {
            localStorage.removeItem('save');
            game.print("Your save file is dust now... Reload the page to restart the game.")
            game.txtOutput = "";
            game.updateGuiElements()
        } else {
            game.print("If you really want to do that, check the box.")
        }
    }

    //------------------------

}

function Main() {
    this.gameConsole = new GameConsole();
    this.game = new Game(this.gameConsole);
    this.begin = function () {
        document.getElementById("load").addEventListener("click", game.loadSave);
        document.getElementById("save").addEventListener("click", game.saveSave);
        document.getElementById("reset").addEventListener("click", game.resetSave);
        this.timer = window.setInterval(this.game.update.bind(this), game.updateTime);
    }
}

var main = new Main();
main.begin();