package com.store.courseworkoop.utils;

import java.util.Random;

public class CodeGenerator {

    public static int generateVerificationCode() {
        Random random = new Random();
        return random.nextInt(9000) + 1000; // 4-значний код
    }
}
