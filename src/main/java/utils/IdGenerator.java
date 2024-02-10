package utils;

import java.util.ArrayList;
import java.util.UUID;

public class IdGenerator {

    private static ArrayList<UUID> ids = new ArrayList<>();

    public static UUID generateId() {
        UUID id = UUID.randomUUID();
        while (ids.contains(id)) {
            id = UUID.randomUUID();
        }
        ids.add(id);
        return id;
    }

}
