describe("Simple merges", function() {

    var Cell = Game.Common.Cell;

    describe("Moving up", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveUp([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ])).toEqual([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveUp([
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1)
            ])).toEqual([
                new Cell(2), new Cell(2), new Cell(2),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveUp([
                new Cell(4), new Cell(), new Cell(1),
                new Cell(2), new Cell(1), new Cell(1),
                new Cell(1), new Cell(), new Cell(1)
            ])).toEqual([
                new Cell(4), new Cell(1), new Cell(2),
                new Cell(2), new Cell(), new Cell(1),
                new Cell(1), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveUp([
                new Cell(1), new Cell(), new Cell(), new Cell(4),
                new Cell(1), new Cell(1), new Cell(), new Cell(3),
                new Cell(1), new Cell(), new Cell(), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1), new Cell(2)
            ])).toEqual([
                new Cell(2), new Cell(2), new Cell(1), new Cell(4),
                new Cell(2), new Cell(), new Cell(), new Cell(3),
                new Cell(), new Cell(), new Cell(), new Cell(1),
                new Cell(), new Cell(), new Cell(), new Cell(2)
            ]);
        });
    });

    describe("Moving down", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveDown([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ])).toEqual([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveDown([
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1)
            ])).toEqual([
                new Cell(), new Cell(), new Cell(),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(2), new Cell(2), new Cell(2)
            ]);

            expect(Game.Control.moveDown([
                new Cell(1), new Cell(), new Cell(1),
                new Cell(2), new Cell(1), new Cell(1),
                new Cell(4), new Cell(), new Cell(1)
            ])).toEqual([
                new Cell(1), new Cell(), new Cell(),
                new Cell(2), new Cell(), new Cell(1),
                new Cell(4), new Cell(1), new Cell(2)
            ]);

            expect(Game.Control.moveDown([
                new Cell(1), new Cell(), new Cell(), new Cell(2),
                new Cell(1), new Cell(1), new Cell(), new Cell(1),
                new Cell(1), new Cell(), new Cell(), new Cell(3),
                new Cell(1), new Cell(1), new Cell(1), new Cell(4)
            ])).toEqual([
                new Cell(), new Cell(), new Cell(), new Cell(2),
                new Cell(), new Cell(), new Cell(), new Cell(1),
                new Cell(2), new Cell(), new Cell(), new Cell(3),
                new Cell(2), new Cell(2), new Cell(1), new Cell(4)
            ]);
        });
    });

    describe("Moving left", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveLeft([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ])).toEqual([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveLeft([
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1)
            ])).toEqual([
                new Cell(2), new Cell(1), new Cell(),
                new Cell(2), new Cell(1), new Cell(),
                new Cell(2), new Cell(1), new Cell()
            ]);

            expect(Game.Control.moveLeft([
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1)
            ])).toEqual([
                new Cell(2), new Cell(1), new Cell(),
                new Cell(2), new Cell(1), new Cell(),
                new Cell(2), new Cell(1), new Cell()
            ]);

            expect(Game.Control.moveLeft([
                new Cell(1), new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(), new Cell(1),
                new Cell(), new Cell(), new Cell(), new Cell(1),
                new Cell(4), new Cell(3), new Cell(1), new Cell(2)
            ])).toEqual([
                new Cell(2), new Cell(2), new Cell(), new Cell(),
                new Cell(2), new Cell(1), new Cell(), new Cell(),
                new Cell(1), new Cell(), new Cell(), new Cell(),
                new Cell(4), new Cell(3), new Cell(1), new Cell(2)
            ]);
        });
    });

    describe("Moving right", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveRight([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ])).toEqual([
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell()
            ]);

            expect(Game.Control.moveRight([
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(1)
            ])).toEqual([
                new Cell(), new Cell(1), new Cell(2),
                new Cell(), new Cell(1), new Cell(2),
                new Cell(), new Cell(1), new Cell(2)
            ]);

            expect(Game.Control.moveRight([
                new Cell(1), new Cell(1), new Cell(1), new Cell(1),
                new Cell(1), new Cell(1), new Cell(), new Cell(1),
                new Cell(1), new Cell(), new Cell(), new Cell(),
                new Cell(4), new Cell(3), new Cell(1), new Cell(2)
            ])).toEqual([
                new Cell(), new Cell(), new Cell(2), new Cell(2),
                new Cell(), new Cell(), new Cell(1), new Cell(2),
                new Cell(), new Cell(), new Cell(), new Cell(1),
                new Cell(4), new Cell(3), new Cell(1), new Cell(2)
            ]);
        });
    });
});


describe("One line merges", function() {

    var Cell = Game.Common.Cell;

    it("should not merge anything on if all cells are empty", function() {
        var initialState = [new Cell(), new Cell(), new Cell(), new Cell()];
        var expectedState = [new Cell(), new Cell(), new Cell(), new Cell()];

        var newState = Game.Control.mergeLine(initialState);

        expect(newState).toEqual(expectedState);
    });

    it("should merge lines correctly", function() {
        expect(Game.Control.mergeLine([
            new Cell(), new Cell(), new Cell(), new Cell(1)
        ])).toEqual([
            new Cell(), new Cell(), new Cell(), new Cell(1)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(), new Cell(), new Cell(1), new Cell(1)
        ])).toEqual([
            new Cell(), new Cell(), new Cell(), new Cell(2)
        ]);
        
        expect(Game.Control.mergeLine([
            new Cell(1), new Cell(1), new Cell(1), new Cell(1)
        ])).toEqual([
            new Cell(), new Cell(), new Cell(2), new Cell(2)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(2), new Cell(1), new Cell(2), new Cell(1)
        ])).toEqual([
            new Cell(2), new Cell(1), new Cell(2), new Cell(1)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(1), new Cell(2), new Cell(3), new Cell(4)
        ])).toEqual([
            new Cell(1), new Cell(2), new Cell(3), new Cell(4)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(), new Cell(1), new Cell(1), new Cell(2)
        ])).toEqual([
            new Cell(), new Cell(), new Cell(2), new Cell(2)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(1), new Cell(), new Cell(1), new Cell()
        ])).toEqual([
            new Cell(), new Cell(), new Cell(), new Cell(2)
        ]);

        expect(Game.Control.mergeLine([
            new Cell(1), new Cell(1), new Cell(2), new Cell()
        ])).toEqual([
            new Cell(), new Cell(), new Cell(2), new Cell(2)
        ]);
    });

});