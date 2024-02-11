package game.session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class GameManager {
    private static HashMap<UUID, Game> games = new HashMap<>();

    public static void addGame(Game game) {
        games.put(game.getGameId(), game);
    }
}
