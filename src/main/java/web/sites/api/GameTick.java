package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import game.player.Player;
import game.player.PlayerManager;
import game.session.Game;
import game.session.GameManager;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Logger;

public class GameTick implements HttpHandler {

    Logger logger = Logger.getLogger("GameTick");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching GameTick to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        Game game = GameManager.getGameFromShareCode(exchange.getRequestURI().toString().split("/")[3]);
        Player player = PlayerManager.getPlayer(exchange.getRequestURI().toString().split("/")[4]);

        StringBuilder InputSb = new StringBuilder();
        InputStream ios = exchange.getRequestBody();

        int i;
        while ((i = ios.read()) != -1) {
            InputSb.append((char) i);
        }

        JSONObject inputJson = new JSONObject(InputSb.toString());

        if(player.isPrimaryPlayer()){

        }
        else{

        }

        if(game == null || game.getPlayers()[1] != null){
            exchange.sendResponseHeaders(404, 0);
            return;
        }

        if(!game.addPlayer(new Player(game))){
            exchange.sendResponseHeaders(404, 0);
            return;
        }

        sb.append("{");
        sb.append("\"gameId\":\"" + game.getGameId() + "\",");
        sb.append("\"playerId\":\"" + game.getPlayers()[1].getPlayerID() + "\"");
        sb.append("}");

        String response = sb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}