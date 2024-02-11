package game.session;

import java.util.ArrayList;

public class GameManager {
    private static ArrayList<Game> games = new ArrayList<>();

    public static void addGame(Game game) {
        games.add(game);
    }
}
