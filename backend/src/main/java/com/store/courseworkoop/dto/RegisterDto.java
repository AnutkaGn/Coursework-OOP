package com.store.courseworkoop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterDto {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password is too short. Minimum length is 6 characters.")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_,.?\":{}|<>]).{6,}$",
            message = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    )
    private String password;

    @NotBlank(message = "Full name is required")
    @Size(min = 3, message = "Full name is too short. Minimum length is 3 characters.")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "\\+?[0-9]+",
            message = "Invalid phone number format"
    )
    private String phoneNumber;

    @NotBlank(message = "Shipping address is required")
    @Size(
            min = 10,
            max = 255,
            message = "Shipping address must be between 10 and 255 characters."
    )
    private String shippingAddress;

    // Конструктор
    public RegisterDto(String email, String password, String fullName, String phoneNumber, String shippingAddress) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
