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

function DomManager() {

    this.getInputFields = function() {

        var rawInputFields = document.getElementsByClassName("inputField");
        var inputFields = {};
        
        for (i = 0, max = rawInputFields.length; i < max; i += 1) {
            inputFields[rawInputFields[i].id] = rawInputFields[i].value;
        }

        return inputFields;
    
    }

    this.setOutputFields = function(outputFields) {

        var rawOutputFields = document.getElementsByClassName("outputField");

        for (i=0, max = rawOutputFields.length; i < max; i += 1) {
            if (outputFields[rawOutputFields[i].id] == undefined) {
                console.log(rawOutputFields[i].id + " not provided");
            } else {
                rawOutputFields[i].innerHTML = outputFields[rawOutputFields[i].id];
            }
            
        }

    }
}

function Game(gameConsole, domManager) {

    this.gameConsole = gameConsole;
    this.domManager = domManager;
    this.timer = null;
    this.gameDict = {
        "energy" : 0,
        "maxEnergy" : 20,
        "level" : 1,
        "exp" : 0,
        "expToLevel" : 10,
        "hp" : 10,
        "maxHp" : 10,
        "str": 1,
        "agi": 1,
        "luk": 1

    };

    game = this;

    // Console API
    
    this.print = function(text) {
        game.gameConsole.print(text);
    } 

    this.changeUpdateTime = function(ammount) {
        window.clearInterval(game.timer);
        game.timer = window.setInterval(window.game.update.bind(this), ammount);
    }

    this.begin = function() {
        game.timer = window.setInterval(window.game.update.bind(this), 1000);
        domManager.setOutputFields(game.gameDict);        
    }
    
    this.update = function() {
        var playerInput = this.domManager.getInputFields();
        var gameStance = playerInput.gameStance;
        var txtOutput = "";

        if (gameStance == "idle") {

            txtOutput += "You are Idle. "

            if (game.gameDict.energy < game.gameDict.maxEnergy) {
                game.gameDict.energy += 1;
                txtOutput += "You restore some energy..."
            }


        }

        game.print(txtOutput);
        domManager.setOutputFields(game.gameDict);
    }

}

function main() {
    this.gameConsole = new GameConsole();
    this.domManager = new DomManager();
    this.game = new Game(this.gameConsole, this.domManager);
    this.game.begin();
}

main();
