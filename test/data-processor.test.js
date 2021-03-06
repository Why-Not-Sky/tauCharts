define(function (require) {
    var expect = require('chai').expect;
    var assert = require('chai').assert;
    var DataProcessor = require('tau_modules/data-processor').DataProcessor;

    describe("DataProcessor", function () {

        it("should detect functional dependency", function () {
            var data = [
                {x: 0, y: 0},
                {x: 1, y: 1},
                {x: 2, y: 4},
                {x: 3, y: 9},
                {x: 0, y: 0}
            ];
            var r = DataProcessor.isYFunctionOfX(data, ['x'], ['y']);
            expect(r.result).to.equal(true);
        });

        it("should detect errors in functional dependency", function () {
            var data = [
                {x: 0, y: 0},
                {x: 1, y: 1},
                {x: 2, y: 4},
                {x: 3, y: 9},
                {x: 1, y: 0}
            ];
            var r = DataProcessor.isYFunctionOfX(data, ['x'], ['y']);
            expect(r.result).to.equal(false);
            expect(r.error.keyX).to.equal('x');
            expect(r.error.keyY).to.equal('y');
            expect(r.error.valX).to.equal('1');
            expect(r.error.errY).to.deep.equal(['1', '0']);
        });

        it("should detect functional dependency for facet sets", function () {
            var data = [
                {x: 0, y: 0, color: 'A'},
                {x: 1, y: 1, color: 'A'},
                {x: 2, y: 4, color: 'A'},

                {x: 0, y: 10, color: 'B'},
                {x: 1, y: 11, color: 'B'},
                {x: 2, y: 14, color: 'B'}
            ];
            var r = DataProcessor.isYFunctionOfX(data, ['x', 'color'], ['y']);
            expect(r.result).to.equal(true);
        });

        it("should detect errors in functional dependency for facet sets", function () {
            var data = [
                {x: 0, y: 0, color: 'A'},
                {x: 1, y: 1, color: 'A'},
                {x: 2, y: 4, color: 'A'},

                {x: 0, y: 10, color: 'B'},
                {x: 1, y: 11, color: 'B'},
                {x: 2, y: 14, color: 'B'},

                {x: 2, y: 44, color: 'B'}
            ];
            var r = DataProcessor.isYFunctionOfX(data, ['x', 'color'], ['y']);
            expect(r.result).to.equal(false);
            expect(r.error.keyX).to.equal('x/color');
            expect(r.error.valX).to.equal('2/B');

            expect(r.error.keyY).to.equal('y');
            expect(r.error.errY).to.deep.equal(['14', '44']);
        });
    });
});