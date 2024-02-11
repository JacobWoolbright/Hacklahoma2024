package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import game.session.Game;
import game.session.GameManager;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Logger;

public class GetGameShareCode implements HttpHandler {

    Logger logger = Logger.getLogger("GetGameShareCode");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching GetGameShareCode to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        String gameid = exchange.getRequestURI().toString().substring(22);

        Game game = GameManager.getGame(gameid);

        if(game == null){
            sb.append("none");
        }
        else{
            sb.append(game.getGameShareCode());
        }

        String response = sb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}