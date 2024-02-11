package game.player;

import utils.IdGenerator;

import java.util.UUID;

public class Player {

    private final UUID playerID;
    private String userName;

    public Player() {
        playerID = IdGenerator.generatePlayerId();
    }

    public UUID getPlayerID() {
        return playerID;
    }

    public String getUserName() {
        return userName;
    }
}
