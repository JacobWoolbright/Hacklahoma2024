let playerID;

setInterval(function() {
    let data = {
        "ballX": ball.x,
        "ballY": ball.y,
        "dx": ball.dx,
        "dy": ball.dy,
        "paddleY": player1.y
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
        player2.y = data.paddleY; // Set player2.y to the returned paddleY
    })
    .catch((error) => {
        // console.error('Error:', error);
    });
}, 50);