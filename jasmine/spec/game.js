describe("Game control", function() {

    beforeEach(function() {
        jasmine.addMatchers({
            cellsMatch: function() {
                return {
                    compare: function(actual, expected) {
                        
                        function doComparison() {
                            if (actual.length !== expected.length) {
                                return false;
                            }

                            for (var i = 0; i < actual.length; i++) {
                                if (!actual[i].equals(expected[i])) {
                                    return false;
                                }
                            }

                            return true;
                        }

                        return {
                            pass: doComparison()
                        };
                    }
                };
            }
        });
    });

    describe("Simple merges", function() {

        var Cell = Game.Common.Cell;

        describe("Moving up", function() {
            it("should combine cells correctly", function() {
                expect(Game.Control.moveUp([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell()
                ])).cellsMatch([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveUp([
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1)
                ])).cellsMatch([
                    new Cell(2), new Cell(2), new Cell(2),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveUp([
                    new Cell(4), new Cell(), new Cell(1),
                    new Cell(2), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(), new Cell(1)
                ])).cellsMatch([
                    new Cell(4), new Cell(1), new Cell(2),
                    new Cell(2), new Cell(), new Cell(1),
                    new Cell(1), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveUp([
                    new Cell(1), new Cell(), new Cell(), new Cell(4),
                    new Cell(1), new Cell(1), new Cell(), new Cell(3),
                    new Cell(1), new Cell(), new Cell(), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1), new Cell(2)
                ])).cellsMatch([
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
                ])).cellsMatch([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveDown([
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1)
                ])).cellsMatch([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(2), new Cell(2), new Cell(2)
                ]);

                expect(Game.Control.moveDown([
                    new Cell(1), new Cell(), new Cell(1),
                    new Cell(2), new Cell(1), new Cell(1),
                    new Cell(4), new Cell(), new Cell(1)
                ])).cellsMatch([
                    new Cell(1), new Cell(), new Cell(),
                    new Cell(2), new Cell(), new Cell(1),
                    new Cell(4), new Cell(1), new Cell(2)
                ]);

                expect(Game.Control.moveDown([
                    new Cell(1), new Cell(), new Cell(), new Cell(2),
                    new Cell(1), new Cell(1), new Cell(), new Cell(1),
                    new Cell(1), new Cell(), new Cell(), new Cell(3),
                    new Cell(1), new Cell(1), new Cell(1), new Cell(4)
                ])).cellsMatch([
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
                ])).cellsMatch([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveLeft([
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1)
                ])).cellsMatch([
                    new Cell(2), new Cell(1), new Cell(),
                    new Cell(2), new Cell(1), new Cell(),
                    new Cell(2), new Cell(1), new Cell()
                ]);

                expect(Game.Control.moveLeft([
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1)
                ])).cellsMatch([
                    new Cell(2), new Cell(1), new Cell(),
                    new Cell(2), new Cell(1), new Cell(),
                    new Cell(2), new Cell(1), new Cell()
                ]);

                expect(Game.Control.moveLeft([
                    new Cell(1), new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(), new Cell(1),
                    new Cell(), new Cell(), new Cell(), new Cell(1),
                    new Cell(4), new Cell(3), new Cell(1), new Cell(2)
                ])).cellsMatch([
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
                ])).cellsMatch([
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell(),
                    new Cell(), new Cell(), new Cell()
                ]);

                expect(Game.Control.moveRight([
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(1)
                ])).cellsMatch([
                    new Cell(), new Cell(1), new Cell(2),
                    new Cell(), new Cell(1), new Cell(2),
                    new Cell(), new Cell(1), new Cell(2)
                ]);

                expect(Game.Control.moveRight([
                    new Cell(1), new Cell(1), new Cell(1), new Cell(1),
                    new Cell(1), new Cell(1), new Cell(), new Cell(1),
                    new Cell(1), new Cell(), new Cell(), new Cell(),
                    new Cell(4), new Cell(3), new Cell(1), new Cell(2)
                ])).cellsMatch([
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

            expect(newState).cellsMatch(expectedState);
        });

        it("should merge lines correctly", function() {
            expect(Game.Control.mergeLine([
                new Cell(), new Cell(), new Cell(), new Cell(1)
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(), new Cell(1)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(), new Cell(), new Cell(1), new Cell(1)
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(), new Cell(2)
            ]);
            
            expect(Game.Control.mergeLine([
                new Cell(1), new Cell(1), new Cell(1), new Cell(1)
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(2), new Cell(2)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(2), new Cell(1), new Cell(2), new Cell(1)
            ])).cellsMatch([
                new Cell(2), new Cell(1), new Cell(2), new Cell(1)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(1), new Cell(2), new Cell(3), new Cell(4)
            ])).cellsMatch([
                new Cell(1), new Cell(2), new Cell(3), new Cell(4)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(), new Cell(1), new Cell(1), new Cell(2)
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(2), new Cell(2)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(1), new Cell(), new Cell(1), new Cell()
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(), new Cell(2)
            ]);

            expect(Game.Control.mergeLine([
                new Cell(1), new Cell(1), new Cell(2), new Cell()
            ])).cellsMatch([
                new Cell(), new Cell(), new Cell(2), new Cell(2)
            ]);
        });

    });
}); 
