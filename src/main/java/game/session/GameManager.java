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

    public static Game getGame(String gameId) {
        UUID uuid = UUID.fromString(gameId);
        return games.get(uuid);
    }

    public static Game getGame(UUID gameId) {
        return games.get(gameId);
    }

    public static Game getGameFromShareCode(String shareCode) {
        for (Map.Entry<UUID, Game> entry : games.entrySet()) {
            if (entry.getValue().getGameShareCode().equals(shareCode)) {
                return entry.getValue();
            }
        }
        return null;
    }
}
