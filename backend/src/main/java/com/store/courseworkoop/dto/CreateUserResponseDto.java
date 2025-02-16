package com.store.courseworkoop.dto;

import com.store.courseworkoop.models.User;

public class CreateUserResponseDto {
    private String id;
    private String fullName;
    private String email;

    // Конструктор, що приймає об'єкт User
    public CreateUserResponseDto(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
    }

    // Геттери та сеттери

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
