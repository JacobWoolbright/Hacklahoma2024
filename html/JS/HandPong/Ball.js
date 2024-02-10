const BallSize= 20;
var {DeltaX, DeltaY} = {DeltaX: 5, DeltaY: 5};
var BallPos = {X: 0, Y: 0};
const BallColor =getForegroundColor();
const Ball = new Path2D();





let renderBall = function() {
    ctx.fillStyle = BallColor;
    ctx.fillrect(BallPos.X, BallPos.Y, BallSize, BallSize);
    ctx.fill(Ball);
}