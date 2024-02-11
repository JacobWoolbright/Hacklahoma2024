package game.player;

import java.util.HashMap;
import java.util.UUID;

public class PlayerManager {

    private static HashMap<UUID, Player> players = new HashMap<>();

    public static Player getPlayer(UUID id){
        return players.get(id);
    }

    public static void addPlayer(Player player){
        players.put(player.getPlayerID(), player);
    }

}
