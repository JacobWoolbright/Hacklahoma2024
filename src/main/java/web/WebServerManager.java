package web;

import com.sun.net.httpserver.HttpServer;
import web.sites.HTML;

import java.io.IOException;
import java.net.InetSocketAddress;

public class WebServerManager {

    public static void start(){
        HttpServer server = null;
        try {
            server = HttpServer.create(new InetSocketAddress(4070), 0);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        server.createContext("/", new HTML());

        server.start();
    }

}
