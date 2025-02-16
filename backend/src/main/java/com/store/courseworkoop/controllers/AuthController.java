package com.store.courseworkoop.controllers;

import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.services.AuthService;
import com.store.courseworkoop.services.EmailService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;

    public AuthController(AuthService authService, EmailService emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseDto<Void> register(@RequestBody @Valid RegisterDto dto) {
        return authService.register(dto);
    }

    @PostMapping("/login")
    public ResponseDto<String> login(@RequestBody @Valid LoginDto dto) {
        return authService.login(dto);
    }

    @PostMapping("/verify")
    public ResponseDto<Void> verifyEmail(@RequestBody @Valid VerifyEmailDto dto) {
        return emailService.verifyCode(dto);
    }
}
