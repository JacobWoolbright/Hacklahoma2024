package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import game.player.Player;
import game.player.PlayerManager;
import game.session.Game;
import game.session.GameManager;
import org.json.JSONObject;
import utils.JsonHelper;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Logger;

public class GameTick implements HttpHandler {

    Logger logger = Logger.getLogger("GameTick");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching GameTick to " + exchange.getRemoteAddress());

        StringBuilder outputSb = new StringBuilder();

        Player player = PlayerManager.getPlayer(exchange.getRequestURI().toString().split("/")[3]);
        Game game = player.getGame();


        StringBuilder InputSb = new StringBuilder();
        InputStream ios = exchange.getRequestBody();

        int i;
        while ((i = ios.read()) != -1) {
            InputSb.append((char) i);
        }

        JSONObject inputJson = new JSONObject(InputSb.toString());

        if(player.isPrimaryPlayer()){
            game.setBallX(inputJson.getInt("ballX"));
            game.setBallY(inputJson.getInt("ballY"));
            game.setDx(inputJson.getInt("dx"));
            game.setDy(inputJson.getInt("dy"));
            player.setPaddleY(inputJson.getInt("paddleY"));

            if(inputJson.has("gameStarted")){
                game.setGameStarted(inputJson.getBoolean("gameStarted"));
            }

            outputSb.append("{");

            if (game.getPlayers()[1] != null) {
                outputSb.append(JsonHelper.append("paddleY", game.getPlayers()[1].getPaddleY()));
            }

            outputSb.append("}");
        }
        else{
            player.setPaddleY(inputJson.getInt("paddleY"));

            outputSb.append("{");
            outputSb.append(JsonHelper.append("paddleY", game.getPlayers()[0].getPaddleY()));
            outputSb.append(JsonHelper.append("ballX", game.getBallX()));
            outputSb.append(JsonHelper.append("ballY", game.getBallY()));
            outputSb.append(JsonHelper.append("dx", game.getDx()));
            outputSb.append(JsonHelper.append("dy", game.getDy()));
            outputSb.append(JsonHelper.append("gameStarted", game.isGameStarted()));
            outputSb.append("}");
        }

        String response = outputSb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}