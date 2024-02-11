package game.session;

import utils.IdGenerator;
import utils.ShareCodeGenerator;

import java.util.UUID;

public class Game {

    private String gameShareCode;
    private final UUID gameId;

    public Game() {

        gameId = IdGenerator.generateGameId();

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
}
