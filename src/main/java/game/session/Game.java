package game.session;

import game.player.Player;
import utils.IdGenerator;
import utils.ShareCodeGenerator;

import java.util.UUID;

public class Game {

    private String gameShareCode;
    private final UUID gameId;
    private Player[] players = new Player[2];

    public Game() {

        gameId = IdGenerator.generateGameId();
        players[0] = new Player();

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
}
