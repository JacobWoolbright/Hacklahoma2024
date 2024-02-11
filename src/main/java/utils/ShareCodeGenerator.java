package utils;

import java.util.ArrayList;

public class ShareCodeGenerator {

    private static ArrayList<String> shareCodes = new ArrayList<>();

    private static String generateRandomCode() {
        String code = "";
        for (int i = 0; i < 6; i++) {
            code += (char) (Math.random() * 26 + 97);
        }
        return code.toUpperCase();
    }

    public static String generateShareCode() {
        String code = generateRandomCode();
        while (shareCodes.contains(code)) {
            code = generateRandomCode();
        }
        shareCodes.add(code);
        return code;
    }

}
