package utils;

import java.util.ArrayList;
import java.util.UUID;

public class IdGenerator {

    private static ArrayList<UUID> sessionIds = new ArrayList<>();
    private static ArrayList<UUID> gameIds = new ArrayList<>();

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

}
