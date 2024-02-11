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
}
