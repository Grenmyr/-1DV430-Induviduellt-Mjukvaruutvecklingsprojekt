describe('Gun', function() {

    /*describe('collision check', function() {
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
    });*/
    describe('update function check', function() {
        it('should decrease x and y value of projectile with vx and vy', function() {
            var obj1 = {
                vx :5,
                vy:7,
                x: 50,
                y: 100
            };

            Gun.prototype.update.call(obj1);
            expect(obj1.x).to.eql(45);
            expect(obj1.y).to.eql(93);
            Gun.prototype.update.call(obj1);
            expect(obj1.x).to.eql(40);
            expect(obj1.y).to.eql(86);
        });
    });
    describe('clear function test ', function() {
        it('Test to check it use clearRect method to clear the Gun object from canvas with given parameters', function() {

            var gun = {
                ctx: {
                    clearRect: sinon.spy()
                },

                width :30,
                height:30,
                x: 50,
                y: 75
            };
            Gun.prototype.clear.call(gun);
            expect(gun.ctx.clearRect).to.have.been.calledWith(48, 73, 34, 34);
        });
    });
    describe('draw function test ', function() {
        it('Test to check draw use fillRect method to draw Gun object from canvas with given parameters', function() {
            var gun = {
                ctx: {
                    fillRect: sinon.spy()
                },
                clear : sinon.spy(),
                width :20,
                height:20,
                x: 100,
                y: 200,
                vx : 10,
                vy :15
            };
            Gun.prototype.draw.call(gun);
            expect(gun.ctx.fillRect).to.have.been.calledWith(90, 185, 20, 20);
        });
    });
    describe('object test ', function() {
        it('Test to check Gun properties of object get correct values on usage of shooter obj. ' +
                'Also test that canvas get initialized.'
            , function() {
            var canvas = document.createElement('canvas');
            var gameDiv = document.getElementById('gameDiv');
            gameDiv.appendChild(canvas);
            canvas.id = 'canvas';
            var ctx = canvas.getContext('2d');

            var shooter = {
                height:20,
                x: 300,
                y: 400,
                angle:2.5
            };
            var gun =  new Gun(shooter);

            expect(gun.ctx).to.eql(ctx);
            expect(gun.x,'topic gun.x').to.eql(300);
            expect(gun.y,'topic gun.y').to.eql(410);
            expect(gun.vy, 'topic gun.vy').to.eql(Math.sin(2.5)*5);
            expect(gun.vx, 'topic gun.vx').to.eql(Math.cos(2.5)*5);
            expect(gun.height, 'topic gun.height').to.eql(5);
            expect(gun.width,'topic gun.height').to.eql(5);
        });
    });
});
