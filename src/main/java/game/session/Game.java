package game.session;

import game.player.Player;
import utils.IdGenerator;
import utils.ShareCodeGenerator;

import java.util.UUID;

public class Game {

    private String gameShareCode;
    private final UUID gameId;
    private Player[] players = new Player[2];
    private int ballX = 0, ballY = 0;
    private int dx, dy;
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

    public int getBallX() {
        return ballX;
    }

    public void setBallX(int ballX) {
        this.ballX = ballX;
    }

    public int getBallY() {
        return ballY;
    }

    public void setBallY(int ballY) {
        this.ballY = ballY;
    }

    public int getDx() {
        return dx;
    }

    public void setDx(int dx) {
        this.dx = dx;
    }

    public int getDy() {
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
