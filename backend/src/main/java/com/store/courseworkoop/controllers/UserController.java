package com.store.courseworkoop.controllers;

import com.store.courseworkoop.dto.ChangePasswordDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.dto.UpdateUserDto;
import com.store.courseworkoop.models.User;
import com.store.courseworkoop.services.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseDto<User> getUserProfile(@AuthenticationPrincipal String userId) {
        return userService.findMe(userId);
    }

    @PatchMapping("/profile")
    public ResponseDto<User> updateUserProfile(
            @AuthenticationPrincipal String email,
            @RequestBody UpdateUserDto updateUserProfileDto) {
        return userService.updateProfile(email, updateUserProfileDto);
    }

    @PatchMapping("/change-password")
    public ResponseDto<Void> changePassword(
            @AuthenticationPrincipal String userId,
            @RequestBody ChangePasswordDto changePasswordDto) {
        return userService.changePassword(userId, changePasswordDto);
    }

    @DeleteMapping
    public ResponseDto<Void> deleteUser(@AuthenticationPrincipal String userId) {
        return userService.delete(userId);
    }
}
