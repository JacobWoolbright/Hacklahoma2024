package web.sites.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Logger;

public class Api implements HttpHandler {

    Logger logger = Logger.getLogger("api");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        logger.info("dispatching api to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        sb.append("{'status':'online'}");

        String response = sb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}