package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import game.player.Player;
import game.session.Game;
import game.session.GameManager;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Logger;

public class JoinGame implements HttpHandler {

    Logger logger = Logger.getLogger("JoinGame");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching JoinGame to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        Game game = GameManager.getGameFromShareCode(exchange.getRequestURI().toString().split("/")[3]);

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