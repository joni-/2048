describe("Simple merges", function() {
    describe("Moving up", function() {
        it("combines tiles in first column", function() {
            var initialState = [
                2, 0, 0,
                2, 0, 0,
                0, 0, 0
            ];

            var newState = Game.Control.moveUp(initialState);

            var expectedState = [
                4, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];

            expect(newState).toEqual(expectedState);
        });

        it("combines tiles in second column", function() {
            var initialState = [
                0, 2, 0,
                0, 2, 0,
                0, 0, 0
            ];

            var newState = Game.Control.moveUp(initialState);

            var expectedState = [
                0, 4, 0,
                0, 0, 0,
                0, 0, 0
            ];

            expect(newState).toEqual(expectedState);
        });

        it("combines tiles in third column", function() {
            var initialState = [
                0, 0, 2,
                0, 0, 2,
                0, 0, 0
            ];

            var newState = Game.Control.moveUp(initialState);

            var expectedState = [
                0, 0, 4,
                0, 0, 0,
                0, 0, 0
            ];

            expect(newState).toEqual(expectedState);
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