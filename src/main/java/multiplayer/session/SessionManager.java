package multiplayer.session;

public class SessionManager {

    private static SessionManager instance = new SessionManager();

    private SessionManager() {}

    public static SessionManager getInstance() {
        if (instance == null){
            instance = new SessionManager();
        }
        return instance;
    }
}
