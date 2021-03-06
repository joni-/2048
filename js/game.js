var Game = (function() {

    var Keys = {
        UP: 38,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40
    };

    var state = [];

    function initializeState(gridSize) {
        for (var i = 0; i < gridSize; i++) {
            state[i] = new Game.Common.Cell();
        }
    }

    function createTiles() {
        $("body").append("<div id='grid'></div>");
        var game = $("#grid");
        for (var i = 0; i < state.length; i++) {
            game.append("<div class='grid-cell'></div>");
        }
        setCss();
    }

    function setCss() {
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var gridSize = Math.min(screenWidth, screenHeight) - 10;

        var borderSize = 1;
        var marginSize = 2;

        var cellSize = gridSize / Math.sqrt(state.length) - borderSize * 2 - marginSize * 2;

        var grid = $("#grid");
        grid.css("width", gridSize);

        var cell = $(".grid-cell");
        cell.css("font-size", "3em");
        cell.css("width", cellSize);
        cell.css("height", cellSize);
        cell.css("margin", marginSize);
        cell.css("float", "left");
        cell.css("border", borderSize);
        cell.css("border-style", "solid");
        cell.css("text-align", "center");

    }

    function redraw() {
        var cells = $(".grid-cell");
        for (var i = 0; i < state.length; i++) {
            cells[i].innerHTML = state[i].getContent();
        }
    }
    
    function randomStart() {
        fillRandomCell();
        fillRandomCell();
    }

    // Return random integer between 0 - max (exlusive).
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function fillRandomCell() {
        if (!boardFull()) {
            var cell = getRandomEmptyCellIndex();
            // 90% of time create tile with 2, 10% of time with 4 
            state[cell].value = _.sample([2, 2, 2, 2, 2, 2, 2, 2, 2, 4]);
        }
    }

    function boardFull() {
        for (var i = 0; i < state.length; i++) {
            if (state[i].isEmpty()) {
                return false;
            }
        }
        return true;
    }

    function getRandomEmptyCellIndex() {
        var emptyCellIndexes = [];
        for (var i = 0; i < state.length; i++) {
            if (state[i].isEmpty()) {
                emptyCellIndexes.push(i);
            }
        }
        return _.sample(emptyCellIndexes);
    }

    function statesDiffer(newState, oldState) {
        return JSON.stringify(newState) !== JSON.stringify(oldState); 
    }

    function move(moveFunction) {
        newState = moveFunction(state);
        if (statesDiffer(newState, state)) {
            state = newState;
            fillRandomCell();
            redraw();
        }
    }

    function registerMoveEvents() {
        $("body").on('keyup', function(e) {
            var key = e.keyCode;
            if (key === Keys.UP) {
                move(Game.Control.moveUp);
            } else if (key === Keys.DOWN) {
                move(Game.Control.moveDown);
            } else if (key === Keys.LEFT) {
                move(Game.Control.moveLeft);
            } else if (key === Keys.RIGHT) {
                move(Game.Control.moveRight);
            }
        });

        var hammer = new Hammer(document.body);
        hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on("swipeleft", function() {
            move(Game.Control.moveLeft);
        });
        
        hammer.on("swiperight", function() {
            move(Game.Control.moveRight);
        });
        
        hammer.on("swipeup", function() {
            move(Game.Control.moveUp);
        });
        
        hammer.on("swipedown", function() {
            move(Game.Control.moveDown);
        });
    }

    return {
        initialize: function() {
            initializeState(16);
            createTiles();
            randomStart();
            redraw();
            registerMoveEvents();
        }
    };
}());

Game.Common = (function() {
    
    function Cell(value) {

        this.valueContentMap = {
            2: "arska.png",
            4: "bauer.png",
            8: "bruce.png",
            16: "chuck.png",
            32: "diesel.png",
            64: "lundgren.png",
            128: "rock.png",
            256: "samuel.png",
            512: "stallone.png",
            1024: "statham.png",
            2048: "vandamme.png"
        };

        this.value = value || 0;

        this.isEmpty = function() {
            return this.value === 0;
        };

        this.setEmpty = function() {
            this.value = 0;
        };

        this.add = function(anotherCell) {
            this.value += anotherCell.value;
        };

        this.equals = function(anotherCell) {
            return this.value === anotherCell.value;
        };

        this.clone = function() {
            return new Cell(this.value);
        };

        this.copyValue = function(anotherCell) {
            this.value = anotherCell.value;
        };

        this.getContent = function() {
            if (this.isEmpty()) {
                return "";
            }
            return "<img width='100%' height='100%' src='images/" + this.valueContentMap[this.value] + "'>";
        };
    }

    return {
        Cell: Cell
    };
}());


Game.Control = (function() {

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

    function moveLeft(state) {
        var rows = parseRows(state);
        for (var i = 0; i < rows.length; i++) {
            rows[i] = mergeLine(rows[i]);
        }
        return setRowsLeft(rows);
    }

    function moveRight(state) {
        var rows = parseRows(state);
        for (var i = 0; i < rows.length; i++) {
            rows[i] = mergeLine(rows[i].reverse());
        }
        return setRowsRight(rows);
    }

    function parseRows(grid) {
        var rows = [];
        for (var row = 0; row < Math.sqrt(grid.length); row++) {
            var rowItems = [];
            for (var column = 0; column < Math.sqrt(grid.length); column++) {
                var index = (row * Math.sqrt(grid.length)) + column;
                rowItems.push(grid[index]);
            }
            rows.push(rowItems.reverse());
        }
        return rows;
    }

    function setRowsLeft(rows) {
        var grid = [];
        for (var row = 0; row < rows.length; row++) {
            var rowItems = rows[row].reverse();
            for (var column = 0; column < rowItems.length; column++) {
                var gridIndex = (row * rows.length) + column;
                grid[gridIndex] = rowItems[column];
            }
        }
        return grid;
    }

    function setRowsRight(rows) {
        var grid = [];
        for (var row = 0; row < rows.length; row++) {
            var rowItems = rows[row];
            for (var column = rowItems.length - 1; column >= 0; column--) {
                var gridIndex = (row * rows.length) + column;
                grid[gridIndex] = rowItems[column];
            }
        }
        return grid;
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
        var newState = _.map(state, function(cell) {
            return cell.clone();
        });
        for (var current = newState.length - 2; current >= 0; current--) {
            var last = current + 1;
            if (!newState[current].isEmpty() && newState[current].equals(newState[last])) {
                // Merge the current two cells
                newState[last].add(newState[current]);
                newState[current].setEmpty();
            } else if (!newState[current].isEmpty() && newState[last].isEmpty()) {
                // Find the first cell that is not empty
                while (last < newState.length && newState[last].isEmpty()) {
                    last++;
                }

                // First case handles the case if we need to move current cell
                // to the first position.
                // Second case merges if the current cell is same as first non-empty cell,
                // otherwise move the current cell in the first empty cell.
                if (last >= newState.length) {
                    last = newState.length - 1;
                    newState[last].copyValue(newState[current]);
                    newState[current].setEmpty();
                } else if (!newState[current].isEmpty() && newState[last].equals(newState[current])) {
                    newState[last].add(newState[current]);
                    newState[current].setEmpty();
                } else {
                    newState[last-1].copyValue(newState[current]);
                    newState[current].setEmpty();
                }
            }
        }
        return newState;
    }

    return {
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        mergeLine: mergeLine
    };
}());