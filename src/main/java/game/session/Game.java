package game.session;

import game.player.Player;
import utils.IdGenerator;
import utils.ShareCodeGenerator;

import java.util.UUID;

public class Game {

    private String gameShareCode;
    private final UUID gameId;
    private Player[] players = new Player[2];
    private float ballX = 0, ballY = 0;
    private float dx, dy;
    private boolean gameStarted = false;

    public Game() {

        gameId = IdGenerator.generateGameId();
        players[0] = new Player(this);

        GameManager.addGame(this);
    }

    public String getGameShareCode() {
        if(gameShareCode == null) {
            gameShareCode = ShareCodeGenerator.generateShareCode();
        }
        return gameShareCode;
    }

    public UUID getGameId() {
        return gameId;
    }

    public Player[] getPlayers() {
        return players;
    }

    public boolean addPlayer(Player player) {
        if(players[1] == null) {
            players[1] = player;
            return true;
        }
        return false;
    }

    public boolean isPrimaryPlayer(Player player) {
        return players[0].equals(player);
    }

    public float getBallX() {
        return ballX;
    }

    public void setBallX(float ballX) {
        this.ballX = ballX;
    }

    public float getBallY() {
        return ballY;
    }

    public void setBallY(float ballY) {
        this.ballY = ballY;
    }

    public float getDx() {
        return dx;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }

    public float getDy() {
        return dy;
    }

    public void setDy(int dy) {
        this.dy = dy;
    }

    public boolean isGameStarted() {
        return gameStarted;
    }

    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }
}
