package com.store.courseworkoop.dto;

public class VerifyEmailDto {
    private String email;
    private Integer verificationCode;

    // Constructors
    public VerifyEmailDto() {}

    public VerifyEmailDto(String email, Integer verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(Integer verificationCode) {
        this.verificationCode = verificationCode;
    }
}
