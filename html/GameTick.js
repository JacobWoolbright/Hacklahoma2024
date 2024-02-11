let playerID, isPrimaryPlayer, gameStarted = false;

setInterval(function() {
    if(isPrimaryPlayer){
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
    }
    else{
        let data = {
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
                player2.relativeY = data.paddleY;
                ball.x = data.ballX*canvasWidth;
                ball.y = data.ballY*canvasHeight;
                ball.dx = data.dx*canvasWidth
                ball.dy = data.dy*canvasHeight;
                console.log("Ball x: " + data.ballX*canvasWidth);
                console.log("Ball y: " + data.ballY*canvasHeight);
                gameStarted = data.gameStarted;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}, 50);