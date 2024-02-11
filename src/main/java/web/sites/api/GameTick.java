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

//        logger.info("dispatching GameTick to " + exchange.getRemoteAddress());

        StringBuilder outputSb = new StringBuilder();

        Player player = PlayerManager.getPlayer(exchange.getRequestURI().toString().split("/")[3]);
        Game game = player.getGame();


        StringBuilder inputSb = new StringBuilder();
        InputStream ios = exchange.getRequestBody();

        int i;
        while ((i = ios.read()) != -1) {
            inputSb.append((char) i);
        }

        System.out.println(inputSb.toString());

        JSONObject inputJson = new JSONObject(inputSb.toString());

        if(player.isPrimaryPlayer()){
            game.setBallX(inputJson.getFloat("ballX"));
            game.setBallY(inputJson.getFloat("ballY"));
            game.setDx(inputJson.getFloat("dx"));
            game.setDy(inputJson.getFloat("dy"));
            player.setPaddleY(inputJson.getFloat("paddleY"));

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
            player.setPaddleY(inputJson.getFloat("paddleY"));

            outputSb.append("{");
            outputSb.append(JsonHelper.append("paddleY", game.getPlayers()[0].getPaddleY()));
            outputSb.append(",");
            outputSb.append(JsonHelper.append("ballX", game.getBallX()));
            outputSb.append(",");
            outputSb.append(JsonHelper.append("ballY", game.getBallY()));
            outputSb.append(",");
            outputSb.append(JsonHelper.append("dx", game.getDx()));
            outputSb.append(",");
            outputSb.append(JsonHelper.append("dy", game.getDy()));
            outputSb.append(",");
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