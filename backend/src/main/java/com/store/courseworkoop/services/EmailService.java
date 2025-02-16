package com.store.courseworkoop.services;

import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.dto.VerifyEmailDto;
import com.store.courseworkoop.models.User;
import com.store.courseworkoop.repositories.UserRepository;
import com.store.courseworkoop.utils.CodeGenerator;
import com.store.courseworkoop.constants.Messages;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmailService {
    private final UserService userService;
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    @Value("${spring.mail.from}")
    private String fromEmail;

    public EmailService(UserRepository userRepository, UserService userService, JavaMailSender javaMailSender) {
        this.userService = userService;
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    public int sendVerificationCode(String email) {
        int verificationCode = CodeGenerator.generateVerificationCode();
        sendEmail(email, verificationCode);

        return verificationCode;
    }

    private void sendEmail(String toEmail, int verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Email Verification");
        message.setText(String.format("Hello! Your email verification code is: %d\n" +
                "Please enter this code to complete the registration process.\n" +
                "If you did not register for an account, please ignore this email.\n" +
                "Best regards, The team", verificationCode));

        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.FAILED_TO_SEND_EMAIL, e);
        }
    }

    public ResponseDto<Void> verifyCode(VerifyEmailDto dto) {
        User user = userService.findByEmail(dto.getEmail());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND);
        }

        if (dto.getVerificationCode() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.VERIFICATION_CODE_REQUIRED);
        }

        if (!dto.getVerificationCode().equals(user.getVerificationCode())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.INVALID_VERIFICATION_CODE);
        }

        user.setVerified(true);
        user.setVerificationCode(null);
        userRepository.save(user);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.USER_VERIFIED_SUCCESS, null);
    }
}
