package web;

import com.sun.net.httpserver.HttpServer;
import web.sites.Api;
import web.sites.Html;

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


        server.start();
    }

}
