package multiplayer.session;

import utils.IdGenerator;

import java.util.UUID;

public class Session {

    final UUID id;

    public Session() {
        id = IdGenerator.generateSessionId();
    }
}
