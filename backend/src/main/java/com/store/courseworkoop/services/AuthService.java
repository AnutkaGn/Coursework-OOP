package com.store.courseworkoop.services;

import com.store.courseworkoop.constants.Messages;
import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.models.User;
import com.store.courseworkoop.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserService userService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService, EmailService emailService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
    }

    public ResponseDto<Void> register(RegisterDto dto) {
        System.out.println(userService.findByEmail(dto.getEmail()));
        if (userService.findByEmail(dto.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.USER_ALREADY_EXISTS);
        }
        System.out.println(userService.findByPhoneNumber(dto.getPhoneNumber()));
        if (userService.findByPhoneNumber(dto.getPhoneNumber()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.PHONE_NUMBER_ALREADY_EXISTS);
        }

        int verificationCode = emailService.sendVerificationCode(dto.getEmail());

        userService.create(new CreateUserDto(
                dto.getEmail(),
                dto.getPassword(),
                dto.getFullName(),
                dto.getPhoneNumber(),
                dto.getShippingAddress(),
                verificationCode
        ));

        return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.USER_REGISTERED_SUCCESSFULLY, null);
    }

    public ResponseDto<String> login(LoginDto dto) {
        User user = userService.findByEmail(dto.getEmail());
        System.out.println(user);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND);
        }

        if (!BCrypt.checkpw(dto.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, Messages.INVALID_CREDENTIALS);
        }

        if (!user.isVerified()) {
            int verificationCode = emailService.sendVerificationCode(user.getEmail());
            userService.updateVerificationCode(user.getId(), verificationCode);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, Messages.EMAIL_NOT_VERIFIED);
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.USER_LOGIN_SUCCESSFULLY, token);
    }
}
