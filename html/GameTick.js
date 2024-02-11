let playerID;

setInterval(function() {
    let data = {
        "ballX": (ball.x)/(canvasWidth),
        "ballY": ball.y/canvasHeight,
        "dx": ball.dx/canvasWidth,
        "dy": ball.dy/canvasHeight,
        "paddleY": player1.y/canvasHeight
    };

    fetch(`/api/gameTick/${playerID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        player2.relativeY = data.paddleY; // Set player2.y to the returned paddleY
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}, 50);