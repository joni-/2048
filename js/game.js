var Game = (function() {

    var Keys = {
        UP: 38,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40
    };

    var state = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];

    function createTiles() {
        $("body").append("<div id='grid'></div>");
        var game = $("#grid");
        for (var i = 0; i < 9; i++) {
            game.append("<div class='grid-cell'></div>");
        }
    }

    function redraw() {
        var cells = $(".grid-cell");
        for (var i = 0; i < state.length; i++) {
            cells[i].textContent = state[i];
        }
    }
    
    function randomStart() {
        var r1 = getRandomNumber(state.length);
        var r2 = r1;
        while (r1 == r2) {
            r2 = getRandomNumber(state.length);
        }
        state[r1] = getRandomNumber(2) == 1 ? 2 : 4;
        state[r2] = getRandomNumber(2) == 1 ? 2 : 4;
    }

    // Return random integer between 0 - max (exlusive).
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function registerKeyListeners() {
        $("body").on('keyup', function(e) {
            var key = e.keyCode;
            if (key === Keys.UP) {
                Game.Control.moveUp(state);
            } else if (key === Keys.DOWN) {
                console.log('Move down');
            } else if (key === Keys.LEFT) {
                console.log('Move left');
            } else if (key === Keys.RIGHT) {
                console.log('Move right');
            }
        });
    }

    return {
        initialize: function() {
            createTiles();
            randomStart();
            redraw();
            registerKeyListeners();
        }
    };
}());


Game.Control = (function() {

    function moveUp(state) {
        var newState = state.slice();
        var gridSize = Math.sqrt(newState.length);

        for (var column = 0; column < gridSize; column++) {
            for (var index = column + gridSize; index < newState.length; index++) {
                var start = index - gridSize;
                if (newState[start] === newState[index]) {
                    newState[start] = newState[start] * 2;
                    newState[index] = 0;
                    break;
                }
            }        
        }

        return newState;
    }

    return {
        moveUp: moveUp
    };
}());