package utils;

public class JsonHelper {

    public static String append(String key, String value) {

        return "\"" + key + "\":\"" + value + "\",";

    }

    public static String append(String key, int value) {

        return "\"" + key + "\":\"" + value + "\",";

    }

    public static String append(String key, boolean value) {

        return "\"" + key + "\":\"" + value + "\",";

    }

    public static String append(String key, float value) {

        return "\"" + key + "\":\"" + value + "\",";

    }

}
