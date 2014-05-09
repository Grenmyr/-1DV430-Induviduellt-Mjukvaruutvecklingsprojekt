describe('Gun', function() {
    describe('collision check', function() {
        it('should return true if it collides', function() {
            var obj1 = {
                x: 10,
                y: 10,
                width: 10,
                height: 10
            };

            var obj2 = {
                x: 15,
                y: 15,
                width: 10,
                height: 10
            };

            expect(Gun.prototype.checkColl(obj1, obj2)).to.be.true;
        });
    });
});