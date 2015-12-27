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

    var EMPTY_CELL = 0;

    function moveUp(state) {
        var columns = parseColumns(state);
        for (var i = 0; i < columns.length; i++) {
            columns[i] = mergeLine(columns[i]);
        }
        return setColumns(columns);
    }

    function moveDown(state) {
        var columns = parseColumns(state);
        for (var i = 0; i < columns.length; i++) {
            columns[i] = mergeLine(columns[i].reverse());
        }
        return setColumnsDown(columns);
    }

    function parseColumns(grid) {
        var columns = [];
        for (var column = 0; column < Math.sqrt(grid.length); column++) {
            var columnItems = [];
            for (var row = 0; row < Math.sqrt(grid.length); row++) {
                var index = (row * Math.sqrt(grid.length)) + column;
                columnItems.push(grid[index]);
            }
            columns.push(columnItems.reverse());
        }
        return columns;
    }

    function setColumns(columns) {
        var grid = [];
        for (var column = 0; column < columns.length; column++) {
            var columnItems = columns[column].reverse();
            for (var row = 0; row < columnItems.length; row++) {
                var gridIndex = (row * columns.length) + column;
                grid[gridIndex] = columnItems[row];
            }
        }
        return grid;
    }

    function setColumnsDown(columns) {
        var grid = [];
        for (var column = 0; column < columns.length; column++) {
            var columnItems = columns[column];
            for (var row = columnItems.length - 1; row >= 0; row--) {
                var gridIndex = (row * columns.length) + column;
                grid[gridIndex] = columnItems[row];
            }
        }
        return grid;
    }

    function mergeLine(state) {
        var newState = state.slice();
        for (var current = newState.length - 2; current >= 0; current--) {
            var last = current + 1;
            if (newState[current] !== EMPTY_CELL && newState[current] === newState[last]) {
                // Merge the current two cells
                newState[last] = newState[last] + newState[current];
                newState[current] = EMPTY_CELL;
            } else if (newState[current] !== EMPTY_CELL && newState[last] === EMPTY_CELL) {
                // Find the first cell that is not empty
                while (newState[last] === EMPTY_CELL) {
                    last++;
                }
                // Merge if the current cell is same as first non-empty cell,
                // otherwise move the current cell in the first empty cell.
                if (newState[current] !== EMPTY_CELL && newState[last] === newState[current]) {
                    newState[last] = newState[last] + newState[current];
                    newState[current] = EMPTY_CELL;
                } else {
                    newState[last-1] = newState[current];
                    newState[current] = EMPTY_CELL;
                }
            }
        }
        return newState;
    }

    return {
        moveUp: moveUp,
        moveDown: moveDown,
        mergeLine: mergeLine
    };
}());