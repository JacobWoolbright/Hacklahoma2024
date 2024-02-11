package utils;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.UUID;

public class IdGenerator {

    private static ArrayList<UUID> sessionIds = new ArrayList<>();
    private static ArrayList<UUID> gameIds = new ArrayList<>();
    private static ArrayList<UUID> playerIds = new ArrayList<>();

    public static UUID generateSessionId() {
        UUID id = UUID.randomUUID();
        while (sessionIds.contains(id)) {
            id = UUID.randomUUID();
        }
        sessionIds.add(id);
        return id;
    }

    public static UUID generateGameId() {
        UUID id = UUID.randomUUID();
        while (gameIds.contains(id)) {
            id = UUID.randomUUID();
        }
        gameIds.add(id);
        return id;
    }

    public static UUID generatePlayerId() {
        UUID id = UUID.randomUUID();
        while (playerIds.contains(id)) {
            id = UUID.randomUUID();
        }
        playerIds.add(id);
        return id;
    }

}
