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
    private int primaryPlayerScore = 0, secondaryPlayerScore = 0;

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

    public void setDx(float dx) {
        this.dx = dx;
    }

    public float getDy() {
        return dy;
    }

    public void setDy(float dy) {
        this.dy = dy;
    }

    public boolean isGameStarted() {
        return gameStarted;
    }

    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }

    public void setGameShareCode(String gameShareCode) {
        this.gameShareCode = gameShareCode;
    }

    public void setPlayers(Player[] players) {
        this.players = players;
    }

    public int getPrimaryPlayerScore() {
        return primaryPlayerScore;
    }

    public void setPrimaryPlayerScore(int primaryPlayerScore) {
        this.primaryPlayerScore = primaryPlayerScore;
    }

    public int getSecondaryPlayerScore() {
        return secondaryPlayerScore;
    }

    public void setSecondaryPlayerScore(int secondaryPlayerScore) {
        this.secondaryPlayerScore = secondaryPlayerScore;
    }
}
