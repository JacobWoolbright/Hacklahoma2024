package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import game.session.Game;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Logger;

public class CreateGame implements HttpHandler {

    Logger logger = Logger.getLogger("CreateGame");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching CreateGame to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        Game game = new Game();

        sb.append("{");
        sb.append("\"gameId\":\"" + game.getGameId() + "\",");
        sb.append("\"playerId\":\"" + game.getPlayers()[0].getPlayerID() + "\"");
        sb.append("}");

        String response = sb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}