package game.player;

import game.session.Game;
import utils.IdGenerator;

import java.util.UUID;

public class Player {

    private final UUID playerID;
    private String userName;
    private final Game game;

    public Player(Game game) {
        playerID = IdGenerator.generatePlayerId();
        this.game = game;
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
}
