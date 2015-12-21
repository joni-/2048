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
