const backgroundColor = '#000000';
const foregroundColor = '#FFFFFF';


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

drawScene = function() {
    renderBackground();
    renderBall();
    renderPaddles();
    renderScore();
    renderNames();
    renderMiddleLine();
}

renderBackground = function() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

renderMiddleLine = function() {
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = foregroundColor;
    ctx.stroke();
}

getForegroundColor = function() {
    return foregroundColor;
}

getBackgroundColor = function() {
    return backgroundColor;
}

