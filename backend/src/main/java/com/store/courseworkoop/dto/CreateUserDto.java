package com.store.courseworkoop.dto;

import jakarta.validation.constraints.NotNull;

public class CreateUserDto extends RegisterDto {
    @NotNull(message = "Verification code cannot be null")
    private Integer verificationCode;

    // Конструктор
    public CreateUserDto(String email, String password, String fullName, String phoneNumber, String shippingAddress, Integer verificationCode) {
        super(email, password, fullName, phoneNumber, shippingAddress);
        this.verificationCode = verificationCode;
    }

    // Getters and Setters
    public Integer getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(Integer verificationCode) {
        this.verificationCode = verificationCode;
    }
}
