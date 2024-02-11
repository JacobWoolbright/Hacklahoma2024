package web.sites;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Logger;

public class Api implements HttpHandler {

    Logger logger = Logger.getLogger("dynamicSite");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        String filename = exchange.getRequestURI().toString().substring(1);

        logger.info("dispatching dynamic to " + exchange.getRemoteAddress());

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