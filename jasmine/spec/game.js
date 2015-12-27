describe("Simple merges", function() {
    describe("Moving up", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveUp([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ])).toEqual([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);

            expect(Game.Control.moveUp([
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ])).toEqual([
                2, 2, 2,
                1, 1, 1,
                0, 0, 0
            ]);

            expect(Game.Control.moveUp([
                4, 0, 1,
                2, 1, 1,
                1, 0, 1
            ])).toEqual([
                4, 1, 2,
                2, 0, 1,
                1, 0, 0
            ]);

            expect(Game.Control.moveUp([
                1, 0, 0, 4,
                1, 1, 0, 3,
                1, 0, 0, 1,
                1, 1, 1, 2
            ])).toEqual([
                2, 2, 1, 4,
                2, 0, 0, 3,
                0, 0, 0, 1,
                0, 0, 0, 2
            ]);
        });
    });

    describe("Moving down", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveDown([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ])).toEqual([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);

            expect(Game.Control.moveDown([
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ])).toEqual([
                0, 0, 0,
                1, 1, 1,
                2, 2, 2
            ]);

            expect(Game.Control.moveDown([
                1, 0, 1,
                2, 1, 1,
                4, 0, 1
            ])).toEqual([
                1, 0, 0,
                2, 0, 1,
                4, 1, 2
            ]);

            expect(Game.Control.moveDown([
                1, 0, 0, 2,
                1, 1, 0, 1,
                1, 0, 0, 3,
                1, 1, 1, 4
            ])).toEqual([
                0, 0, 0, 2,
                0, 0, 0, 1,
                2, 0, 0, 3,
                2, 2, 1, 4
            ]);
        });
    });

    describe("Moving left", function() {
        it("should combine cells correctly", function() {
            expect(Game.Control.moveLeft([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ])).toEqual([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);

            expect(Game.Control.moveLeft([
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ])).toEqual([
                2, 1, 0,
                2, 1, 0,
                2, 1, 0
            ]);

            expect(Game.Control.moveLeft([
                1, 1, 1,
                1, 1, 1,
                1, 1, 1
            ])).toEqual([
                2, 1, 0,
                2, 1, 0,
                2, 1, 0
            ]);

            expect(Game.Control.moveLeft([
                1, 1, 1, 1,
                1, 1, 0, 1,
                0, 0, 0, 1,
                4, 3, 1, 2
            ])).toEqual([
                2, 2, 0, 0,
                2, 1, 0, 0,
                1, 0, 0, 0,
                4, 3, 1, 2
            ]);
        });
    });
});


describe("One line merges", function() {

    it("should not merge anything on if all cells are empty", function() {
        var initialState = [0, 0, 0, 0];
        var expectedState = [0, 0, 0, 0];

        var newState = Game.Control.mergeLine(initialState);

        expect(newState).toEqual(expectedState);
    });

    it("should merge lines correctly", function() {
        expect(Game.Control.mergeLine([0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
        expect(Game.Control.mergeLine([0, 0, 1, 1])).toEqual([0, 0, 0, 2]);
        expect(Game.Control.mergeLine([1, 1, 1, 1])).toEqual([0, 0, 2, 2]);
        expect(Game.Control.mergeLine([2, 1, 2, 1])).toEqual([2, 1, 2, 1]);
        expect(Game.Control.mergeLine([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(Game.Control.mergeLine([0, 1, 1, 2])).toEqual([0, 0, 2, 2]);
        expect(Game.Control.mergeLine([1, 0, 1, 0])).toEqual([0, 0, 0, 2]);
        expect(Game.Control.mergeLine([1, 1, 2, 0])).toEqual([0, 0, 2, 2]);
    });

});