package game.player;

import game.session.Game;
import utils.IdGenerator;

import java.util.UUID;

public class Player {

    private final UUID playerID;
    private String userName;
    private final Game game;

    private float paddleY;

    public Player(Game game) {
        playerID = IdGenerator.generatePlayerId();
        this.game = game;
        paddleY = 0;

        PlayerManager.addPlayer(this);
    }

    public UUID getPlayerID() {
        return playerID;
    }

    public String getUserName() {
        return userName;
    }

    @Override
    public boolean equals(Object obj) {
        Player player = (Player) obj;
        return playerID.equals(player.getPlayerID());
    }

    public boolean isPrimaryPlayer() {
        return game.isPrimaryPlayer(this);
    }

    public float getPaddleY() {
        return paddleY;
    }

    public void setPaddleY(float paddleY) {
        this.paddleY = paddleY;
    }

    public Game getGame() {
        return game;
    }
}
