package web;

import com.sun.net.httpserver.HttpServer;
import web.sites.api.Api;
import web.sites.Html;
import web.sites.api.CreateGame;

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

//        add file getter context
        server.createContext("/", new Html());

//        add api context
        server.createContext("/api", new Api());
        server.createContext("/api/createGame", new CreateGame());


        server.start();
    }

}
