package game.session;

import utils.ShareCodeGenerator;

public class Game {

    public String gameShareCode;

    public String getGameShareCode() {
        if(gameShareCode == null) {
            gameShareCode = ShareCodeGenerator.generateShareCode();
        }
        return gameShareCode;
    }
}
