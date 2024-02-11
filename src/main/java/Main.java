import com.sun.net.httpserver.HttpServer;
import web.WebServerManager;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) throws IOException {

        WebServerManager.start();

    }

}
