import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Logger;

public class HTML implements HttpHandler {

    Logger logger = Logger.getLogger("dynamicSite");

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        System.out.println("remote address: " + exchange.getRemoteAddress());
        System.out.println("Request URI: " + exchange.getRequestURI());

        logger.info("dispatching dynamic to " + exchange.getRemoteAddress());

        StringBuilder sb = new StringBuilder();

        try{
            String content = new String(Files.readAllBytes(Paths.get("./src/main/java/jacob.html")));
            sb.append(content);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        String response = sb.toString();

        // send file to user
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}